import React from 'react'
import { Product } from '../../models/Product';
import { mongooseConnect } from '../../lib/mongoose';
import { Order } from '../../models/Order';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.json('Should Be Post Request');
        return;
    }

    const { name, email, city, postalCode, streetAddress, country, cartProduct } = req.body;
    await mongooseConnect();
    const productIds = cartProduct;

    const uniqueIds = [...new Set(productIds)];

    const productsInfos = await Product.find({ _id: uniqueIds });

    let line_items = [];

    for (const productId of uniqueIds) {
        const productInfo = productsInfos.find(p => p._id.toString() === productId);
        const quantity = productIds.filter(id => id === productId)?.length || 0;
        if (quantity > 0 && productInfo) {
            line_items.push({
                quantity,
                price_data: {
                    currency: 'USD',
                    product_data: { name: productInfo.title },
                    unit_amount: quantity * productInfo.price * 100,
                }
            });
        }
    }

    // res.json({ line_items });

    const orderDocument = await Order.create({
        line_items, name, email, city, postalCode, streetAddress, country, paid: false,
    });

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        customer_email: email,
        success_url: process.env.PUBLIC_URL + '/cart?success=1',
        cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
        metadata: {
            orderId: orderDocument._id.toString()
        }
    });

    res.json({
        url: session.url
    })
}

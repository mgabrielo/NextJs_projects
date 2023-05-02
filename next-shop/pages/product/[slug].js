import React from 'react'
import { useRouter } from 'next/router';
import data from '../../utils/data';
import Layout from '../../components/Layout';
import { Link, Grid, List, Card, ListItem, Typography, Button } from '@material-ui/core'
import Image from 'next/legacy/image';
import useStyles from '../../utils/styles';

export default function ProductScreen() {
    const router = useRouter();
    const classes = useStyles();
    const { slug } = router.query
    const product = data.products.find(a => a.slug === slug);
    if (!product) {
        return <div>Product Not Found</div>
    }
    return (
        <Layout title={product.name} description={product.description}>
            <div className={classes.section}>
                <Link href='/'><Typography>Back to Products</Typography></Link>
            </div>
            <Grid container spacing={1}>
                <Grid item md={6} xs={12}>
                    <Image src={product.image} alt={product.name} width={'40px'} height={'30px'} layout='responsive' priority={true}>

                    </Image>
                </Grid>
                <Grid item md={3} xs={12}>
                    <List>
                        <ListItem><Typography component={'h1'} variant='h1'>Item : {product.name}</Typography></ListItem>
                        <ListItem><Typography>Category : {product.category}</Typography></ListItem>
                        <ListItem><Typography>Brand : {product.brand}</Typography></ListItem>
                        <ListItem><Typography>Rating : {product.rating} stars ({product.numReviews} reviews)</Typography></ListItem>
                        <ListItem><Typography>Description : {product.description}</Typography></ListItem>
                    </List>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}><Typography>Price</Typography> </Grid>
                                    <Grid item xs={6}><Typography>${product.price}</Typography> </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}><Typography>Status</Typography> </Grid>
                                    <Grid item xs={6}><Typography>{product.countInStock > 0 ? 'In Stock' : 'Unavailable'}</Typography> </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Button fullWidth variant={'contained'} color='primary'>Add To Cart</Button>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    )
}

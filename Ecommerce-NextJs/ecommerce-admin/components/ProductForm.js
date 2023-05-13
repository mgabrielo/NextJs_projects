import React, { useEffect } from 'react'
import axios from "axios";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from './Spinner';
import { ReactSortable } from 'react-sortablejs';
export default function ProductForm({ _id, title: existingTitle,properties: assignedProperties, category: existingCategory ,description: existingDescription, price: existingPrice, images: existingImages }) {
    const router = useRouter();
    const [title, setTitle] = useState(existingTitle || '')
    const [description, setDescription] = useState(existingDescription || '')
    const [price, setPrice] = useState(existingPrice || '')
    const [images, setImages] = useState(existingImages || [])
    const [isUploading, setIsUploading] = useState(false)
    const [goToProducts, setGoToProducts] = useState(false)
    const [category, setCategory] = useState( existingCategory ||'')
    const [categories, setCategories] = useState([])
    const [productProperties, setProductProperties] = useState( assignedProperties || {})

    useEffect(()=>{
        axios.get('/api/categories').then(res=>{
            setCategories(res.data)
        })
    },[])

    async function saveProduct(ev) {
        ev.preventDefault()
        const data = { title, description, price, images, category: category, properties: productProperties}
        if (_id) {
            //update existing product
            await axios.put('/api/products', { ...data, _id })
        } else {
            //create new product
            ev.preventDefault();
            await axios.post('/api/products', data)
        }
        setGoToProducts(true)
    }

    if (goToProducts) {
        router.push('/products')
    }


    async function uploadImage(ev) {

        const files = ev.target?.files;
        if (files.length > 0) {
            setIsUploading(true)
            const data = new FormData();
            for (const file of files) {
                data.append('file', file)
            }
            await axios.post('/api/upload', data).then(res => {

                setImages(oldImages => { return [...oldImages, ...res.data.links] })
                setIsUploading(false)

            })

        }
    }

    function updateImagesOrder(images) {
        setImages(images)
    }

    function setProductProp(propName, value){
        setProductProperties(prev => {
            const newProductProps = {...prev}
            newProductProps[propName] = value;
            return newProductProps;
         })
    }

    const propertiesToFill =[];
    if(categories.length > 0 && category){
       let catInfo= categories.find(({_id})=> _id === category);
    //    console.log(catInfo)
       propertiesToFill.push(...catInfo.properties);
       while(catInfo?.parent){
        const parentCatInfo = categories.find(({_id})=> _id == catInfo?.parent?._id);
        propertiesToFill.push(...parentCatInfo.properties);
        catInfo = parentCatInfo;
       }
    }


    return (
        <>

            <form onSubmit={saveProduct}>
                <label>Product name</label>
                <input type="text" placeholder="product name" value={title} onChange={e => setTitle(e.target.value)} />
                <label>Category</label>
                <select value={category} onChange={(e)=> setCategory(e.target.value)}>
                    <option value='' >-- Select Options --</option>
                    {categories.length > 0 && categories.map(c=>(
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>
                {propertiesToFill.length > 0  && propertiesToFill.map((p, index)=>(
                    <div key={index} className=''>
                        <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
                        <select value={productProperties[p.name]} onChange={(e)=>setProductProp(p.name, e.target.value) }>
                            {p.value.map((val, index)=>(
                                <option key={index} value={val}>{val}</option>
                            ))}
                        </select>
                    </div>
                ))}
                <label>Photos</label>
                <div className='mb-2 flex flex-wrap gap-2'>
                    <ReactSortable list={images} setList={updateImagesOrder} className='flex flex-wrap gap-1'>
                        {!!images?.length && images.map(link => (

                            <div key={link} className='h-24'>

                                <img src={link} className='rounded-md' />

                            </div>
                        ))}
                    </ReactSortable>
                    {isUploading && (
                        <div className='h-24 p-1  flex items-center'>
                            <Spinner />
                        </div>
                    )}
                    <label className='w-24 h-24 cursor-pointer text-sm rounded-lg bg-gray-200 text-primary border border-primary text-center flex flex-col items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <p className='mt-2' style={{ fontSize: 13 }}>Upload Image</p>
                        <input type='file' className='hidden' onChange={uploadImage} />
                    </label>
                    {/* {!images?.length && (
                        <div>No Photos For This Product</div>
                    )} */}
                </div>
                <label>Description</label>
                <textarea placeholder="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                <label>Price (in USD)</label>
                <input type="number" placeholder="price" value={price} onChange={e => setPrice(e.target.value)} />
                <button type="submit" className="btn-primary">Save</button>
            </form>
        </>
    )
}
import Layout from '@/components/Layout'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function Categories() {
    const [name, setName] = useState('')
    const [editCategory, setEditCategory] = useState(null)
    const [parentCategory, setParentCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [properties, setProperties] = useState([])

    useEffect(()=>{
       fetchCategories();
    },[])

    function fetchCategories(){
        axios.get('/api/categories').then(res=>{
            setCategories(res.data)
        })
    }

    async function saveCategory(ev) {
        ev.preventDefault();
        const data = { name, parentCategory, properties: properties.map(p=>({name: p.name, value:p.value.split(',')})) }
       
        if(!name){
            Swal.fire({
                title: 'Fill in Name Field',
                text: `Name Field Required`,
                icon: 'warning',
              })
            return;
        }


        if (editCategory){
            await axios.put('/api/categories', {...data,_id: editCategory._id})
            setEditCategory(null)
            setParentCategory('')
            setProperties([]);
            fetchCategories();
        }else{
            if(!parentCategory){
                await axios.post('/api/categories', {name, properties: properties.map(p=>({name: p.name, value:p.value.split(',')}))  }); 
            }else if (parentCategory){
                await axios.post('/api/categories', {name, parentCategory, properties: properties.map(p=>({name: p.name, value:p.value.split(',')})) });  
            }
            setParentCategory('');
            setProperties([]);
            fetchCategories();
        }
        
        setName('')
       
    }

    function editCategories(category){
        setEditCategory(category)
        setName(category.name)
        setParentCategory(category.parent?._id)
        setProperties(category.properties.map(({name, value})=>
            ({name, value: value.join(',')})
        ))
    }

    function deleteCategory(category){
        Swal.fire({
            title: 'Are you sure?',
            text: `You won't be able to revert deletion of category - ${category.name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                const {_id} = category;
                await axios.delete('/api/categories?_id='+_id);
                fetchCategories();
                Swal.fire(
                    'Deleted!',
                    'Your Category has been deleted.',
                    'success'
                )
            }
          })
    }

    function addProperties(){
        setProperties(prev=>{
            return [...prev, {name:'', value:''}]
        });
    }

    function handlePropertyNameChange( index, property, newName){
        setProperties(prev => {
            const _properties =[...prev];
            _properties[index].name = newName;
            return _properties
        })
    }

    function handlePropertyValueChange( index,property, newValue){
        setProperties(prev => {
            const _properties =[...prev];
            _properties[index].value = newValue;
            return _properties
        })
    }

    function removeProperty(indexRemove){
        setProperties(prev=>{
            const newProperties=[...prev].filter((p, p_index)=>{
                return p_index !== indexRemove;
            });;
            return newProperties;
        })
    }

    return (
        <Layout>
            <h1>Categories</h1>
            <label>{editCategory ? `Edit Category ${editCategory.name}` : 'Create New Category Name'}</label>
            <form  onSubmit={saveCategory} >
                <div className="flex gap-1">
                <input type='text' placeholder='Category Name' value={name} onChange={ev => setName(ev.target.value)}  />
                <select  value={parentCategory} onChange={ev=>setParentCategory(ev.target.value)}>
                  <option value="" disabled>No Parent Category</option> 
                    {categories.length > 0 && categories.map(category =>(
                       <option key={Math.random()} value={category._id}>{category.name}</option>
                    ))}
                </select>
                </div>
                <div className='mb-2'>
                    <label className='block'>Properties</label>
                    <button type='button' onClick={addProperties} className="px-4 py-1 rounded-md text-white bg-slate-600 text-sm mb-2">Add Property</button>
                </div>
                {properties.length > 0 && properties.map((property, index)=>(
                    <div className='flex gap-1 mb-2' key={index}>
                        <input type="text" className='mb-0' value={property.name} onChange={(e)=>handlePropertyNameChange(index,property, e.target.value)} placeholder='property name - example:(color)' />
                        <input type="text" className='mb-0' value={property.value} onChange={(e)=>handlePropertyValueChange(index,property, e.target.value)} placeholder='values - example: (range, dimension, extension etc.)' />
                        <button type='button' className="px-4 py-1 rounded-md text-white bg-slate-600 text-sm" onClick={()=>removeProperty(index)}>Remove</button>
                    </div>
                ))}
                <div className='flex gap-1'>
                <button type='submit' className='btn-primary py-1'>Save</button>
                {editCategory && 
                <button type='button' onClick={()=>{setEditCategory(null), setName(''), setParentCategory(''), setProperties([])}} className='btn-default py-1'>Cancel</button>}
                </div>
            </form>
            {!editCategory && (
                <table className='basic mt-4'>
                <thead>
                    <tr>
                        <td>Category Name</td>
                        <td>Parent Category</td>
                        <td ></td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category =>(
                        <tr key={Math.random()}>
                            <td>{category.name}</td>
                            <td>{category?.parent?.name}</td>
                            <td >
                                <button className='btn-primary mx-1' onClick={()=>editCategories(category)}>Edit</button>
                                <button className='btn-primary' onClick={()=>deleteCategory(category)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
            
        </Layout>

    )
}

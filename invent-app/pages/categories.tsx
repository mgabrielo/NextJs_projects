import React,{useState, useEffect} from 'react';
import { CustomNextPage } from '../types/CustomNextPage';
import { Title,Group,ThemeIcon,Button,Box,Table,Select,Skeleton,Modal,TextInput,Text,LoadingOverlay,Accordion } from '@mantine/core';
import {useForm, zodResolver} from '@mantine/form';
import { BiCategory } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { MdWarningAmber } from 'react-icons/md';
import { useGetCategories , usePostCategories} from '@/queries/CategoryQueries';
import { GetCategory } from '@/types/getCategories';
import { PostCategorySchema } from '@/types/postCategories';
import { queryClient } from './_app';

const categories : CustomNextPage = () => {
  const [accordionValue, setAccordionValue] = useState<string | null>(null)  
  const {data:categories, isLoading:categoriesLoading} = useGetCategories();
  const [selectData, setSelectData] =useState<GetCategory["name"][]>([]);
  const [selectValue, setSelectValue] = useState<GetCategory["name"] | null>();
  const [filteredValues, setFilteredValues] = useState<GetCategory[]>()
  const [createModal, setCreateModal]= useState<boolean>(false)

  //select data for search
  useEffect(()=>{
    setSelectData([]);
    if(categories){
        categories.map(category=>setSelectData((selectData)=>[...selectData, category.name]))
    }
    setFilteredValues(categories)
  },[categories])


  // filter data by selected value
    useEffect(()=>{
        if(selectValue){
            setFilteredValues(
                categories?.filter((category)=> category.name === selectValue)
            );
        }else{
            setFilteredValues(categories)
        }
    },[selectValue, categories])


   const createCategoryForm = useForm({
    validate:zodResolver(PostCategorySchema),
    initialValues:{
        name:'',
    }
   });

   const {mutate: postCategory, isLoading: postCategoryLoading} = usePostCategories();



    return (
    <main>
        {/* select categories */}
        <Group align='center' mb='3rem'>
            <Title size='1.5rem' weight='500'>
                Your Categories
            </Title> 
            <ThemeIcon variant='light' color='green' size='md' >
                <BiCategory size={25}/>
            </ThemeIcon>
        </Group>
        <Select data={selectData} value={selectValue} clearable searchable nothingFound='No Categories Found'
         icon={<FiSearch/>} sx={{maxWidth:'600px'}} mb='1.5rem' onChange={setSelectValue}/>

        {/* no Categories */}
        {categories?.length === 0 && categoriesLoading &&(
          <Box>
            <Group align='center'>
                <Text size='lg'> No Inventory or Categories</Text>
                <FiSearch size={20}/>
            </Group>
          </Box>        
        )}

        {/* Accordion data */}

        <Skeleton mb='3rem' visible={categoriesLoading ?? false} style={{minHeight:'80px'}} animate>
            <Accordion value={accordionValue} onChange={setAccordionValue} transitionDuration={500}>
                {filteredValues?.map((category:GetCategory, index)=>(
                    <Accordion.Item value={category.name} sx={{overflowX: 'auto'}} key={index}>
                        <Accordion.Control>{category.name}</Accordion.Control>
                        <Accordion.Panel sx={{width:'max-content', minWidth:'100%'}}>
                            <Table verticalSpacing='md' horizontalSpacing='md'>
                                <thead>
                                    <th style={{  alignItems:'center'}}>Name</th>
                                    <th style={{  alignItems:'center'}}>Price</th>
                                    <th style={{alignItems:'center' }}>id</th>
                                    <th style={{ alignItems:'center'}}>Last Update</th>
                                    <th style={{ alignItems:'center'}}>Stock</th>
                                </thead>
                                <tbody>
                                {category?.products?.map((product) =>(
                                    <tr key={product.name}>

                                        <td>
                                            <div style={{paddingLeft: 25, alignItems:'center'}}>{product.name}</div>
                                        </td>

                                        <td>
                                            <div style={{ paddingLeft: 30, alignItems:'center'}} >{product.price}</div>
                                        </td>

                                        <td>
                                            <div style={{ paddingLeft: 30, alignItems:'center'}}>{product.id}</div>
                                        </td>

                                        <td>
                                            <div style={{ paddingLeft: 30, alignItems:'center'}}>{product.lastUpdate.toString()}</div>
                                        </td>

                                        <td>
                                            <div style={{paddingLeft: 30, alignItems:'center'}}>{product?.date[0]?.stock ?? '0'}</div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <Button mt='1.5rem' color='blue' mx={10} >Change Details</Button>
                            <Button mt='1.5rem' color='red' mx={10} >Delete</Button>
                        </Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Skeleton>

        <Box>
            <Button color='blue' variant='outline' onClick={()=> setCreateModal(true)}> Create Category</Button>
        </Box>

        {/* Modals for Category */}

        <Modal centered opened={createModal} onClose={()=> setCreateModal(false)} title='Create a Category'>
                <form onSubmit={createCategoryForm.onSubmit((values)=>{
                    postCategory(values, {
                        onSuccess:()=>{
                            setCreateModal(false);
                            queryClient.refetchQueries(["categories"]);
                        }
                    })
                })}>

                    <LoadingOverlay transitionDuration={500} visible={postCategoryLoading ?? false}/>

                    <TextInput placeholder='Category Name' label='Category Name' withAsterisk mb='1rem'
                    {...createCategoryForm.getInputProps("name")}/>
                </form>
                <Group noWrap={false}>
                    <Button type='submit'> Create </Button>
                    <Button color='red' onClick={()=>setCreateModal(false)}> Exit </Button>
                </Group>
        </Modal>
    </main>
  )
}

export default categories;
categories.requireAuth = true;
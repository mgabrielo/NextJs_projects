'use client';
import uniqid from 'uniqid';
import React, { useState } from 'react'
import Modal from './Modal';
import useUploadModal from '@/hooks/useUploadModal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';
import {toast} from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

const UploadModal = () => {
    const router= useRouter();
    const [isLoading, setIsLoading]= useState(false)
    const uploadModal = useUploadModal();
    const {user}= useUser()
    const supabaseClient= useSupabaseClient()
    const {register, handleSubmit, reset}= useForm<FieldValues>({
        defaultValues:{
            author:'',
            title:'',
            song:null,
            image:null,
        }
    })
    const onChange=(open:boolean)=>{
        if(!open){
            reset()
            uploadModal.onClose()
        }
    }

    const onSubmit: SubmitHandler<FieldValues>= async(values)=>{
        //upload to Supabase
        try {
            setIsLoading(true);
            const imageFile= values.image?.[0];
            const songFile= values.song?.[0];
            if(!imageFile || !songFile || !user){
                toast.error('Missing Fields');
                return;
            }

            const uniqueID= uniqid()
            const {data: songData, error:songError}= await supabaseClient.storage.from('songs')
            .upload(`song-${values.title}-${uniqueID}`, songFile, {
                cacheControl:'3600', upsert:false
            })
            if(songError){
                setIsLoading(false);
                return toast.error('Failed Song Upload')
            }

            // upload image
            const {data: imageData, error:imageError}= await supabaseClient.storage.from('images')
            .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                cacheControl:'3600', upsert:false
            })
            if(imageError){
                setIsLoading(false);
                return toast.error('Failed image Upload')
            }

            const{error:supabaseError}= await supabaseClient.from('songs').insert({
                user_id:user.id,
                title: values.title,
                author: values.author,
                image_path: imageData.path,
                song_path:songData.path
            })

            if(supabaseError){
                setIsLoading(false)
                return toast.error(supabaseError.message)
            }

            router.refresh();
            setIsLoading(false);
            toast.success('Song Created');
            reset();
            uploadModal.onClose();


        } catch (error) {
            toast.error("Something Went Wrong")            
        } finally{
            setIsLoading(false)
        }
    }
  return (
    <Modal title='Add a Song' description='Upload Mp3 File' isOpen={uploadModal.isOpen} onChange={onChange}> 
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
        <Input id='title' disabled={isLoading} {...register('title',{required:true})} placeholder='Song Title'/>
        <Input id='author' disabled={isLoading} {...register('author',{required:true})} placeholder='Song Author'/>
        <div>
            <div className='pb-1'>Select Mp3 Song File</div>
            <Input id='song' type='file' disabled={isLoading} {...register('song',{required:true})} accept='.mp3'/>
        </div>
        <div>
            <div className='pb-1'>Select An Image</div>
            <Input id='image' type='file' disabled={isLoading} {...register('image',{required:true})} accept='image/*'/>
        </div>
        <Button disabled={isLoading} type='submit'>Create</Button>
    </form>
    </Modal>
  )
}

export default UploadModal
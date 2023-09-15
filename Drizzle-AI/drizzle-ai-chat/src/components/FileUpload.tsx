'use client';
import { uploadToS3 } from '@/lib/s3';
import { useMutation } from '@tanstack/react-query';
import { Inbox, Loader2 } from 'lucide-react';
import {useDropzone} from 'react-dropzone';
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { useState } from 'react';

const FileUpload = () => {
    const [uploading, setUploading] = useState(false)
    const  {mutate, isLoading} =useMutation({
        mutationFn: async ({file_key, file_name}: { file_key: string, file_name:string})=>{
            const response = await axios.post('/api/create-chat',{file_key,file_name})
            return response.data;
        }
    })
    const {getRootProps, getInputProps} = useDropzone({
        accept:{ 'application/pdf': ['.pdf']},
        maxFiles:1,
        onDrop:async (acceptedFile)=>{
            // console.log(acceptedFile)
           const file = acceptedFile[0]
           if(file.size >  5*1024*1024){
            toast.error('file bigger than 5mb')
            return
           }
           try {
                setUploading(true)
               const data = await uploadToS3(file)
               console.log('S3-data:', data)
               if(!data?.file_key || !data?.file_name){
                toast.error('cannot find filekey or filename')
                return;
               }
               mutate(data, {
                onSuccess: (data)=>{
                    console.log(data)
                    // toast.success('Success')
                }, 
                onError: (err)=>{
                    console.log(err)
                    toast.error('error creating chat')
                }
               })
           } catch (error) {
                console.log(error)
                // console.log(error)            
           } finally{
            setUploading(false)
           }

        }
    })
  return (
    
    <div className='p-2 bg-white rounded-xl'>
        <div {...getRootProps()} className='border-dashed border-gray-500 border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col'>
            <input {...getInputProps()} />
            {(uploading || isLoading) ? (
                <>
                <Loader2 className='h-10 w-10 text-indigo-800 animate-spin'/>
                <p className='mt-2 text-sm text-slate-500'>Loading GPT app...</p>
                </>
            ):(
            <>
            <Inbox className='w-10 h-10 text-indigo-500'/>
            <p className='mt-2 text-sm text-slate-700'> Drop PDF Here</p>
            </>
            )}
        </div>
    </div>
    
  )
}

export default FileUpload
'use client';
import { uploadToS3 } from '@/lib/s3';
import { Inbox } from 'lucide-react';
import {useDropzone} from 'react-dropzone';


const FileUpload = () => {
    const {getRootProps, getInputProps} = useDropzone({
        accept:{ 'application/pdf': ['.pdf']},
        maxFiles:1,
        onDrop:async (acceptedFile)=>{
            // console.log(acceptedFile)
           const file = acceptedFile[0]
           if(file.size >  10*1024*1024){
            console.log('file bigger than 10mb')
            return
           }
           try {
               const data = await uploadToS3(file)
               console.log('S3-data:', data)
           } catch (error) {
                console.log(error)            
           }

        }
    })
  return (
    <div className='p-2 bg-white rounded-xl'>
        <div {...getRootProps()} className='border-dashed border-gray-500 border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col'>
            <input {...getInputProps()} />
            <Inbox className='w-10 h-10 text-indigo-500'/>
            <p className='mt-2 text-sm text-slate-700'> Drop PDF Here</p>
        </div>
    </div>
  )
}

export default FileUpload
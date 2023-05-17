'use client';
import React, {useCallback} from 'react'
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import {TbPhotoPlus} from 'react-icons/tb'

declare global{
    var cloudinary: any;
}

interface ImageUplaodProps{
    onChange:(value : string)=>void;
    value:string;
}

const ImageUpload: React.FC<ImageUplaodProps> = ({onChange, value}) => {

const handleUpload= useCallback((result:any)=>{
onChange(result.info.secure_url)
},[onChange])

return (
    <CldUploadWidget
    onUpload={handleUpload}
    uploadPreset='fsfms7ie'
    options={{
        maxFiles: 1
    }}
    >
        {({ open})=>{
            return(
                <div onClick={()=> open?.() } 
                className='relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300
                flex flex-col justify-center items-center gap-4 text-neutral-600 '>
                <TbPhotoPlus/>
                <div className='font-semibold text-lg'>Click To Upload</div>
                {value && (
                    <div className='absolute inset-0 w-full h-full'>
                    <Image alt='upload' fill  style={{objectFit:'cover'}} src={value}/>
                    </div>
                )}
                </div>
            )
        }}
    </CldUploadWidget>
  )
}

export default ImageUpload
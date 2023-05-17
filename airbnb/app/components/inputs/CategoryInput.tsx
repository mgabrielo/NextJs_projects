'use client';
import {IconType} from 'react-icons';

interface CategoryInputProps{
    icon: IconType;
    label:string;
    selected?:boolean;
    onClick: (value:string)=>void
}
import React from 'react'

const CategoryInput:React.FC<CategoryInputProps> = ({icon:Icon, label, selected, onClick}) => {
  return (
    <div onClick={()=>onClick(label)}
        className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer
        ${selected ? 'border-black' : 'border-neutral-200'}`}>
      <Icon size={20}/>
      <div>{label}</div>
    </div>
  )
}

export default CategoryInput
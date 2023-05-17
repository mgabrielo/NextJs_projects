'use client';

import React from 'react'

interface HeartButtonProps{
    listingId:string;
    currentUser?:SafeUser | null;
}

import { SafeUser } from '../types';
import { AiFillAlert, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const HeartButton:React.FC<HeartButtonProps> = ({listingId,currentUser}) => {
  
    const hasFavorite = false;
    const togglefavorite=()=>{}
  
    return (
    <div onClick={togglefavorite} className='relative hover:opacity-80 transition cursor-pointer '>
        <AiOutlineHeart size={24} className='fill-white absolute -top-[2px] -right-[2px]'/>
        <AiFillHeart size={20} className={hasFavorite ? 'fill-rose-500' :  'fill-neutral-500/70'}/>
    </div>
  )
}

export default HeartButton
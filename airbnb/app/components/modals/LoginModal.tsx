'use client';

import React, {useState, useCallback} from 'react'
import {signIn} from 'next-auth/react'
import {AiFillGithub} from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import {toast} from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
    const router = useRouter()
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading]= useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues:{
            email: '',
            password: '',
        }
    })

    const onSubmit :  SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true);
        signIn('credentials',{
            ...data, redirect:false
        }).then((callBack)=>{
            setIsLoading(false)
            if(callBack?.ok){
                toast.success('Login SuccessFul');
                router.refresh();
                loginModal.onClose()
            }

            if(callBack?.error){
                toast.error('Login UnSuccessFul: '+ callBack.error);
            }
        } )
    }

    const toggle = useCallback(()=>{
        loginModal.onClose()
        registerModal.onOpen()
    },[loginModal, registerModal])
    
    const bodyContent =(
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome Back!' subtitle='Log In to Your Account' center/> 
            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required/>
            <Input id='password' label='Password' type='password' disabled={isLoading} register={register} errors={errors} required/>
        </div>
    )

    const footerContent= (
        <div className='flex flex-col gap-4 mt-0'>
            <hr />
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={()=>{}}/>
            <Button outline label='Continue with GitHub' icon={AiFillGithub} onClick={()=>{}}/>
            <div className='text-neutral-500 text-center mt-0 font-light'>
                <div className=' flex flex-row items-center gap-2 justify-center'>
                    <div>
                        First TIme Using AirBnb?
                    </div>
                    <div onClick={toggle} className='text-neutral-900 cursor-pointer hover:underline'>
                        Create an Account
                    </div>
                </div>
            </div>
        </div>
    )
  return (
    <Modal disabled={isLoading} isOpen={loginModal.isOpen} title='Login' actionLabel='Continue' onClose={loginModal.onClose}
    onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent}/>
  )
}

export default LoginModal
'use client';

import React, {useState, useCallback} from 'react'
import axios from 'axios';
import {AiFillGithub} from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import {toast} from 'react-hot-toast';
import Button from '../Button';


const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading]= useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues:{
            name:'',
            email: '',
            password: '',
        }
    })

    const onSubmit :  SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true);
        axios.post('/api/register', data).then(()=>{
            registerModal.onClose();
        }).catch((error)=>{
            // console.log(error)
            toast.error('Something Went Wrong')
        }).finally(()=>{
            setIsLoading(false)
        })
    }

    const bodyContent =(
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome to AirBnb' subtitle='Create An Account' center/>
            <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required/>
            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required/>
            <Input id='password' label='Password' type='password' disabled={isLoading} register={register} errors={errors} required/>
        </div>
    )
    
    const toggle = useCallback(()=>{
        registerModal.onClose()
        loginModal.onOpen()
    },[loginModal, registerModal])

    const footerContent= (
        <div className='flex flex-col gap-4 mt-0'>
            <hr />
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={()=>{}}/>
            <Button outline label='Continue with GitHub' icon={AiFillGithub} onClick={()=>{}}/>
            <div className='text-neutral-500 text-center mt-0 font-light'>
                <div className=' flex flex-row items-center gap-2 justify-center'>
                    <div>
                        Already Have An Account?
                    </div>
                    <div onClick={toggle} className='text-neutral-900 cursor-pointer hover:underline'>
                        Log In
                    </div>
                </div>
            </div>
        </div>
    )
  return (
    <Modal disabled={isLoading} isOpen={registerModal.isOpen} title='Register' actionLabel='Continue' onClose={registerModal.onClose}
    onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent}/>
  )
}

export default RegisterModal
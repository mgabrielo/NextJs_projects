'use client';

import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';
import AuthSocialButton from './AuthSocialButton';
import {BsGithub, BsGoogle} from 'react-icons/bs';
import {toast} from 'react-hot-toast';
import {signIn, useSession} from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();

    const [variant, setVariant] = useState<Variant>('LOGIN')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        if(session?.status === 'authenticated'){
           router.push('/users')
        }
    },[session?.status, router])

    const toggleVariant = useCallback(()=>{
        if(variant == 'LOGIN'){
            setVariant('REGISTER')
        }else{
            setVariant('LOGIN')
        }

    },[variant]);

    const {register, handleSubmit, formState: {errors}}= useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            password:'',
        }
    })

    const onSubmit:SubmitHandler<FieldValues> =(data)=>{
        setIsLoading(true);
        if(variant == 'REGISTER'){
            // axios register
            axios.post('/api/register', data)
            .then(()=>signIn('credentials', data))
            .catch(()=>
                toast.error('something went wrong')
            ).finally(()=> setIsLoading(false))   
        }

        if(variant == 'LOGIN'){
            // next-auth sign in
            signIn('credentials', {
                ...data,
                redirect:false
            }).then((callback)=>{
                if(callback?.error){
                    toast.error('Invalid Credentials')
                }

                if(callback?.ok && !callback?.error){
                    toast.success('Successful Login')
                    router.push('/users')
                }
            }).finally(()=> setIsLoading(false))
        }
    }

    const socialAction=(action:string)=>{
        setIsLoading(true)
        // next auth social sign in
    }
  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
            <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                {variant == 'REGISTER' && (
                <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors}/>
                )}
                <Input id='email' label='Email' type='email' disabled={isLoading} register={register} errors={errors}/>
                <Input id='password' label='Password' type='password' disabled={isLoading} register={register} errors={errors}/>
                <div>
                    <Button disabled={isLoading} fullWidth type='submit'>{variant == 'LOGIN' ? 'Sign In' : 'Register'}</Button>
                </div>
            </form>
            <div className='mt-6'>
                <div className='relative'>
                    <div className='absolute inset-0 flex items-center'>
                        <div className='w-full border-t border-gray-300'></div>
                    </div>
                    <div className='relative flex justify-center text-sm'>
                            <span className='bg-white px-2 text-gray-500'>
                                Or Continue With 
                            </span>
                    </div>
                </div>
                <div className='mt-6 flex gap-2'>
                    <AuthSocialButton icon={BsGithub} onClick={()=>socialAction('github')}/>
                    <AuthSocialButton icon={BsGoogle} onClick={()=>socialAction('google')}/>
                </div>
            </div>
            <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
                <div>
                    {variant == 'LOGIN' ? 'New to Chat Messenger ?' : 'Already Have An Account?'}
                </div>
                <div className='underline cursor-pointer' onClick={toggleVariant}>
                    {variant == 'LOGIN' ? 'Create An Account' : 'Login'}
                </div>
            </div>
        </div>
    </div>
  )
}

export default AuthForm
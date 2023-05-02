"use client"

import { FC, useState } from 'react'
import Button from '@/ui/Button'
import { signIn } from 'next-auth/react'
import { toast } from './ui/Toast'

interface SignInButtonProps {
  
}

const SignInButton: FC<SignInButtonProps> = ({}) => {
    const [isLoading, setIsLoading]= useState<boolean>(false)

    const signInWithGoogle = async()=>{
        setIsLoading(true)
    
        try {
            await signIn('google')
        } catch (error) {
            toast({
                title: 'Error Logging In',
                message: 'Please Insert Correct Details and  Try Again',
                type: 'error',
            })
        }
    }

  return <Button onClick={signInWithGoogle} isLoading={isLoading}>Sign In</Button>
}

export default SignInButton
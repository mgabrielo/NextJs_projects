"use client"

import { FC, useState } from 'react'
import Button from '@/ui/Button'
import { signIn, signOut } from 'next-auth/react'
import { toast } from './ui/Toast'

interface SignOutButtonProps {
  
}

const SignOutButton: FC<SignOutButtonProps> = ({}) => {
    const [isLoading, setIsLoading]= useState<boolean>(false)

    const signUserOut = async()=>{
        setIsLoading(true)
    
        try {
            await signOut()
        } catch (error) {
            toast({
                title: 'Error Logging Out',
                message: 'Please Try Again',
                type: 'error',
            })
        }
    }

  return <Button onClick={signUserOut} isLoading={isLoading}>Sign Out</Button>
}

export default SignOutButton
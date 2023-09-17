import { Box, Input } from '@chakra-ui/react';
import { Session } from 'next-auth'
import React, { FC, useState } from 'react'
import { toast } from 'react-hot-toast';

interface IMessageInputProps {
    session: Session;
    conversationId:string;
}

const MessageInput:FC<IMessageInputProps> = ({session, conversationId}) => {
    const [messageBody, setMessageBody] = useState<string>("")

    const onSendMessage=async (e: React.FormEvent)=>{
        e.preventDefault();
        try {
            // 
        } catch (error:any) {
            console.log('msg input err:', error)
            toast.error(error?.message)
        }
    }
  return (
    <Box px={4} py={6} width={'100%'}>
        <form onSubmit={()=>{}}>
            <Input 
            value={messageBody} 
            onChange={(e)=>setMessageBody(e.target.value)} 
            size={'md'} 
            placeholder='New Message'
            _focus={{boxShadow:'none', border:'1px solid', borderColor:'whiteAlpha.300'}}
            resize={'none'}
             />
        </form>
    </Box>
  )
}

export default MessageInput
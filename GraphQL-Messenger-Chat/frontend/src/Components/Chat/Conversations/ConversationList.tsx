import { Box, Text } from '@chakra-ui/react'
import { Session } from 'next-auth'
import {FC, useState} from 'react'
import ConversationModal  from '../Conversations/Modal/Modal'; 
import ConversationItem from './ConversationItem';
interface ConversationListProps {
session:Session
conversations: Array<any>
}

const ConversationList:FC<ConversationListProps> =({session, conversations})=> {
    const [isOpen, setIsOpen]= useState(false)

    const onOpen=()=>{
        setIsOpen(true)
    }
    const onClose=()=>{
        setIsOpen(false)
    }
    const uniqueconversations = conversations.filter((obj, index) => conversations.findIndex((item) => item.id === obj.id) === index);

  return (
    <Box width={'100%'}>
        <Box py={2} px={4} mb={4} bg={'blackAlpha.300'} borderRadius={4} cursor={'pointer'} onClick={onOpen}>
            <Text textAlign={'center'} color={'whiteAlpha.800'}> Start a Converstion</Text>
        </Box>
        <ConversationModal session={session} isOpen={isOpen} onClose={onClose}/>
        {
            uniqueconversations.map(conversation =>(
                <ConversationItem key={conversation.id} conversationn={conversation}/>
            ))
        }
    </Box>
  )
}

export default ConversationList
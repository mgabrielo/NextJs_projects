import {FC} from 'react'
import { useRouter } from 'next/router'
import { Session } from 'next-auth'
import MessagesHeader from './Messages/Header'
import { Flex } from '@chakra-ui/react'
import MessageInput from './Messages/Input'
import Messages from './Messages/Messages'

interface FeedWrapperProps {
    session:Session
}

const FeedWrapper:FC<FeedWrapperProps> =({session})=> {

    const router = useRouter();
    const {conversationId} =router.query
    const {user:{id: userId}} = session
  return (
    <Flex width='100%'  display={{base: conversationId ? 'flex' : 'none', md: 'flex'}} direction={'column'}>
        {conversationId  && typeof conversationId ==='string' ? 
            (   
                <>
                <Flex direction={'column'} justify={'space-between'} overflow={'hidden'} flexGrow={1}>
                    <MessagesHeader userId={userId} conversationId={conversationId}/>
                    <Messages userId={userId} conversationId={conversationId}/>
                    {/* {conversationId} */}
                </Flex>
                <MessageInput session={session} conversationId={conversationId}/>
                </>
            ):
            (
                <div>No Conversation Has Been Selected</div>
            )      
        }
    </Flex>
  )
}

export default FeedWrapper
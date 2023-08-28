import { Flex } from '@chakra-ui/react'
import { Session } from 'next-auth'
import { useRouter } from 'next/router'
import {FC} from 'react'

interface FeedWrapperProps {
    session:Session
}

const FeedWrapper:FC<FeedWrapperProps> =({session})=> {
    const router = useRouter();
    const {conversationId} =router.query
  return (
    <Flex width='100%'  display={{base: conversationId ? 'flex' : 'none', md: 'flex'}} direction={'column'}>
        {conversationId ? 
            (
                <Flex>
                    {conversationId}
                </Flex>
            ):
            (
                <div>No Conversation Has Been Selected</div>
            )      
        }
    </Flex>
  )
}

export default FeedWrapper
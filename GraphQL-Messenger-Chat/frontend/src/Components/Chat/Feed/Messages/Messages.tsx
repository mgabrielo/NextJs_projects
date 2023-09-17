import { useQuery } from '@apollo/client'
import { Flex, Stack } from '@chakra-ui/react'
import React, { FC } from 'react'
import { MessagesVariables, MessagesData } from '../../../../util/types'
import MessageOperations from '../../../../graphql/operations/message'
import { toast } from 'react-hot-toast'

interface MessagesProps {
 userId: string;
 conversationId: string
}

const Messages:FC<MessagesProps>=({userId, conversationId}) => {
    const {data, loading, error, subscribeToMore} =useQuery<MessagesData, MessagesVariables>(MessageOperations.Query.messages, {
        variables: {
            conversationId
        },
        onError:({message})=>{
            toast.error(message)
        },
        // onCompleted:()=>{}
    })

    console.log('messages tsx data:', data)
  return (
    <Flex direction={'column'} justify={'flex-end'} overflow={'hidden'}>
        {loading && (
            <Stack>
                {/* <SkeletonLoader count={4} height={'60px'} width={'100px'}/> */}
                <span>Loading Messages ...</span>
            </Stack>
        )}

        {
            data?.messages && (
                <Flex direction={'column-reverse'} overflowY={'scroll'} height={'100%'}>
                    {
                        data.messages.map((message, index)=>(
                            // <MessageItem/>
                            <div key={index}>{message.body}</div>
                        ))
                    }
                </Flex>
            )
        }
    </Flex>
  )
}

export default Messages
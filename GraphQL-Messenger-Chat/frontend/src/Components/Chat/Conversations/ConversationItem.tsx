import { Stack, Text } from '@chakra-ui/react';
import {FC} from 'react'

interface ConversationItemProps {
    conversationn: any;
}

const ConversationItem:FC<ConversationItemProps> =({conversationn})=> {
  return (
    <Stack p={4} _hover={{bg:'whiteAlpha.200'}} borderRadius={4}>
        <Text>
        {conversationn.id}
        </Text>
    </Stack>
  )
}

export default ConversationItem
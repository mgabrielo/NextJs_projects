import { Box } from '@chakra-ui/react';
import { Session } from 'next-auth';
import {FC} from 'react';
import ConversationList from './ConversationList';
import { useQuery } from '@apollo/client';
import ConversationsOperation from '../../../graphql/operations/conversation';
import { ConversationsData } from '../../../util/types';

interface IConversationsWrapperProps {
     session:Session;
}

const ConversationsWrapper: FC<IConversationsWrapperProps> = ({session}) => {
    const {
        data: conversationsData, 
        error:conversationsError, 
        loading:conversationsLoading
    } = useQuery<ConversationsData>(ConversationsOperation.Queries.conversations)

    console.log('conversationsdata:' , conversationsData)
  return (
    <Box width={{ base: '100%', md: '400px'}} border={"1px solid #a9a9a9"} bg={'whiteAlpha.50'} py={6} px={3}>
       
        <ConversationList session={session}/>
    </Box>
  );
};

export default ConversationsWrapper;

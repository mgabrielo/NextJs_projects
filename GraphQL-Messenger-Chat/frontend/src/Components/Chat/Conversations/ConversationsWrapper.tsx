import { Box } from '@chakra-ui/react';
import { Session } from 'next-auth';
import {FC, useEffect} from 'react';
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
        loading:conversationsLoading,
        subscribeToMore
    } = useQuery<ConversationsData >(ConversationsOperation.Queries.conversations)
    
    console.log('conversationsdata:' , conversationsData)

    const  subscribeToNewConversation =()=>{
        subscribeToMore({
            document:ConversationsOperation.Subscriptions.conversationCreated,
            updateQuery:(prev, {subscriptionData}:{subscriptionData:{data :{conversationCreated:any}}})=>{
                if(!subscriptionData.data){
                    return prev;
                }
                console.log(subscriptionData)
                const newConversation =subscriptionData.data.conversationCreated;

                return Object.assign({}, prev, {
                    conversations:[newConversation,...prev.conversations]
                })
            }
        })
    } 
  

    useEffect(()=>{
        subscribeToNewConversation()
    },[])
  return (
    <Box width={{ base: '100%', md: '400px'}} border={"1px solid red"} bg={'whiteAlpha.50'} py={6} px={3}>
       
        <ConversationList session={session} conversations = {conversationsData?.conversations || []}/>
    </Box>
  );
};

export default ConversationsWrapper;

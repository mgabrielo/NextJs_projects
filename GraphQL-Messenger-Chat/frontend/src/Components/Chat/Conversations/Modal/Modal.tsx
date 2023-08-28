import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Button, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, Modal, Input, Stack } from '@chakra-ui/react'
import {FC, useState} from 'react'
import {toast} from'react-hot-toast'
import UserOperations from '../../../../graphql/operations/user'; 
import ConversationOperations from '../../../../graphql/operations/conversation'; 
import { CreateConversationInput, CreateConverstaionData, SearchUserData, SearchUserInput, SearchedUser } from '../../../../util/types';
import UserSearchList from './UserSearchList';
import Participants from './Participants';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';

interface ModalProps {
    isOpen :boolean;
    onClose:()=>void;
    session:Session
}

const ConversationModal:FC<ModalProps> =({isOpen, onClose, session})=> {
    const router = useRouter();
    const [username, setUsername]= useState('')
    const [participants, setParticipants] = useState<Array<SearchedUser>>([])
    const [searchUsers, {data, loading, error}]= useLazyQuery<SearchUserData, SearchUserInput>(UserOperations.Queries.searchUsers)
        console.log('searched-data: ',data)       
    const [
        createConversation,
        {loading: createConversationLoading}
    ] = useMutation<CreateConverstaionData, CreateConversationInput>(ConversationOperations.Mutations.createConversation)
    
    
    const onSearch = (e:React.FormEvent)=>{
        e.preventDefault()
        //search Users
        searchUsers({variables : {username}})
    }
    const  {user :{id: userId}}= session;
    const onCreateConversation= async ()=>{
        const participants_Ids = [ userId , ...participants.map((participant)=>participant.id) ]
        console.log(participants_Ids)
        try {
            const {data} = await createConversation({
                variables: {participantIds: participants_Ids}
            })
            
            console.log('here is convo data:',data)

            if(!data?.createConversation){
                throw new Error('failed to create conversation')
            }

            const { createConversation:{conversationId} }=data
            router.push({query:{conversationId}});

            //clear state and close modal
            setParticipants([]);
            setUsername('');
            onClose();
        } catch (error:any) {
            console.log('create-conversation-error:', error)
            toast.error(error?.message)
        }
    }
    
    const addParticipant=(user:SearchedUser)=>{
        setParticipants(prev =>  [...prev, user]);
        setUsername("")
    };

    const removeParticipant=(userId: string)=>{
        setParticipants((prev)=> prev.filter(p=> p.id !== userId))
    }
    
    return (
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={'#2d2d2d'} pb={4}>
              <ModalHeader>Search and Start a Conversation</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form onSubmit={onSearch}>
                    <Stack spacing={4}>
                        <Input placeholder='Enter Username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                        <Button isLoading={loading} type='submit' isDisabled={!username}>Search</Button>
                    </Stack>
                </form>
                { data?.searchUsers && <UserSearchList users={data?.searchUsers} addParticipant={addParticipant} />}
                {participants.length !==0 &&
                    (
                        <>
                        <Participants participants={participants} removeParticipant={removeParticipant}/>
                        <Button width={'100%'} bg='brand.100' isLoading={createConversationLoading} mt='15px' _hover={{bg:'brand.100'}} onClick={onCreateConversation}>Start Conversation</Button>
                        </>
                    ) 
                }
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )
}

export default ConversationModal;
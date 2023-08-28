import {FC} from 'react'
import { SearchedUser } from '../../../../util/types'
import { Flex, Stack, Text } from '@chakra-ui/react'
import {IoIosCloseCircleOutline} from 'react-icons/Io';
interface ParticipantsProps {
participants: Array<SearchedUser>
removeParticipant: (userId:string)=> void
}

const Participants:FC<ParticipantsProps> =({participants, removeParticipant})=> {
    // console.log(participants , ':participants')

    const uniqueParticipants = participants.filter((obj, index) => participants.findIndex((item) => item.id === obj.id) === index);

  return (
    <Flex mt={8} gap={'10px '} flexWrap={'wrap'}>
        {
            uniqueParticipants.map((participant)=> {
                return (
                    <Stack key={participant.id} direction={'row'} align={'center'} bg={'whiteAlpha.200'} borderRadius={4} py={2} px={3}>
                            <Text>{participant.username}</Text>
                        <IoIosCloseCircleOutline size={20} cursor={'pointer'} onClick={()=>removeParticipant(participant.id)}/>          
                    </Stack>
                )
            })
        }
    </Flex>
  )
}

export default Participants
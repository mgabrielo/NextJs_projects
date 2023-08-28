import { Button, Flex } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import ConversationsWrapper from "./Conversations/ConversationsWrapper";
import FeedWrapper from "./Feed/FeedWrapper";
import { Session } from "next-auth";

interface IChatProps {
 session:Session
}

const Chat: React.FC<IChatProps> = ({session}) => {
  return( 
  <Flex height={'100vh'} >
    <ConversationsWrapper session={session}/>
    <FeedWrapper session={session}/>
    {/* <Button onClick={()=>signOut()}>Sign Out</Button> */}
  </Flex> 
  );
};

export default Chat;

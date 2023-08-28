import { Box } from '@chakra-ui/react'
import type { NextPage, NextPageContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Auth from '../Components/Auth/Auth'
import Chat from '../Components/Chat/Chat'
const Home: NextPage = () => {
  const {data :session}= useSession()
  console.log('session-data :', session)

  const reloadSession =()=>{
    const event =new Event("visibliltychange");
    document.dispatchEvent(event);
  }
  return (
    <Box>
      {session?.user?.username ? <Chat session={session}/> :<Auth session={session} reloadSession={reloadSession}/>}
    </Box>
  )
}


export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context);

  return {
    props:{
      session
    },
  }
}

export default Home

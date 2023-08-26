import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";
import {useMutation} from '@apollo/client';
import UserOperations from '../../graphql/operations/user';
import { CreateUsernameData, CreateUsernameVariables } from "../../util/types";

interface IAuthProps {
    session:Session | null;
    reloadSession: ()=>void
}

const Auth: React.FC<IAuthProps> = ({session, reloadSession}) => {
    const [username, setUserName]= useState('')
    const [createUsername, {data, loading, error}] = useMutation<CreateUsernameData, CreateUsernameVariables>(UserOperations.Mutations.createUsername);

    console.log(data, loading, error);
    
    const onSubmit =async()=>{
        if(!username){
            return;
        }
        try {
            // create Mutation to send username to GraphQL API
            await createUsername({variables: { username }})
        } catch (error) {
            
        }
    }
  return(
    <Center height={'100vh'}>
        <Stack align={'center'} spacing={8}>
            {
                session ? (
                    <>
                    <Text fontSize={'3xl'}> Create Username</Text>
                    <Input placeholder="Enter your username" value={username} onChange={(e)=> setUserName(e.target.value)}/>
                    <Button width={'100%'} onClick={onSubmit}>Save</Button>
                    </>
                ):(
                    <>
                    <Text fontSize={'3xl'}>MessengerChat</Text>
                    <Button onClick={()=>signIn("google")} leftIcon={<Image height={'20px'} src="/images/googlelogo.png" />}>Continue With Google</Button>
                    </>
                )
            }
        </Stack>
    </Center>
  );
};

export default Auth;

import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";
import {useMutation} from '@apollo/client';
import UserOperations from '../../graphql/operations/user';
import { CreateUsernameData, CreateUsernameVariables } from "../../util/types";
import {toast} from 'react-hot-toast';
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
            const {data} =await createUsername({variables: { username }})
            if(!data?.createUsername){
                throw new Error();
            }

            if(data?.createUsername.error){
                const {createUsername:{error}}= data;
                throw new Error(error)
            }
            //reload if username creation is successful
            reloadSession();
            toast.success(' 🎉 Username Created Successfully 🎉')
        } catch (error:any) {
            console.log('error:', error?.message)
        }
    }

    const Login =( value:any)=>{
        // e.preventDefault();
        signIn(value)
    }
  return(
    <Center height={'100vh'}>
        <Stack align={'center'} spacing={8}>
            {
                session ? (
                    <>
                    <Text fontSize={'3xl'}> Create Username</Text>
                    <Input placeholder="Enter your username" value={username} onChange={(e)=> setUserName(e.target.value)}/>
                    <Button isLoading={loading} width={'100%'} onClick={onSubmit}>Save</Button>
                    </>
                ):(
                    <>
                    <Text fontSize={'3xl'}>MessengerChat</Text>
                    <Button onClick={(e)=>Login('google')} leftIcon={<Image height={'20px'} src="/images/googlelogo.png" />}>Continue With Google</Button>
                    </>
                )
            }
        </Stack>
    </Center>
  );
};

export default Auth;

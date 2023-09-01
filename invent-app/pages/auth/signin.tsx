import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import {FaGoogle} from 'react-icons/fa';
import {Center,Button,Title,Stack,Text,Group} from '@mantine/core';

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <Center key={provider.name} sx={{width:'100vw', height:'100vh'}}>
          <Stack spacing='xl'>
            <Title align="center">Welcome to the Inventory</Title>
            {provider.name == "Google" && <Button onClick={()=>signIn(provider.id)} size="lg" sx={{alignSelf:'center'}}>
                <Group>
                    <Text size='md'>Sign In With {provider.name}</Text>
                    <FaGoogle />
                </Group>    
            </Button>}
          </Stack>
        </Center>
      ))}
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();
  
  return {
    props: { providers: providers ?? [] },
  }
}
import Head from 'next/head'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { CustomNextPage } from '../types/CustomNextPage';

const Home : CustomNextPage=()=> {
 
  const{data, status}= useSession();

  return (
    <>
      <Head>
        <title>Inventory App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

        {data?.user?.name || <Link href="/auth/signin">Go To Sign In </Link>}
        {status === 'authenticated' && <button onClick={()=>signOut()}>Sign Out</button>}

        <Link style={{marginLeft:'1rem'}} href='/categories'>Protected Page</Link>

  
      </main>
    </>
  )
}


Home.requireAuth = true;
//

export default Home;
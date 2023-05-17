// 'use client';
import {Nunito} from 'next/font/google';
import './globals.css'
import Navbar from './components/navbar/Navbar';

import RegisterModal from './components/modals/RegisterModal';
import TaostProvider from './providers/ToastProvider';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import RentModal from './components/modals/RentModal';
import { Suspense } from 'react'; 


export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Web',
}

const font  = Nunito({
  subsets:['latin']
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();
  
  return (
    <html lang="en">
      <body  className={font.className}  >
       
        <TaostProvider/>
        <RentModal/>
        <LoginModal/>
        <RegisterModal/>
        <Navbar currentUser={currentUser}/>
        <Suspense fallback={<div>Loading...</div>}>
        <div className='pb-20 pt-40'>
        {children}
        </div>
        </Suspense>
        </body>
    </html>
  )
}

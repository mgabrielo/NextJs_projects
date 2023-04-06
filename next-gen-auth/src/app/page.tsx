import type {Metadata} from 'next'
import { Inter } from 'next/font/google'
import LargeHeading from '@/components/ui/LargeHeading'
import Paragraph from '@/components/ui/Paragraph'
import Link from 'next/link'
import Image from 'next/image'

export const metadata:Metadata ={
  title: 'Next Gen API | Home',
  description: 'Open Source API Text Comparator'
}

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='relative h-screen flex items-center justify-center overflow-x-hidden'>
      <div className='container pt-32 max-w-7xl mx-auto w-full h-full'>
        <div className='h-full gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start'>
            <LargeHeading size='sm' className='three-d text-black dark:text-light-gold'>
              Easily Modified For Evolution <br />
              Text Similarity Comparator Using Next Gen <br />API
            </LargeHeading>
            <Paragraph size='default' className='max-w-xl lg:text-left'>
            With Great API comes Great Intelligence,
            The Dawn of New Technology Will Always End With A Sunrise{' '}
            <Link href='/login' className='underline underline-offset-2 text-black dark:text-light-gold'>
              API Key
            </Link>
            .
            </Paragraph>

            <div className='relative w-full w-lg lg:max-w-3xl lg:left-1/2 aspect-square lg:absolute'>
               <Image priority className='img-shadow' quality={100} style={{objectFit:'contain'}} fill
               src='/3dcomputer.jpeg' alt='3dcomputer'
               />
            </div>
        </div>
      </div>
    </div>
  )
}

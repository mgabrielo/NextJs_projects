
import AuthContext from './context/AuthContext'
import ToasterContext from './context/Toast.Context'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chat Messenger',
  description: 'Next Js Chat App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
})
 {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
        <ToasterContext/>
        {children}
        </AuthContext>
        </body>
    </html>
  )
}

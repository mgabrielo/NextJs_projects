import Nav from "@/components/Nav"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Layout({ children }) {
    const { data: session } = useSession()
    if (!session) {
        return (
            <div className='bg-blue-900 w-screen h-screen flex items-center'>
                <div className="text-center w-full">
                    <button onClick={() => signIn('google')} className="bg-white p-2 rounded-lg px-4">login with google</button>
                </div>
            </div>
        )
    }
    return (
        <div className="bg-gray-200 min-h-screen flex">
            <Nav />
            <div className="bg-white flex-grow mt-2 mr-2 rounded-lg p-4 mb-2">
                {children}

            </div>
        </div>
    )

}

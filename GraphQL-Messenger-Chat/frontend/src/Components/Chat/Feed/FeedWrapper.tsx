import { Session } from 'next-auth'
import {FC} from 'react'

interface FeedWrapperProps {
    session:Session
}

const FeedWrapper:FC<FeedWrapperProps> =({session})=> {
  return (
    <div>FeedWrapper</div>
  )
}

export default FeedWrapper
import { FC } from 'react'
import LargeHeading from '@/ui/LargeHeading'
import type {Metadata} from 'next';
import Paragraph from '@/ui/Paragraph';
import DocumentationTabs from '@/components/ui/DocumentationTabs';
import 'simplebar-react/dist/simplebar.min.css'
 
export const metadata:Metadata = {
    title: 'Next Gen | Documentations',
    description: 'Read About New Gen Apis'
}

const page: FC = ({}) => {
return <div className='container max-w-7xl mx-auto mt-12'>
        <div className='flex flex-col items-center gap-6'>
            <LargeHeading>Making a Request</LargeHeading>
            <Paragraph>api similarity comparison</Paragraph>

            <DocumentationTabs/>
        </div>
    </div>
}

export default page
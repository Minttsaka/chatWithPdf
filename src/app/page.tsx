import { Button } from '@/components/ui/button'
import { UserButton, auth } from '@clerk/nextjs'
import Link from 'next/link'
import {LogInIcon} from 'lucide-react'
import FileUpload from '@/components/FileUpload'

export default async function Home() {

  const {userId}=await auth()
  const isAuth=!!userId
  return (
    <div className='w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100'>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col item-center text-center">
          <div className="flex items-center justify-center">
            <h1 className='text-5xl mr-3 font-semibold'>
              Chat with any pdf
            </h1>
            <UserButton afterSignOutUrl='/ '/>
          </div>

          <div className='flex justify-center mt-2'>
            {isAuth &&
            <Button>Go to Charts</Button>
            }
            </div>
            <p className='max-w-xl mt-1 text-lg text-slate-600'>
              join millions of students, researchers and professionals to instantly answer questions and understand research with ai
            </p>
            <div className="w-full mt-4">
              {isAuth ? (
              <FileUpload />
              ):(
              <Link href='/sign-in'>
                <Button>
                  login to get started
                  <LogInIcon className='w-4 h-4 ml-2'/>
                </Button>
                </Link>)}
            </div>
        </div>
      </div>
    </div>
  )
}

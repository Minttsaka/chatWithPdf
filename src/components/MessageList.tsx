import { Message } from 'ai/react';
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type Props = {
  isLoading:boolean;
  messages: Message[];
};

export default function MessageList({ messages,isLoading }: Props) {
  if(isLoading){
    return (
      <div className='absolute top-[50%] left-[50%] z-50 '>
        <Loader2 className='w-6 h-6 animate-spin' />
      </div>
    )
  }
  if (!messages) return <></>;
  return (
    <div className="flex flex-col gap-2 px-4 ">
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className={cn('flex', {
              'justify-end pl-10': message.role === 'user',
              'justify-start pl-10': message.role === 'assistant', // Fix: Changed 'pl-10' to 'pr-10' for assistant
            })}
          >
            <div
              className={cn('rounded-lg px-3 text-sm shadow-md ring-1 ring-gray-900/10', {
                'bg-purple-600 text-white': message.role === 'user',
                'bg-black text-green-500': message.role !== 'user'
              })}
            >
              <p className='p-3'>{message.content}</p> {/* Fix: Changed 'contnent' to 'content' */}
            </div>
          </div>
        );
      })}
    </div>
  );
}

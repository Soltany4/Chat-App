import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../../store';
import { MessageItem } from './MessageItem';
import { isSameDay, isSameMinute } from 'date-fns';

export const MessageList: React.FC = () => {
  const { messages, activeChannelId, users } = useAppStore();
  const bottomRef = useRef<HTMLDivElement>(null);
  
  const channelMessages = messages[activeChannelId] || [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [channelMessages.length, activeChannelId]);

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 custom-scrollbar">
      {channelMessages.map((msg, index) => {
        const prevMsg = channelMessages[index - 1];
        const author = users.find(u => u.id === msg.authorId);
        
        const isCompact = prevMsg && 
          prevMsg.authorId === msg.authorId && 
          isSameDay(new Date(prevMsg.createdAt), new Date(msg.createdAt)) &&
          (new Date(msg.createdAt).getTime() - new Date(prevMsg.createdAt).getTime() < 60000 * 5); // 5 min grouping

        return (
          <div key={msg.id}>
             {/* Date Separator (simplified) */}
             {!prevMsg || !isSameDay(new Date(prevMsg.createdAt), new Date(msg.createdAt)) ? (
               <div className="relative flex items-center justify-center my-6">
                 <div className="absolute w-full h-[1px] bg-gray-200"></div>
                 <div className="relative bg-white px-4 text-xs font-bold text-gray-500 rounded-full border border-gray-200 py-1 shadow-sm">
                   {new Date(msg.createdAt).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                 </div>
               </div>
             ) : null}

            <MessageItem 
              message={msg} 
              author={author} 
              isCompact={!!isCompact} 
            />
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

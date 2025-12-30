import React from 'react';
import { Message, User } from '../../types';
import { format } from 'date-fns';
import { Smile, MessageSquare, Reply } from 'lucide-react';
import { useAppStore } from '../../store';

interface Props {
  message: Message;
  author?: User;
  isCompact?: boolean;
}

export const MessageItem: React.FC<Props> = ({ message, author, isCompact }) => {
  const { openThread, addReaction, currentUser } = useAppStore();

  if (!author) return null;

  return (
    <div className={`group flex px-5 py-2 hover:bg-gray-50 -mx-5 px-5 relative ${message.isOptimistic ? 'opacity-60' : ''} ${isCompact ? 'py-0.5' : 'mt-2'}`}>
      
      {/* Avatar */}
      {!isCompact ? (
        <img 
          src={author.avatarUrl} 
          alt={author.name} 
          className="w-9 h-9 rounded-md mr-3 mt-1 shrink-0 cursor-pointer hover:opacity-80"
        />
      ) : (
        <div className="w-9 mr-3 shrink-0 flex justify-end group-hover:visible invisible">
            <span className="text-[10px] text-gray-400 self-center">{format(new Date(message.createdAt), 'h:mm')}</span>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {!isCompact && (
          <div className="flex items-baseline">
            <span className="font-bold text-[15px] mr-2 cursor-pointer hover:underline">{author.name}</span>
            <span className="text-xs text-gray-500">{format(new Date(message.createdAt), 'h:mm a')}</span>
          </div>
        )}
        
        <div className="text-gray-900 text-[15px] leading-relaxed break-words whitespace-pre-wrap">
          {message.content}
        </div>

        {/* Reactions */}
        {message.reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {message.reactions.map(reaction => (
              <button 
                key={reaction.emoji}
                onClick={() => addReaction(message.id, reaction.emoji)}
                className={`flex items-center px-1.5 py-0.5 rounded-full text-xs border ${
                  reaction.userIds.includes(currentUser.id) 
                    ? 'bg-blue-50 border-blue-200 text-blue-600' 
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                <span>{reaction.emoji}</span>
                <span className="ml-1 font-medium">{reaction.userIds.length}</span>
              </button>
            ))}
          </div>
        )}

        {/* Thread Info */}
        {message.replyCount ? (
           <div 
             onClick={() => openThread(message.id)}
             className="flex items-center mt-1 group/thread cursor-pointer"
            >
              <div className="flex -space-x-1 mr-2">
                 {/* Mock user avatars for thread */}
                 <div className="w-4 h-4 rounded bg-gray-300 border border-white"></div>
                 <div className="w-4 h-4 rounded bg-gray-400 border border-white"></div>
              </div>
              <span className="text-xs font-semibold text-blue-600 group-hover/thread:underline">
                {message.replyCount} replies
              </span>
              <span className="text-[10px] text-gray-400 ml-2 group-hover/thread:block hidden">
                Last reply today at {format(new Date(), 'h:mm a')}
              </span>
           </div>
        ) : null}
      </div>

      {/* Hover Actions */}
      <div className="absolute right-4 top-[-12px] bg-white border border-gray-200 shadow-sm rounded-md flex items-center p-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button onClick={() => addReaction(message.id, '👍')} className="p-1.5 hover:bg-gray-100 rounded text-gray-500" title="Add reaction">
          <Smile size={16} />
        </button>
        <button onClick={() => openThread(message.id)} className="p-1.5 hover:bg-gray-100 rounded text-gray-500" title="Reply in thread">
          <MessageSquare size={16} />
        </button>
         <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500" title="Share">
          <Reply size={16} />
        </button>
      </div>
    </div>
  );
};

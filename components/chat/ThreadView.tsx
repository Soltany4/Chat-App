import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { X, MessageSquare } from 'lucide-react';
import { MessageItem } from './MessageItem';

export const ThreadView: React.FC = () => {
  const { activeThreadId, closeThread, messages, activeChannelId } = useAppStore();
  const [replyText, setReplyText] = useState('');
  
  if (!activeThreadId) return null;

  // In a real app, this would be a recursive search or a flat map look up
  const channelMsgs = messages[activeChannelId] || [];
  const parentMessage = channelMsgs.find(m => m.id === activeThreadId);

  // Mock thread replies
  const replies = [
    { ...parentMessage, id: 'reply-1', content: "This is a mock reply to the thread.", createdAt: new Date().toISOString() },
    { ...parentMessage, id: 'reply-2', content: "Another mock reply appearing here.", createdAt: new Date().toISOString() }
  ] as any[]; // quick cast for mock

  if (!parentMessage) return null;

  return (
    <div className="w-[350px] border-l border-gray-200 bg-gray-50 flex flex-col shadow-xl z-20">
       <div className="h-12 border-b bg-white flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center font-bold text-gray-800 text-sm">
             <span className="mr-2">Thread</span>
             <span className="text-gray-400 font-normal text-xs">#{activeChannelId.replace('ch-', '').replace('dm-', '')}</span>
          </div>
          <button onClick={closeThread} className="p-1 hover:bg-gray-100 rounded text-gray-500">
             <X size={20} />
          </button>
       </div>

       <div className="flex-1 overflow-y-auto px-4 py-4 custom-scrollbar">
          <MessageItem message={parentMessage} author={{ name: 'Original Author', avatarUrl: 'https://i.pravatar.cc/150', id: 'orig', status: 'online', email: '' }} />
          
          <div className="flex items-center my-6">
             <div className="flex-1 h-[1px] bg-gray-300"></div>
             <div className="px-2 text-xs text-gray-500 font-medium">2 replies</div>
             <div className="flex-1 h-[1px] bg-gray-300"></div>
          </div>

          <div className="space-y-4">
             {/* Simple visual mock for replies */}
             <div className="bg-white p-3 rounded shadow-sm text-sm border border-gray-100">
               <div className="flex items-center mb-1">
                 <div className="w-5 h-5 bg-purple-500 rounded mr-2"></div>
                 <span className="font-bold">System</span>
                 <span className="text-gray-400 text-xs ml-auto">Just now</span>
               </div>
               Thread replies would appear here dynamically.
             </div>
          </div>
       </div>

       <div className="p-4 bg-white border-t">
          <div className="border border-gray-300 rounded-lg p-2 focus-within:ring-1 focus-within:ring-blue-500">
             <input 
               className="w-full outline-none text-sm" 
               placeholder="Reply..."
               value={replyText}
               onChange={(e) => setReplyText(e.target.value)}
             />
          </div>
       </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { MessageList } from './MessageList';
import { Hash, Lock, Info, Phone, Video, Search, Bold, Italic, Strikethrough, Code, Link as LinkIcon, List, Paperclip, Send } from 'lucide-react';
import { User } from '../../types';

export const ChatArea: React.FC = () => {
  const { channels, activeChannelId, sendMessage } = useAppStore();
  const channel = channels.find(c => c.id === activeChannelId);
  const [inputText, setInputText] = useState('');

  if (!channel) return <div className="flex-1 flex items-center justify-center text-gray-400">Select a channel</div>;

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeChannelId, inputText);
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white min-w-0">
      {/* Header */}
      <div className="h-12 border-b flex items-center justify-between px-4 shrink-0 bg-white z-10 shadow-sm">
        <div className="flex flex-col overflow-hidden">
          <div className="flex items-center font-bold text-gray-900">
            {channel.isPrivate ? <Lock size={14} className="mr-1 text-gray-500" /> : <Hash size={16} className="mr-1 text-gray-500" />}
            <span className="truncate">{channel.name}</span>
          </div>
          {channel.description && <span className="text-xs text-gray-500 truncate">{channel.description}</span>}
        </div>

        <div className="flex items-center text-gray-500 space-x-1">
          {channel.type === 'dm' && (
            <>
              <button className="p-2 hover:bg-gray-100 rounded"><Phone size={18} /></button>
              <button className="p-2 hover:bg-gray-100 rounded"><Video size={18} /></button>
            </>
          )}
          <div className="h-6 w-[1px] bg-gray-200 mx-2"></div>
           <div className="flex -space-x-1 mr-2">
                 <div className="w-6 h-6 rounded bg-gray-300 border border-white text-[10px] flex items-center justify-center">3</div>
              </div>
          <button className="p-2 hover:bg-gray-100 rounded"><Info size={18} /></button>
        </div>
      </div>

      {/* Messages */}
      <MessageList />

      {/* Input Area */}
      <div className="px-5 pb-5 pt-2">
        <div className="border border-gray-300 rounded-xl shadow-sm focus-within:border-gray-400 focus-within:shadow-md transition-all bg-white">
          {/* Toolbar */}
          <div className="flex items-center space-x-1 p-1 bg-gray-50 border-b border-gray-200 rounded-t-xl text-gray-600">
            <button className="p-1.5 hover:bg-gray-200 rounded"><Bold size={14} /></button>
            <button className="p-1.5 hover:bg-gray-200 rounded"><Italic size={14} /></button>
            <button className="p-1.5 hover:bg-gray-200 rounded"><Strikethrough size={14} /></button>
            <div className="h-4 w-[1px] bg-gray-300 mx-1"></div>
            <button className="p-1.5 hover:bg-gray-200 rounded"><LinkIcon size={14} /></button>
            <button className="p-1.5 hover:bg-gray-200 rounded"><List size={14} /></button>
            <button className="p-1.5 hover:bg-gray-200 rounded"><Code size={14} /></button>
          </div>

          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${channel.type === 'dm' ? '' : '#'}${channel.name}`}
            className="w-full max-h-60 p-3 outline-none resize-none text-[15px] min-h-[80px] bg-transparent"
          />

          <div className="flex items-center justify-between p-2">
             <div className="flex items-center">
               <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                 <Paperclip size={18} />
               </button>
             </div>
             <div className="flex items-center space-x-2">
               <button 
                onClick={() => handleSend()}
                className={`p-2 rounded transition-colors ${inputText.trim() ? 'bg-green-700 text-white hover:bg-green-800' : 'bg-gray-100 text-gray-400'}`}
               >
                 <Send size={16} />
               </button>
             </div>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-1">
          <strong>Tip:</strong> Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  );
};

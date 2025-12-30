import React, { useMemo, useState } from 'react';
import { useAppStore } from '../../store';
import { Hash, Lock, Circle, ChevronDown, ChevronRight, Plus, Search } from 'lucide-react';

export const ChannelSidebar: React.FC = () => {
  const { 
    channels, 
    users,
    activeWorkspaceId, 
    activeChannelId, 
    setActiveChannel, 
    workspaces,
    currentUser,
    toggleSearch
  } = useAppStore();

  const [channelsOpen, setChannelsOpen] = useState(true);
  const [dmsOpen, setDmsOpen] = useState(true);

  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId);
  
  const workspaceChannels = useMemo(() => 
    channels.filter(c => c.workspaceId === activeWorkspaceId && c.type !== 'dm'),
    [channels, activeWorkspaceId]
  );

  const directMessages = useMemo(() => 
    channels.filter(c => c.workspaceId === activeWorkspaceId && c.type === 'dm'),
    [channels, activeWorkspaceId]
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'busy': return 'text-red-500';
      case 'away': return 'text-yellow-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="w-64 bg-brand-800 text-brand-50 flex flex-col shrink-0 border-r border-brand-900">
      {/* Header */}
      <div className="h-12 border-b border-brand-700 flex items-center justify-between px-4 hover:bg-brand-700 cursor-pointer transition-colors">
        <h1 className="font-bold truncate">{activeWorkspace?.name}</h1>
        <div className="w-8 h-8 rounded-full bg-white text-brand-900 flex items-center justify-center font-bold text-xs">
          {currentUser.name.charAt(0)}
        </div>
      </div>

      {/* Quick Jump */}
      <div className="p-3">
         <button onClick={() => toggleSearch(true)} className="w-full text-left bg-brand-700 text-brand-50/70 text-sm px-3 py-1.5 rounded flex items-center hover:bg-brand-600 hover:text-white transition-colors">
            <Search size={14} className="mr-2" />
            Find or start a conversation
         </button>
      </div>

      {/* Scroll Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-2 space-y-6">
        
        {/* Channels Section */}
        <div>
          <div 
            className="flex items-center justify-between group px-2 mb-1 cursor-pointer text-brand-50/70 hover:text-white"
            onClick={() => setChannelsOpen(!channelsOpen)}
          >
            <div className="flex items-center text-sm font-medium">
              {channelsOpen ? <ChevronDown size={14} className="mr-1" /> : <ChevronRight size={14} className="mr-1" />}
              Channels
            </div>
            <Plus size={14} className="opacity-0 group-hover:opacity-100 hover:bg-brand-700 rounded" />
          </div>

          {channelsOpen && (
            <div className="space-y-[2px]">
              {workspaceChannels.map(ch => (
                <div
                  key={ch.id}
                  onClick={() => setActiveChannel(ch.id)}
                  className={`flex items-center px-2 py-1.5 rounded cursor-pointer text-sm ${
                    activeChannelId === ch.id 
                      ? 'bg-blue-700 text-white' 
                      : 'text-brand-50/80 hover:bg-brand-700 hover:text-white'
                  }`}
                >
                  {ch.isPrivate ? <Lock size={14} className="mr-2 opacity-70" /> : <Hash size={14} className="mr-2 opacity-70" />}
                  <span className={`truncate ${ch.unreadCount ? 'font-bold' : ''}`}>{ch.name}</span>
                  {ch.unreadCount ? (
                    <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 rounded-full">{ch.unreadCount}</span>
                  ) : null}
                </div>
              ))}
              
              <div className="flex items-center px-2 py-1.5 text-brand-50/60 hover:text-white cursor-pointer text-sm">
                <div className="w-4 flex justify-center mr-2"><Plus size={14} /></div>
                Add Channel
              </div>
            </div>
          )}
        </div>

        {/* DMs Section */}
        <div>
          <div 
            className="flex items-center justify-between group px-2 mb-1 cursor-pointer text-brand-50/70 hover:text-white"
            onClick={() => setDmsOpen(!dmsOpen)}
          >
             <div className="flex items-center text-sm font-medium">
              {dmsOpen ? <ChevronDown size={14} className="mr-1" /> : <ChevronRight size={14} className="mr-1" />}
              Direct Messages
            </div>
            <Plus size={14} className="opacity-0 group-hover:opacity-100 hover:bg-brand-700 rounded" />
          </div>

          {dmsOpen && (
            <div className="space-y-[2px]">
              {directMessages.map(dm => {
                // Find the user object for status
                const otherUserId = dm.memberIds.find(id => id !== currentUser.id);
                const otherUser = users.find(u => u.id === otherUserId);

                return (
                  <div
                    key={dm.id}
                    onClick={() => setActiveChannel(dm.id)}
                    className={`flex items-center px-2 py-1.5 rounded cursor-pointer text-sm ${
                      activeChannelId === dm.id 
                        ? 'bg-blue-700 text-white' 
                        : 'text-brand-50/80 hover:bg-brand-700 hover:text-white'
                    }`}
                  >
                    <div className="mr-2 relative">
                       <img src={otherUser?.avatarUrl} className="w-4 h-4 rounded-sm" alt="" />
                       <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-brand-800 bg-current ${getStatusColor(otherUser?.status || 'offline')}`}></div>
                    </div>
                    <span className={`truncate ${dm.unreadCount ? 'font-bold' : ''}`}>{dm.name}</span>
                     {dm.unreadCount ? (
                    <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 rounded-full">{dm.unreadCount}</span>
                  ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { useAppStore } from '../../store';
import { Search, Hash, User as UserIcon, FileText } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { searchOpen, toggleSearch, channels, users } = useAppStore();

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-32">
      <div className="bg-white w-[600px] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[60vh]">
        <div className="p-4 border-b flex items-center">
          <Search className="text-gray-400 mr-3" size={20} />
          <input 
            autoFocus
            type="text" 
            placeholder="Search messages, files, and people" 
            className="flex-1 outline-none text-lg"
          />
          <button onClick={() => toggleSearch(false)} className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-500">ESC</button>
        </div>
        
        <div className="overflow-y-auto p-2">
            <div className="text-xs font-bold text-gray-500 uppercase px-3 py-2">Suggested</div>
            {channels.slice(0, 3).map(ch => (
              <div key={ch.id} className="flex items-center px-3 py-2 hover:bg-blue-50 cursor-pointer rounded">
                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center mr-3 text-gray-500">
                  <Hash size={16} />
                </div>
                <div>
                   <div className="font-bold text-sm text-gray-800">{ch.name}</div>
                   <div className="text-xs text-gray-500">Channel</div>
                </div>
              </div>
            ))}
             {users.slice(0, 2).map(u => (
              <div key={u.id} className="flex items-center px-3 py-2 hover:bg-blue-50 cursor-pointer rounded">
                <img src={u.avatarUrl} className="w-8 h-8 rounded mr-3" alt="" />
                <div>
                   <div className="font-bold text-sm text-gray-800">{u.name}</div>
                   <div className="text-xs text-gray-500">User</div>
                </div>
              </div>
            ))}
        </div>
        
        <div className="bg-gray-50 p-2 text-xs text-gray-500 flex justify-between px-4">
           <span>Search using <strong>from:</strong>, <strong>in:</strong>, or <strong>has:</strong></span>
        </div>
      </div>
      <div className="absolute inset-0 -z-10" onClick={() => toggleSearch(false)}></div>
    </div>
  );
};

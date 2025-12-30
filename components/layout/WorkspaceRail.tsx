import React from 'react';
import { useAppStore } from '../../store';
import { Plus } from 'lucide-react';

export const WorkspaceRail: React.FC = () => {
  const { workspaces, activeWorkspaceId, setActiveWorkspace } = useAppStore();

  return (
    <div className="w-[70px] bg-brand-900 flex flex-col items-center py-4 space-y-4 shrink-0 z-20">
      {workspaces.map(ws => (
        <button
          key={ws.id}
          onClick={() => setActiveWorkspace(ws.id)}
          className={`relative group w-12 h-12 rounded-xl overflow-hidden transition-all duration-200 ${
            activeWorkspaceId === ws.id ? 'border-4 border-white' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <img src={ws.logoUrl} alt={ws.name} className="w-full h-full object-cover" />
          
          {/* Tooltip */}
          <div className="absolute left-14 top-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
            {ws.name}
          </div>
        </button>
      ))}

      <button className="w-12 h-12 rounded-full bg-brand-700 hover:bg-green-600 transition-colors flex items-center justify-center text-white">
        <Plus size={24} />
      </button>
    </div>
  );
};

import React, { useEffect } from 'react';
import { WorkspaceRail } from './components/layout/WorkspaceRail';
import { ChannelSidebar } from './components/layout/ChannelSidebar';
import { ChatArea } from './components/chat/ChatArea';
import { ThreadView } from './components/chat/ThreadView';
import { SearchModal } from './components/modals/SearchModal';
import { useAppStore } from './store';

const App: React.FC = () => {
  const { sendMessage, activeChannelId } = useAppStore();

  // Simulate incoming messages for liveness
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // Mock incoming message from a random user
        useAppStore.setState(state => {
          const channelId = state.activeChannelId;
          const randomUser = state.users.filter(u => u.id !== 'user-1')[Math.floor(Math.random() * (state.users.length - 1))];
          
          const newMessage = {
            id: `incoming-${Date.now()}`,
            channelId: channelId,
            authorId: randomUser.id,
            content: [
              "Interesting point!",
              "I agree with that.",
              "Could you elaborate?",
              "LGT 🚀",
              "Let's sync on this later."
            ][Math.floor(Math.random() * 5)],
            createdAt: new Date().toISOString(),
            reactions: [],
            isOptimistic: false
          };

          return {
            messages: {
              ...state.messages,
              [channelId]: [...(state.messages[channelId] || []), newMessage]
            }
          };
        });
      }
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white text-gray-900 font-sans antialiased">
      <WorkspaceRail />
      <ChannelSidebar />
      <main className="flex-1 flex min-w-0 relative">
        <ChatArea />
        <ThreadView />
      </main>
      <SearchModal />
    </div>
  );
};

export default App;

import { create } from 'zustand';
import { User, Workspace, Channel, Message, Thread } from './types';
import { users, workspaces, channels, initialMessages, CURRENT_USER_ID } from './mockData';

interface AppState {
  currentUser: User;
  users: User[];
  workspaces: Workspace[];
  channels: Channel[];
  messages: Record<string, Message[]>; // channelId -> messages
  activeWorkspaceId: string;
  activeChannelId: string;
  activeThreadId: string | null; // messageId that opened the thread
  activeThreadMessages: Message[];
  searchOpen: boolean;
  typingUsers: Record<string, string[]>; // channelId -> userNames

  // Actions
  setActiveWorkspace: (id: string) => void;
  setActiveChannel: (id: string) => void;
  openThread: (messageId: string) => void;
  closeThread: () => void;
  toggleSearch: (open: boolean) => void;
  sendMessage: (channelId: string, content: string, parentId?: string) => void;
  addReaction: (messageId: string, emoji: string) => void;
  
  // Computed helpers (simulated)
  getChannelName: (channel: Channel) => string;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: users.find(u => u.id === CURRENT_USER_ID)!,
  users: users,
  workspaces: workspaces,
  channels: channels,
  messages: initialMessages,
  activeWorkspaceId: workspaces[0].id,
  activeChannelId: channels[0].id,
  activeThreadId: null,
  activeThreadMessages: [],
  searchOpen: false,
  typingUsers: {},

  setActiveWorkspace: (id) => {
    const firstChannel = get().channels.find(c => c.workspaceId === id);
    set({ 
      activeWorkspaceId: id, 
      activeChannelId: firstChannel ? firstChannel.id : '',
      activeThreadId: null 
    });
  },

  setActiveChannel: (id) => {
    set({ activeChannelId: id, activeThreadId: null });
  },

  openThread: (messageId) => {
    // In a real app, fetch thread messages. Here we simulate replies or filter existing.
    // For this mock, we'll just generate some dummy replies if they don't exist
    set({ activeThreadId: messageId });
  },

  closeThread: () => set({ activeThreadId: null }),
  
  toggleSearch: (open) => set({ searchOpen: open }),

  sendMessage: (channelId, content, parentId) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      channelId,
      authorId: get().currentUser.id,
      content,
      createdAt: new Date().toISOString(),
      reactions: [],
      isOptimistic: true,
      threadId: parentId
    };

    if (parentId) {
       // It's a thread reply
       // In a real app, this would append to a sub-collection. 
       // We will just add it to main messages for simplicity or handle in UI.
       // For the mock, let's just assume we update the view.
    } else {
      set(state => ({
        messages: {
          ...state.messages,
          [channelId]: [...(state.messages[channelId] || []), newMessage]
        }
      }));
    }

    // Simulate Server Response (remove optimistic flag)
    setTimeout(() => {
      set(state => {
        const channelMsgs = state.messages[channelId].map(m => 
          m.id === newMessage.id ? { ...m, isOptimistic: false } : m
        );
        return {
          messages: { ...state.messages, [channelId]: channelMsgs }
        };
      });
    }, 600);
  },

  addReaction: (messageId, emoji) => {
    // Locate message across all channels (inefficient but fine for mock)
    set(state => {
      const newMessages = { ...state.messages };
      for (const chId in newMessages) {
        newMessages[chId] = newMessages[chId].map(msg => {
          if (msg.id === messageId) {
            const existingReaction = msg.reactions.find(r => r.emoji === emoji);
            let newReactions = [...msg.reactions];
            
            if (existingReaction) {
              if (existingReaction.userIds.includes(get().currentUser.id)) {
                // Toggle off
                existingReaction.userIds = existingReaction.userIds.filter(id => id !== get().currentUser.id);
                if (existingReaction.userIds.length === 0) {
                  newReactions = newReactions.filter(r => r.emoji !== emoji);
                }
              } else {
                existingReaction.userIds.push(get().currentUser.id);
              }
            } else {
              newReactions.push({ emoji, userIds: [get().currentUser.id] });
            }
            return { ...msg, reactions: newReactions };
          }
          return msg;
        });
      }
      return { messages: newMessages };
    });
  },

  getChannelName: (channel) => {
    if (channel.type === 'dm') return channel.name;
    return channel.name;
  }
}));

import { User, Workspace, Channel, Message } from './types';

export const CURRENT_USER_ID = 'user-1';

export const users: User[] = [
  { id: 'user-1', name: 'You', email: 'you@nexus.com', avatarUrl: 'https://i.pravatar.cc/150?u=user-1', status: 'online' },
  { id: 'user-2', name: 'Sarah Connor', email: 'sarah@nexus.com', avatarUrl: 'https://i.pravatar.cc/150?u=user-2', status: 'busy', customStatus: { emoji: '📅', text: 'In a meeting' } },
  { id: 'user-3', name: 'John Doe', email: 'john@nexus.com', avatarUrl: 'https://i.pravatar.cc/150?u=user-3', status: 'online' },
  { id: 'user-4', name: 'Alice Smith', email: 'alice@nexus.com', avatarUrl: 'https://i.pravatar.cc/150?u=user-4', status: 'away' },
  { id: 'user-5', name: 'Bob Wilson', email: 'bob@nexus.com', avatarUrl: 'https://i.pravatar.cc/150?u=user-5', status: 'offline' },
];

export const workspaces: Workspace[] = [
  { id: 'ws-1', name: 'Acme Corp', slug: 'acme', logoUrl: 'https://picsum.photos/id/1/200/200' },
  { id: 'ws-2', name: 'Startup Inc', slug: 'startup', logoUrl: 'https://picsum.photos/id/20/200/200' },
  { id: 'ws-3', name: 'Community', slug: 'community', logoUrl: 'https://picsum.photos/id/30/200/200' },
];

export const channels: Channel[] = [
  // Workspace 1 Channels
  { id: 'ch-1', workspaceId: 'ws-1', name: 'general', type: 'public', isPrivate: false, memberIds: ['user-1', 'user-2', 'user-3'], description: 'Company-wide announcements and work-based matters', unreadCount: 0 },
  { id: 'ch-2', workspaceId: 'ws-1', name: 'random', type: 'public', isPrivate: false, memberIds: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'], description: 'Non-work banter and water cooler talk', unreadCount: 3 },
  { id: 'ch-3', workspaceId: 'ws-1', name: 'engineering', type: 'public', isPrivate: false, memberIds: ['user-1', 'user-3', 'user-5'], description: 'Engineering team chat', unreadCount: 0 },
  { id: 'ch-4', workspaceId: 'ws-1', name: 'design-secret', type: 'private', isPrivate: true, memberIds: ['user-1', 'user-4'], description: 'Top secret design work', unreadCount: 0 },
  // DMs
  { id: 'dm-1', workspaceId: 'ws-1', name: 'Sarah Connor', type: 'dm', isPrivate: true, memberIds: ['user-1', 'user-2'], unreadCount: 1 },
  { id: 'dm-2', workspaceId: 'ws-1', name: 'John Doe', type: 'dm', isPrivate: true, memberIds: ['user-1', 'user-3'], unreadCount: 0 },
  
  // Workspace 2
  { id: 'ch-5', workspaceId: 'ws-2', name: 'general', type: 'public', isPrivate: false, memberIds: ['user-1'], description: 'Welcome to Startup Inc', unreadCount: 0 },
];

const generateMessages = (channelId: string, count: number): Message[] => {
  const msgs: Message[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const isMe = Math.random() > 0.7;
    const authorId = isMe ? CURRENT_USER_ID : users[Math.floor(Math.random() * users.length)].id;
    const time = new Date(now.getTime() - (count - i) * 1000 * 60 * 60); // Hours ago
    
    msgs.push({
      id: `msg-${channelId}-${i}`,
      channelId,
      authorId,
      content: [
        "Hey everyone! Just checking in.",
        "Has anyone seen the latest specs?",
        "I'm working on the new feature, should be done by EOD.",
        "Did you see that funny cat video?",
        "Can we reschedule the meeting?",
        "Deployment is successful! 🚀",
        "Here is the file you asked for.",
        "Please review the PR when you have a moment."
      ][Math.floor(Math.random() * 8)],
      createdAt: time.toISOString(),
      reactions: Math.random() > 0.8 ? [{ emoji: '👍', userIds: ['user-2'] }] : [],
      replyCount: Math.random() > 0.8 ? Math.floor(Math.random() * 5) + 1 : 0
    });
  }
  return msgs;
};

export const initialMessages: Record<string, Message[]> = {};
channels.forEach(ch => {
  initialMessages[ch.id] = generateMessages(ch.id, 15);
});

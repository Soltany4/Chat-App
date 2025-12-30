export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
  status: 'online' | 'offline' | 'busy' | 'away';
  customStatus?: {
    emoji: string;
    text: string;
  };
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
}

export interface Channel {
  id: string;
  workspaceId: string;
  name: string;
  type: 'public' | 'private' | 'dm';
  description?: string;
  isPrivate: boolean;
  memberIds: string[];
  unreadCount?: number;
}

export interface Attachment {
  id: string;
  type: 'image' | 'file' | 'video';
  url: string;
  name: string;
  size: string;
}

export interface Reaction {
  emoji: string;
  userIds: string[];
}

export interface Message {
  id: string;
  channelId: string;
  authorId: string;
  content: string;
  createdAt: string; // ISO string
  attachments?: Attachment[];
  reactions: Reaction[];
  threadId?: string; // If it's a reply
  replyCount?: number;
  isOptimistic?: boolean;
}

export interface Thread {
  id: string; // usually same as parent message id
  rootMessageId: string;
  messages: Message[];
}

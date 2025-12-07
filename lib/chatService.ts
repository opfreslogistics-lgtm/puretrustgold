import { supabase } from './supabase';

export interface ChatMessage {
  id: string;
  chat_session_id: string;
  sender_id: 'user' | 'admin';
  sender_name?: string;
  sender_email?: string;
  message: string;
  file_url?: string;
  file_name?: string;
  file_type?: string;
  is_read: boolean;
  created_at: string;
}

export interface ChatSession {
  id: string;
  user_name?: string;
  user_email?: string;
  status: 'active' | 'closed' | 'waiting';
  last_message_at: string;
  created_at: string;
  updated_at: string;
}

export const chatService = {
  // Create or get active chat session
  async getOrCreateSession(userName?: string, userEmail?: string): Promise<{ data: ChatSession | null; error: string | null }> {
    try {
      // Try to find an active session first
      const { data: existingSession, error: findError } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (existingSession && !findError) {
        return { data: existingSession as ChatSession, error: null };
      }

      // Create new session
      const { data: newSession, error: createError } = await supabase
        .from('chat_sessions')
        .insert({
          user_name: userName,
          user_email: userEmail,
          status: 'active',
        })
        .select()
        .single();

      if (createError) {
        return { data: null, error: createError.message };
      }

      return { data: newSession as ChatSession, error: null };
    } catch (error: any) {
      return { data: null, error: error.message || 'Failed to get or create session' };
    }
  },

  // Send a message
  async sendMessage(
    sessionId: string,
    message: string,
    senderId: 'user' | 'admin',
    senderName?: string,
    senderEmail?: string,
    fileUrl?: string,
    fileName?: string,
    fileType?: string
  ): Promise<{ data: ChatMessage | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          chat_session_id: sessionId,
          sender_id: senderId,
          sender_name: senderName,
          sender_email: senderEmail,
          message,
          file_url: fileUrl,
          file_name: fileName,
          file_type: fileType,
          is_read: senderId === 'admin', // Admin messages are auto-read
        })
        .select()
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      // Update session last_message_at
      await supabase
        .from('chat_sessions')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', sessionId);

      return { data: data as ChatMessage, error: null };
    } catch (error: any) {
      return { data: null, error: error.message || 'Failed to send message' };
    }
  },

  // Get messages for a session
  async getMessages(sessionId: string): Promise<{ data: ChatMessage[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('chat_session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: (data || []) as ChatMessage[], error: null };
    } catch (error: any) {
      return { data: null, error: error.message || 'Failed to get messages' };
    }
  },

  // Get all active sessions (for admin)
  async getActiveSessions(): Promise<{ data: ChatSession[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .in('status', ['active', 'waiting'])
        .order('last_message_at', { ascending: false });

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: (data || []) as ChatSession[], error: null };
    } catch (error: any) {
      return { data: null, error: error.message || 'Failed to get sessions' };
    }
  },

  // Mark messages as read
  async markAsRead(sessionId: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .update({ is_read: true })
        .eq('chat_session_id', sessionId)
        .eq('sender_id', 'user');

      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (error: any) {
      return { error: error.message || 'Failed to mark as read' };
    }
  },

  // Upload file to Supabase storage
  async uploadFile(file: File, sessionId: string): Promise<{ data: { url: string; name: string; type: string } | null; error: string | null }> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${sessionId}/${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `chat-files/${fileName}`;

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('chat-files')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        return { data: null, error: uploadError.message };
      }

      const { data: { publicUrl } } = supabase.storage
        .from('chat-files')
        .getPublicUrl(filePath);

      return {
        data: {
          url: publicUrl,
          name: file.name,
          type: file.type,
        },
        error: null,
      };
    } catch (error: any) {
      return { data: null, error: error.message || 'Failed to upload file' };
    }
  },
};



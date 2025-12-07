'use client'

import React, { useState, useEffect, useRef } from 'react';
import { chatService, ChatMessage, ChatSession } from '@/lib/chatService';
import { supabase } from '@/lib/supabase';
import { PaperClipIcon, SendIcon, XIcon } from '@/components/Icons';
import { useRouter } from 'next/navigation';
import { adminAuth } from '@/lib/adminAuth';

export default function AdminChat() {
  const router = useRouter();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [adminName, setAdminName] = useState('Admin');
  const [sendingMessage, setSendingMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const channelRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check admin authentication
    if (!adminAuth.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    const name = adminAuth.getName();
    if (name) setAdminName(name);

    loadSessions();
    const interval = setInterval(loadSessions, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedSession) {
      loadMessages(selectedSession.id);
      subscribeToMessages(selectedSession.id);
    }
  }, [selectedSession]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize audio for notifications
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OSfTQ8MUafj8LZjHAY4kdfyzHksBSR3x/DdkEAKFF606euoVRQKRp/g8r5sIQUrgc7y2Yk2CBtpvfDkn00PDFGn4/C2YxwGOJHX8sx5LAUkd8fw3ZBAC');
      audioRef.current.volume = 0.3;
    }
  }, []);

  const loadSessions = async () => {
    const result = await chatService.getActiveSessions();
    if (result.data) {
      setSessions(result.data);
      // Auto-select first session if none selected
      if (!selectedSession && result.data.length > 0) {
        setSelectedSession(result.data[0]);
      }
    }
  };

  const loadMessages = async (sessionId: string) => {
    const result = await chatService.getMessages(sessionId);
    if (result.data) {
      setMessages(result.data);
      // Mark as read
      await chatService.markAsRead(sessionId);
    }
  };

  const subscribeToMessages = (sessionId: string) => {
    // Clean up existing channel
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    const channel = supabase
      .channel(`admin-chat-${sessionId}-${Date.now()}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `chat_session_id=eq.${sessionId}`,
        },
        (payload) => {
          const newMessage = payload.new as ChatMessage;
          setMessages((prev) => {
            // Check if message already exists to prevent duplicates
            const exists = prev.some(m => m.id === newMessage.id);
            if (exists) return prev;
            
            // Play sound notification for new user messages
            if (newMessage.sender_id === 'user' && audioRef.current) {
              audioRef.current.play().catch(() => {
                // Ignore audio play errors
              });
            }
            
            return [...prev, newMessage];
          });
          chatService.markAsRead(sessionId);
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedSession || loading || sendingMessage) return;

    const messageText = inputMessage.trim();
    setInputMessage('');
    setSendingMessage(true);
    setLoading(true);

    try {
      const result = await chatService.sendMessage(
        selectedSession.id,
        messageText,
        'admin',
        adminName,
      );

      if (result.error) {
        alert('Error sending message: ' + result.error);
        setInputMessage(messageText); // Restore message on error
      } else if (result.data) {
        // Add message optimistically
        setMessages((prev) => {
          const exists = prev.some(m => m.id === result.data!.id);
          if (exists) return prev;
          return [...prev, result.data!];
        });
      }
    } catch (error: any) {
      alert('Error: ' + error.message);
      setInputMessage(messageText);
    } finally {
      setSendingMessage(false);
      setLoading(false);
      loadSessions(); // Refresh sessions
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!selectedSession || uploading) return;

    setUploading(true);
    const uploadResult = await chatService.uploadFile(file, selectedSession.id);

    if (uploadResult.error) {
      alert('Error uploading file: ' + uploadResult.error);
      setUploading(false);
      return;
    }

    if (uploadResult.data) {
      const result = await chatService.sendMessage(
        selectedSession.id,
        `📎 ${file.name}`,
        'admin',
        adminName,
        uploadResult.data.url,
        uploadResult.data.name,
        uploadResult.data.type,
      );

      if (result.error) {
        alert('Error sending file: ' + result.error);
      }
    }

    setUploading(false);
    loadSessions();
  };

  const unreadCount = (session: ChatSession) => {
    return messages.filter(m => m.chat_session_id === session.id && !m.is_read && m.sender_id === 'user').length;
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-deep-charcoal px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-serif text-white mb-2">Live Chat Management</h1>
            <p className="text-gray-400 text-sm">Manage customer conversations in real-time</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => router.push('/admin')}
              className="text-gold hover:text-white transition-colors text-sm uppercase tracking-widest"
            >
              ← Back to Dashboard
            </button>
            <button
              onClick={() => {
                adminAuth.clearSession();
                router.push('/');
              }}
              className="text-red-400 hover:text-red-300 transition-colors text-sm uppercase tracking-widest border border-red-900 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
          {/* Sessions List */}
          <div className="bg-black border border-gray-800 rounded-lg overflow-hidden">
            <div className="bg-gray-900 p-4 border-b border-gray-800">
              <h3 className="text-white font-serif">Active Sessions ({sessions.length})</h3>
            </div>
            <div className="overflow-y-auto h-full">
              {sessions.length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-sm">No active sessions</div>
              ) : (
                sessions.map((session) => {
                  const unread = unreadCount(session);
                  return (
                    <button
                      key={session.id}
                      onClick={() => setSelectedSession(session)}
                      className={`w-full p-4 text-left border-b border-gray-800 hover:bg-gray-900 transition-colors ${
                        selectedSession?.id === session.id ? 'bg-gray-900 border-l-4 border-gold' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-bold text-white">
                          {session.user_name || 'Anonymous'}
                        </div>
                        {unread > 0 && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {unread}
                          </span>
                        )}
                      </div>
                      {session.user_email && (
                        <div className="text-xs text-gray-400 mb-2">{session.user_email}</div>
                      )}
                      <div className="text-xs text-gray-500">
                        {new Date(session.last_message_at).toLocaleString()}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2 bg-black border border-gray-800 rounded-lg flex flex-col">
            {selectedSession ? (
              <>
                {/* Chat Header */}
                <div className="bg-gray-900 p-4 border-b border-gray-800">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-serif">
                        {selectedSession.user_name || 'Anonymous'}
                      </h3>
                      {selectedSession.user_email && (
                        <p className="text-xs text-gray-400">{selectedSession.user_email}</p>
                      )}
                    </div>
                    <span className="text-xs text-gold bg-gold/20 px-3 py-1 rounded uppercase">
                      {selectedSession.status}
                    </span>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50">
                  {Array.from(new Map(messages
                    .filter(m => m.chat_session_id === selectedSession.id)
                    .map(m => [m.id, m])).values())
                    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                    .map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender_id === 'admin' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            msg.sender_id === 'admin'
                              ? 'bg-gold text-black'
                              : 'bg-gray-800 text-white'
                          }`}
                        >
                          {msg.sender_id === 'user' && (
                            <div className="text-xs text-gray-400 mb-1">
                              {msg.sender_name || 'User'}
                            </div>
                          )}
                          {msg.file_url ? (
                            <div>
                              <a
                                href={msg.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline flex items-center space-x-2"
                              >
                                <PaperClipIcon className="w-4 h-4" />
                                <span>{msg.file_name || 'File'}</span>
                              </a>
                            </div>
                          ) : (
                            <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                          )}
                          <div className="text-xs opacity-60 mt-1">
                            {new Date(msg.created_at).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-gray-800 p-4 bg-gray-900">
                  <div className="flex space-x-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(e.target.files[0]);
                        }
                      }}
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="text-gray-400 hover:text-gold transition-colors disabled:opacity-50"
                    >
                      <PaperClipIcon className="w-5 h-5" />
                    </button>
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Type your message..."
                      className="flex-1 bg-black border border-gray-700 text-white p-2 focus:border-gold outline-none"
                      disabled={loading || uploading}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={loading || uploading || !inputMessage.trim()}
                      className="bg-gold text-black px-4 py-2 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploading ? (
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <SendIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a session to start chatting
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


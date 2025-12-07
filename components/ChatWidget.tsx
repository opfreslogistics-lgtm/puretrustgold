'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatService, ChatMessage, ChatSession } from '@/lib/chatService';
import { supabase } from '@/lib/supabase';
import { XIcon, PaperClipIcon, SendIcon } from './Icons';

interface ChatWidgetProps {
  isAdmin?: boolean;
  adminName?: string;
}

export default function ChatWidget({ isAdmin = false, adminName = 'Admin' }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showNameForm, setShowNameForm] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const channelRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !session && !showNameForm) {
      initializeSession();
    }
  }, [isOpen, showNameForm]);

  const initializeSession = async () => {
    if (isAdmin) {
      // For admin, we'll handle sessions differently
      return;
    }

    setLoading(true);
    
    // Auto-create user account if email is provided
    if (userEmail) {
      const { userAuth } = await import('@/lib/userAuth');
      await userAuth.createOrGetUser(userEmail, userName);
    }
    
    const result = await chatService.getOrCreateSession(userName || undefined, userEmail || undefined);
    if (result.data) {
      setSession(result.data);
      loadMessages(result.data.id);
      subscribeToMessages(result.data.id);
    }
    setLoading(false);
  };

  const loadMessages = async (sessionId: string) => {
    const result = await chatService.getMessages(sessionId);
    if (result.data) {
      setMessages(result.data);
    }
  };

  const subscribeToMessages = (sessionId: string) => {
    // Clean up existing channel
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    const channel = supabase
      .channel(`chat-${sessionId}-${Date.now()}`)
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
          // Check if message already exists to prevent duplicates
          setMessages((prev) => {
            const exists = prev.some(m => m.id === newMessage.id);
            if (exists) return prev;
            
            // Play sound notification for new messages
            if (audioRef.current) {
              audioRef.current.play().catch(() => {
                // Ignore audio play errors (user interaction required)
              });
            }
            
            return [...prev, newMessage];
          });
          
          // Mark as read if admin is viewing
          if (isAdmin) {
            chatService.markAsRead(sessionId);
          }
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
    if (!inputMessage.trim() || !session || loading || sendingMessage) return;

    const messageText = inputMessage.trim();
    setInputMessage('');
    setSendingMessage(true);
    setLoading(true);

    try {
      const result = await chatService.sendMessage(
        session.id,
        messageText,
        isAdmin ? 'admin' : 'user',
        isAdmin ? adminName : userName,
        isAdmin ? undefined : userEmail,
      );

      if (result.error) {
        alert('Error sending message: ' + result.error);
        setInputMessage(messageText); // Restore message on error
      } else if (result.data) {
        // Add message optimistically to show immediately
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
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!session || uploading) return;

    setUploading(true);
    const uploadResult = await chatService.uploadFile(file, session.id);

    if (uploadResult.error) {
      alert('Error uploading file: ' + uploadResult.error);
      setUploading(false);
      return;
    }

    if (uploadResult.data) {
      const result = await chatService.sendMessage(
        session.id,
        `📎 ${file.name}`,
        isAdmin ? 'admin' : 'user',
        isAdmin ? adminName : userName,
        isAdmin ? undefined : userEmail,
        uploadResult.data.url,
        uploadResult.data.name,
        uploadResult.data.type,
      );

      if (result.error) {
        alert('Error sending file: ' + result.error);
      }
    }

    setUploading(false);
  };

  const handleStartChat = () => {
    if (!userName.trim() && !isAdmin) {
      alert('Please enter your name');
      return;
    }
    setShowNameForm(false);
    initializeSession();
  };

  if (isAdmin) {
    // Admin view will be handled separately in admin panel
    return null;
  }

  // Initialize audio for notifications
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OSfTQ8MUafj8LZjHAY4kdfyzHksBSR3x/DdkEAKFF606euoVRQKRp/g8r5sIQUrgc7y2Yk2CBtpvfDkn00PDFGn4/C2YxwGOJHX8sx5LAUkd8fw3ZBAC');
      audioRef.current.volume = 0.3;
    }
  }, []);

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gold text-black rounded-full shadow-2xl hover:bg-white transition-all flex items-center justify-center z-50 group"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] bg-deep-charcoal border border-gold shadow-2xl rounded-lg flex flex-col z-50"
          >
            {/* Header */}
            <div className="bg-black border-b border-gold p-4 flex justify-between items-center">
              <div>
                <h3 className="text-white font-serif text-lg">Live Chat</h3>
                <p className="text-gold text-xs">PureTrust Gold Support</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50">
              {showNameForm ? (
                <div className="p-6">
                  <h4 className="text-white font-serif mb-4">Start a Conversation</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">Your Name</label>
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full bg-black border border-gray-700 text-white p-3 focus:border-gold outline-none"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">Email (Optional)</label>
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full bg-black border border-gray-700 text-white p-3 focus:border-gold outline-none"
                        placeholder="your@email.com"
                      />
                    </div>
                    <button
                      onClick={handleStartChat}
                      className="w-full bg-gold text-black py-3 uppercase font-bold tracking-widest hover:bg-white transition-colors"
                    >
                      Start Chat
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {loading && !session ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-gold text-sm">Connecting...</div>
                    </div>
                  ) : (
                    <>
                      {Array.from(new Map(messages.map(m => [m.id, m])).values())
                        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                        .map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender_id === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              msg.sender_id === 'user'
                                ? 'bg-gold text-black'
                                : 'bg-gray-800 text-white'
                            }`}
                          >
                            {msg.sender_id === 'admin' && (
                              <div className="text-xs text-gray-400 mb-1">{msg.sender_name || 'Admin'}</div>
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
                              {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </>
              )}
            </div>

            {/* Input Area */}
            {!showNameForm && session && (
              <div className="border-t border-gray-800 p-4 bg-black">
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
                    className="flex-1 bg-deep-charcoal border border-gray-700 text-white p-2 focus:border-gold outline-none"
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
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


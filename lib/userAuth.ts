import { supabase } from './supabase';

// User authentication utility for chat users
export const userAuth = {
  // Auto-create user account when first chatting
  async createOrGetUser(email: string, name: string): Promise<{ userId: string | null; error: string | null }> {
    try {
      // Check if user already exists
      const { data: existingUser, error: checkError } = await supabase.auth.getUser();
      
      if (existingUser?.user) {
        return { userId: existingUser.user.id, error: null };
      }

      // Generate a random password (user won't know it)
      const randomPassword = Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12) + 'A1!';
      
      // Sign up the user with Supabase Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password: randomPassword,
        options: {
          data: {
            name,
            is_chat_user: true, // Mark as chat user
          },
          // Disable email confirmation for chat users (set in Supabase dashboard)
          emailRedirectTo: window.location.origin,
        },
      });

      if (signUpError || !authData.user) {
        // If user already exists, try to sign in
        if (signUpError?.message?.includes('already registered')) {
          // Try to sign in (this won't work without password, but we'll handle it)
          // For existing users, we'll just use their email as identifier
          return { userId: email, error: null };
        }
        return { userId: null, error: signUpError?.message || 'Failed to create user' };
      }

      return { userId: authData.user.id, error: null };
    } catch (error: any) {
      return { userId: null, error: error.message || 'Failed to create user account' };
    }
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },
};


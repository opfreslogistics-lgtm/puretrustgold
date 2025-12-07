import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create admin Supabase client with service role key for auth operations
// Note: In production, you should use a server-side service role key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Use Supabase Auth to sign in
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if user has admin role (you can check user metadata or a separate table)
    // For now, we'll check if the user exists in auth.users
    // You can add role checking logic here based on your requirements

    return NextResponse.json(
      {
        success: true,
        token: authData.session?.access_token || '',
        refreshToken: authData.session?.refresh_token || '',
        name: authData.user.user_metadata?.name || authData.user.email?.split('@')[0] || 'Admin',
        email: authData.user.email || email,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 500 }
    );
  }
}


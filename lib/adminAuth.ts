// Admin Authentication Utility

export const ADMIN_TOKEN_KEY = 'admin_token';
export const ADMIN_NAME_KEY = 'admin_name';
export const ADMIN_EMAIL_KEY = 'admin_email';

export const adminAuth = {
  // Check if admin is logged in
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem(ADMIN_TOKEN_KEY);
  },

  // Get admin token
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(ADMIN_TOKEN_KEY);
  },

  // Get admin name
  getName(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(ADMIN_NAME_KEY);
  },

  // Get admin email
  getEmail(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(ADMIN_EMAIL_KEY);
  },

  // Set admin session
  setSession(token: string, name: string, email: string, refreshToken?: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
    localStorage.setItem(ADMIN_NAME_KEY, name);
    localStorage.setItem(ADMIN_EMAIL_KEY, email);
    if (refreshToken) {
      localStorage.setItem('admin_refresh_token', refreshToken);
    }
  },

  // Clear admin session (logout)
  clearSession(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_NAME_KEY);
    localStorage.removeItem(ADMIN_EMAIL_KEY);
  },

  // Verify token with server (optional - for enhanced security)
  async verifyToken(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;

    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      return response.ok;
    } catch {
      return false;
    }
  },
};


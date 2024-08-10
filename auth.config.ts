import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    // サイン・イン　ページは '/login' に遷移させるのか？
    signIn: '/login',
  },
  callbacks: {
    // 認可。リクエストが完了する前に呼び出される？
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;

        // ログインしていなければ、認可しない
        return false; // Redirect unauthenticated users to login page

      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

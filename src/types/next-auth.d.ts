import 'next-auth';

declare module 'next-auth' {
  interface User {
    username: string;
    firstName: string;
    lastName: string;
  }

  interface Session {
    user: User & {
      username: string;
      firstName: string;
      lastName: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    username: string;
    firstName: string;
    lastName: string;
  }
} 
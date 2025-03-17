import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Finance Manager',
  description: 'Login to your Finance Manager account',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 
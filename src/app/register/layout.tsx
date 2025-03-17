import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register | Finance Manager',
  description: 'Create a new Finance Manager account',
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 
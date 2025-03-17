'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    redirect('/login');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">User Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <p className="mt-1 text-lg">{session?.user?.name || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <p className="mt-1 text-lg">{session?.user?.email || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 
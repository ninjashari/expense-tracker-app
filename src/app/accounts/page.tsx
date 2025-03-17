'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

interface Account {
  _id: string;
  name: string;
  type: string;
  status: string;
  currentBalance: number;
  currency: string;
}

export default function AccountsPage() {
  const { data: session, status } = useSession();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    redirect('/login');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Accounts</h1>
        <Link 
          href="/accounts/new" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add New Account
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">Loading accounts...</div>
      ) : accounts.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-gray-500">No accounts found. Add your first account to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <div key={account._id} className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{account.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{account.type}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded ${
                  account.status === 'active' ? 'bg-green-100 text-green-800' :
                  account.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {account.status}
                </span>
              </div>
              <div className="mb-4">
                <p className="text-2xl font-bold">
                  {account.currency} {account.currentBalance.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <Link
                  href={`/accounts/${account._id}/edit`}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => {/* TODO: Implement delete functionality */}}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 
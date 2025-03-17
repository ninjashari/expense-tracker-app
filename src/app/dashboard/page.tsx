'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface DashboardStats {
  totalAccounts: number;
  totalBalance: number;
  activeAccounts: number;
  inactiveAccounts: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    totalAccounts: 0,
    totalBalance: 0,
    activeAccounts: 0,
    inactiveAccounts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      fetchDashboardStats();
    }
  }, [status, router]);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/accounts');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }
      const accounts = await response.json();
      
      const stats = {
        totalAccounts: accounts.length,
        totalBalance: accounts.reduce((sum: number, account: any) => sum + account.currentBalance, 0),
        activeAccounts: accounts.filter((account: any) => account.status === 'active').length,
        inactiveAccounts: accounts.filter((account: any) => account.status === 'inactive').length,
      };
      
      setStats(stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-800 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <div className="space-x-4">
            <Link
              href="/accounts/new"
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg"
            >
              Add Account
            </Link>
            <Link
              href="/accounts"
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              View All Accounts
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-100 mb-2">Total Accounts</h3>
            <p className="text-3xl font-bold text-white">{stats.totalAccounts}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-100 mb-2">Total Balance</h3>
            <p className="text-3xl font-bold text-white">₹{stats.totalBalance.toLocaleString()}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-100 mb-2">Active Accounts</h3>
            <p className="text-3xl font-bold text-white">{stats.activeAccounts}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-100 mb-2">Inactive Accounts</h3>
            <p className="text-3xl font-bold text-white">{stats.inactiveAccounts}</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/accounts/new"
              className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg text-center"
            >
              Add New Account
            </Link>
            <Link
              href="/accounts"
              className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg text-center"
            >
              Manage Accounts
            </Link>
            <Link
              href="/transactions"
              className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg text-center"
            >
              View Transactions
            </Link>
            <Link
              href="/reports"
              className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg text-center"
            >
              View Reports
            </Link>
            <Link
              href="/settings"
              className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg text-center"
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
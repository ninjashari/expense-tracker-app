'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <div className="space-x-4">
            <Link
              href="/accounts/new"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Add Account
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Accounts</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalAccounts}</p>
          </div>
          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Balance</h3>
            <p className="text-3xl font-bold text-gray-900">₹{stats.totalBalance.toLocaleString()}</p>
          </div>
          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Accounts</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.activeAccounts}</p>
          </div>
          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Inactive Accounts</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.inactiveAccounts}</p>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/accounts/new"
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 p-4 rounded-lg text-center transition-colors duration-200"
            >
              Add New Account
            </Link>
            <Link
              href="/accounts"
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 p-4 rounded-lg text-center transition-colors duration-200"
            >
              Manage Accounts
            </Link>
            <Link
              href="/transactions"
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 p-4 rounded-lg text-center transition-colors duration-200"
            >
              View Transactions
            </Link>
            <Link
              href="/reports"
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 p-4 rounded-lg text-center transition-colors duration-200"
            >
              View Reports
            </Link>
            <Link
              href="/settings"
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 p-4 rounded-lg text-center transition-colors duration-200"
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
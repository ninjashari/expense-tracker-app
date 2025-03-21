'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';

export default function NewAccountPage() {
  const router = useRouter();
  const { status } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    type: 'savings',
    status: 'active',
    initialBalance: '',
    currency: 'INR',
    openingDate: new Date().toISOString().split('T')[0],
    minimumBalance: '',
    notes: '',
    accountNumber: '',
    creditLimit: '',
    interestRate: '',
    paymentDueDate: '',
    minimumPayment: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          initialBalance: parseFloat(formData.initialBalance),
          minimumBalance: formData.minimumBalance ? parseFloat(formData.minimumBalance) : undefined,
          creditLimit: formData.creditLimit ? parseFloat(formData.creditLimit) : undefined,
          interestRate: formData.interestRate ? parseFloat(formData.interestRate) : undefined,
          minimumPayment: formData.minimumPayment ? parseFloat(formData.minimumPayment) : undefined
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create account');
      }

      router.push('/accounts');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-semibold text-gray-900">
            Add New Account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Account Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Account Type
                </label>
                <div className="mt-1">
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white text-gray-900"
                  >
                    <option value="savings" className="bg-white text-gray-900">Savings</option>
                    <option value="checking" className="bg-white text-gray-900">Checking</option>
                    <option value="credit" className="bg-white text-gray-900">Credit</option>
                    <option value="investment" className="bg-white text-gray-900">Investment</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                  Account Number (Optional)
                </label>
                <div className="mt-1">
                  <input
                    id="accountNumber"
                    name="accountNumber"
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <div className="mt-1">
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white text-gray-900"
                  >
                    <option value="active" className="bg-white text-gray-900">Active</option>
                    <option value="inactive" className="bg-white text-gray-900">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="initialBalance" className="block text-sm font-medium text-gray-700">
                  Initial Balance
                </label>
                <div className="mt-1">
                  <input
                    id="initialBalance"
                    name="initialBalance"
                    type="number"
                    step="0.01"
                    required
                    value={formData.initialBalance}
                    onChange={(e) => setFormData({ ...formData, initialBalance: e.target.value })}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="minimumBalance" className="block text-sm font-medium text-gray-700">
                  Minimum Balance (Optional)
                </label>
                <div className="mt-1">
                  <input
                    id="minimumBalance"
                    name="minimumBalance"
                    type="number"
                    step="0.01"
                    value={formData.minimumBalance}
                    onChange={(e) => setFormData({ ...formData, minimumBalance: e.target.value })}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">
                  Interest Rate % (Optional)
                </label>
                <div className="mt-1">
                  <input
                    id="interestRate"
                    name="interestRate"
                    type="number"
                    step="0.01"
                    value={formData.interestRate}
                    onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-gray-900"
                  />
                </div>
              </div>

              {formData.type === 'credit' && (
                <>
                  <div>
                    <label htmlFor="creditLimit" className="block text-sm font-medium text-gray-700">
                      Credit Limit (Optional)
                    </label>
                    <div className="mt-1">
                      <input
                        id="creditLimit"
                        name="creditLimit"
                        type="number"
                        step="0.01"
                        value={formData.creditLimit}
                        onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="paymentDueDate" className="block text-sm font-medium text-gray-700">
                      Payment Due Date (Optional)
                    </label>
                    <div className="mt-1">
                      <input
                        id="paymentDueDate"
                        name="paymentDueDate"
                        type="date"
                        value={formData.paymentDueDate}
                        onChange={(e) => setFormData({ ...formData, paymentDueDate: e.target.value })}
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="minimumPayment" className="block text-sm font-medium text-gray-700">
                      Minimum Payment (Optional)
                    </label>
                    <div className="mt-1">
                      <input
                        id="minimumPayment"
                        name="minimumPayment"
                        type="number"
                        step="0.01"
                        value={formData.minimumPayment}
                        onChange={(e) => setFormData({ ...formData, minimumPayment: e.target.value })}
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-gray-900"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                  Currency
                </label>
                <div className="mt-1">
                  <select
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white text-gray-900"
                  >
                    <option value="INR" className="bg-white text-gray-900">INR</option>
                    <option value="USD" className="bg-white text-gray-900">USD</option>
                    <option value="EUR" className="bg-white text-gray-900">EUR</option>
                    <option value="GBP" className="bg-white text-gray-900">GBP</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="openingDate" className="block text-sm font-medium text-gray-700">
                  Opening Date
                </label>
                <div className="mt-1">
                  <input
                    id="openingDate"
                    name="openingDate"
                    type="date"
                    required
                    value={formData.openingDate}
                    onChange={(e) => setFormData({ ...formData, openingDate: e.target.value })}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Notes (Optional)
                </label>
                <div className="mt-1">
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 
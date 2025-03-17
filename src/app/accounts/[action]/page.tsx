'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Props = {
  params: Promise<{ action: string }>;
  searchParams?: Promise<any>;
}

interface AccountFormData {
  name: string;
  type: string;
  status: string;
  initialBalance: number;
  openingDate: string;
  currency: string;
  notes?: string;
  accountNumber?: string;
  minimumBalance: number;
  currentBalance: number;
  creditLimit?: number;
  interestRate?: number;
  paymentDueDate?: string;
  minimumPayment?: number;
}

const ACCOUNT_TYPES = ['savings', 'checking', 'credit', 'investment', 'loan', 'other'];
const ACCOUNT_STATUS = ['active', 'inactive', 'closed'];

export default function AccountForm({ params }: Props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [action, setAction] = useState<string>('new');

  useEffect(() => {
    params.then(({ action }) => setAction(action));
  }, [params]);

  const isEdit = action !== 'new';

  const [formData, setFormData] = useState<AccountFormData>({
    name: '',
    type: 'savings',
    status: 'active',
    initialBalance: 0,
    openingDate: new Date().toISOString().split('T')[0],
    currency: 'INR',
    minimumBalance: 0,
    currentBalance: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/accounts' + (isEdit ? `/${action}` : ''), {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save account');
      }

      router.push('/accounts');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{isEdit ? 'Edit Account' : 'Add New Account'}</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            >
              {ACCOUNT_TYPES.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            >
              {ACCOUNT_STATUS.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Balance *
            </label>
            <input
              type="number"
              name="initialBalance"
              value={formData.initialBalance}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opening Date *
            </label>
            <input
              type="date"
              name="openingDate"
              value={formData.openingDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency *
            </label>
            <input
              type="text"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Number
            </label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Balance *
            </label>
            <input
              type="number"
              name="minimumBalance"
              value={formData.minimumBalance}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Balance *
            </label>
            <input
              type="number"
              name="currentBalance"
              value={formData.currentBalance}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Credit Limit
            </label>
            <input
              type="number"
              name="creditLimit"
              value={formData.creditLimit || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate (%)
            </label>
            <input
              type="number"
              name="interestRate"
              value={formData.interestRate || ''}
              onChange={handleChange}
              step="0.01"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Due Date
            </label>
            <input
              type="date"
              name="paymentDueDate"
              value={formData.paymentDueDate || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Payment
            </label>
            <input
              type="number"
              name="minimumPayment"
              value={formData.minimumPayment || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes || ''}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/accounts')}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Account'}
          </button>
        </div>
      </form>
    </div>
  );
} 
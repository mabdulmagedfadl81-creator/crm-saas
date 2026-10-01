'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export const dynamic = 'force-dynamic';

interface DashboardStats {
  totalContacts: number;
  totalDeals: number;
  totalRevenue: number;
  recentActivities: any[];
}

export default function DashboardPage() {
  const t = useTranslations();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>{t('common.loading')}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">{t('header.title')}</h1>
          <button
            onClick={() => {
              fetch('/api/auth/logout', { method: 'POST' });
              router.push('/login');
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            {t('header.logout')}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('dashboard.welcome')}
          </h2>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Contacts Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('dashboard.totalContacts')}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats?.totalContacts || 0}
                </p>
              </div>
              <div className="text-4xl text-blue-500">👥</div>
            </div>
          </div>

          {/* Total Deals Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('dashboard.totalDeals')}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats?.totalDeals || 0}
                </p>
              </div>
              <div className="text-4xl text-green-500">📊</div>
            </div>
          </div>

          {/* Total Revenue Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('dashboard.totalRevenue')}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${stats?.totalRevenue || 0}
                </p>
              </div>
              <div className="text-4xl text-purple-500">💰</div>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="/contacts"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="text-2xl mb-2">👤</div>
            <h3 className="text-lg font-semibold text-gray-900">
              {t('contacts.title')}
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              {t('contacts.addNew')}
            </p>
          </a>

          <a
            href="/deals"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="text-2xl mb-2">🤝</div>
            <h3 className="text-lg font-semibold text-gray-900">
              {t('deals.title')}
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              {t('deals.addNew')}
            </p>
          </a>

          <a
            href="/pricing"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="text-2xl mb-2">💳</div>
            <h3 className="text-lg font-semibold text-gray-900">
              {t('pricing.title')}
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              {t('pricing.selectPlan')}
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}

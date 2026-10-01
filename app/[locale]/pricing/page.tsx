'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function PricingPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">💳 {t('pricing.title')}</h1>
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            {t('header.dashboard')}
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('pricing.selectPlan')}
          </h2>
          <p className="text-xl text-gray-600">
            Choose the perfect plan for your team
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">🆓 {t('pricing.free')}</h3>
            <p className="text-gray-600 mb-6">Perfect to get started</p>

            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$0</span>
              <span className="text-gray-600 ml-2">{t('pricing.perMonth')}</span>
            </div>

            <ul className="space-y-4 mb-8 text-gray-600">
              <li>✓ Up to 10 Contacts</li>
              <li>✓ Up to 5 Deals</li>
              <li>✓ Basic Dashboard</li>
              <li>✗ Email Reminders</li>
              <li>✗ API Access</li>
            </ul>

            <Link href="/dashboard" className="w-full block text-center bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
              {t('pricing.getStarted')}
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-2xl p-8 text-white transform scale-105">
            <div className="text-center text-blue-200 mb-4">
              ⭐ MOST POPULAR
            </div>

            <h3 className="text-2xl font-bold mb-2">💼 {t('pricing.pro')}</h3>
            <p className="text-blue-200 mb-6">For growing teams</p>

            <div className="mb-6">
              <span className="text-5xl font-bold">$9</span>
              <span className="text-blue-200 ml-2">{t('pricing.perMonth')}</span>
            </div>

            <ul className="space-y-4 mb-8 text-blue-100">
              <li>✓ {t('pricing.unlimited')} Contacts</li>
              <li>✓ {t('pricing.unlimited')} Deals</li>
              <li>✓ Advanced Dashboard</li>
              <li>✓ Email Reminders</li>
              <li>✓ AI Predictions</li>
              <li>✗ API Access</li>
            </ul>

            <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
              Upgrade to Pro
            </button>
          </div>

          {/* Business Plan */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">🏢 {t('pricing.business')}</h3>
            <p className="text-gray-600 mb-6">For enterprises</p>

            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$29</span>
              <span className="text-gray-600 ml-2">{t('pricing.perMonth')}</span>
            </div>

            <ul className="space-y-4 mb-8 text-gray-600">
              <li>✓ Everything in Pro</li>
              <li>✓ Full API Access</li>
              <li>✓ WhatsApp Integration</li>
              <li>✓ Telegram Integration</li>
              <li>✓ Advanced AI Analytics</li>
              <li>✓ Priority Support</li>
            </ul>

            <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
              Upgrade to Business
            </button>
          </div>
        </div>

        {/* Features Comparison */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            📊 Features Comparison
          </h3>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">Feature</th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-900">Free</th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-900">Pro</th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-900">Business</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-6 py-4 text-gray-900">Contact Management</td>
                  <td className="px-6 py-4 text-center">✓</td>
                  <td className="px-6 py-4 text-center">✓</td>
                  <td className="px-6 py-4 text-center">✓</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">Deal Management</td>
                  <td className="px-6 py-4 text-center">✓</td>
                  <td className="px-6 py-4 text-center">✓</td>
                  <td className="px-6 py-4 text-center">✓</td>
                </tr>
                <tr className="border-t">
                  <td className="px-6 py-4 text-gray-900">Email Reminders</td>
                  <td className="px-6 py-4 text-center">✗</td>
                  <td className="px-6 py-4 text-center">✓</td>
                  <td className="px-6 py-4 text-center">✓</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">WhatsApp Integration</td>
                  <td className="px-6 py-4 text-center">✗</td>
                  <td className="px-6 py-4 text-center">✗</td>
                  <td className="px-6 py-4 text-center">✓</td>
                </tr>
                <tr className="border-t">
                  <td className="px-6 py-4 text-gray-900">Telegram Integration</td>
                  <td className="px-6 py-4 text-center">✗</td>
                  <td className="px-6 py-4 text-center">✗</td>
                  <td className="px-6 py-4 text-center">✓</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">AI Predictions</td>
                  <td className="px-6 py-4 text-center">✗</td>
                  <td className="px-6 py-4 text-center">✓</td>
                  <td className="px-6 py-4 text-center">✓</td>
                </tr>
                <tr className="border-t">
                  <td className="px-6 py-4 text-gray-900">API Access</td>
                  <td className="px-6 py-4 text-center">✗</td>
                  <td className="px-6 py-4 text-center">✗</td>
                  <td className="px-6 py-4 text-center">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            ❓ FAQ
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h4>
              <p className="text-gray-600">Yes! Cancel your subscription anytime without penalties.</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-600">We accept all major credit cards via Stripe.</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h4>
              <p className="text-gray-600">Yes! Try Pro free for 14 days. No credit card required.</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Can I upgrade anytime?</h4>
              <p className="text-gray-600">Of course! Upgrade to a higher plan anytime.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

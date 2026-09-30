'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (plan: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const { sessionId } = await response.json();
      // Redirect to Stripe checkout (implement Stripe.js integration)
      alert(`Redirect to Stripe: ${sessionId}`);
    } catch (error) {
      alert('Error creating checkout session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">SalesCRM</h1>
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600">Choose the perfect plan for your team</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-white p-8 rounded-lg shadow border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
            <p className="text-gray-600 mb-6">Perfect to get started</p>

            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$0</span>
              <span className="text-gray-600 ml-2">forever</span>
            </div>

            <ul className="space-y-4 mb-8 text-gray-600">
              <li>✓ 1 User</li>
              <li>✓ 10 Contacts</li>
              <li>✓ 5 Deals</li>
              <li>✗ API Access</li>
              <li>✗ Priority Support</li>
            </ul>

            <button disabled className="w-full bg-gray-200 text-gray-600 py-2 rounded-lg font-medium cursor-not-allowed">
              Current Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-white p-8 rounded-lg shadow border-4 border-blue-600 transform scale-105">
            <div className="text-center">
              <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Most Popular
              </span>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
            <p className="text-gray-600 mb-6">For growing teams</p>

            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$9</span>
              <span className="text-gray-600 ml-2">/month</span>
            </div>

            <ul className="space-y-4 mb-8 text-gray-600">
              <li>✓ 5 Users</li>
              <li>✓ Unlimited Contacts</li>
              <li>✓ Unlimited Deals</li>
              <li>✓ Analytics Dashboard</li>
              <li>✗ API Access</li>
            </ul>

            <button
              onClick={() => handleCheckout('pro')}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Get Started'}
            </button>
          </div>

          {/* Business Plan */}
          <div className="bg-white p-8 rounded-lg shadow border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Business</h3>
            <p className="text-gray-600 mb-6">For enterprises</p>

            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$29</span>
              <span className="text-gray-600 ml-2">/month</span>
            </div>

            <ul className="space-y-4 mb-8 text-gray-600">
              <li>✓ Unlimited Users</li>
              <li>✓ Unlimited Contacts</li>
              <li>✓ Unlimited Deals</li>
              <li>✓ Full API Access</li>
              <li>✓ Priority Support</li>
            </ul>

            <button
              onClick={() => handleCheckout('business')}
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Get Started'}
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h3>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h4>
              <p className="text-gray-600">Yes! Cancel your subscription anytime without penalties.</p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-600">We accept all major credit cards via Stripe.</p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h4>
              <p className="text-gray-600">Yes! Try Pro free for 14 days. No credit card required.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

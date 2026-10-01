'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export const dynamic = 'force-dynamic';

export default function DealsPage() {
  const t = useTranslations();
  const [deals, setDeals] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    value: '',
    stage: 'prospect',
    probability: '50',
    dueDate: '',
    contactId: '',
  });

  useEffect(() => {
    fetchDeals();
    fetchContacts();
  }, []);

  const fetchDeals = async () => {
    try {
      const response = await fetch('/api/deals');
      if (response.ok) {
        const data = await response.json();
        setDeals(data);
      }
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts');
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          value: parseInt(formData.value),
          probability: parseInt(formData.probability),
        }),
      });

      if (response.ok) {
        setFormData({
          title: '',
          value: '',
          stage: 'prospect',
          probability: '50',
          dueDate: '',
          contactId: '',
        });
        setShowForm(false);
        fetchDeals();
      }
    } catch (error) {
      console.error('Error adding deal:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm(t('common.confirm'))) {
      try {
        await fetch(`/api/deals/${id}`, { method: 'DELETE' });
        fetchDeals();
      } catch (error) {
        console.error('Error deleting deal:', error);
      }
    }
  };

  const stageColors: Record<string, string> = {
    prospect: 'bg-gray-100 text-gray-800',
    qualified: 'bg-blue-100 text-blue-800',
    proposal: 'bg-yellow-100 text-yellow-800',
    negotiation: 'bg-purple-100 text-purple-800',
    won: 'bg-green-100 text-green-800',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">🤝 {t('deals.title')}</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            ➕ {t('deals.addNew')}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">{t('deals.addNew')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('deals.dealName')}
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('deals.value')} ($)
                  </label>
                  <input
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('deals.stage')}
                  </label>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="prospect">Prospect</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal">Proposal</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="won">Won</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('deals.probability')} (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.probability}
                    onChange={(e) => setFormData({ ...formData, probability: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('deals.dueDate')}
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('deals.contact')}
                  </label>
                  <select
                    value={formData.contactId}
                    onChange={(e) => setFormData({ ...formData, contactId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="">Select Contact</option>
                    {contacts.map((contact) => (
                      <option key={contact.id} value={contact.id}>
                        {contact.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700"
                >
                  {t('common.save')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-500"
                >
                  {t('common.cancel')}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Deals List */}
        {deals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deals.map((deal) => (
              <div key={deal.id} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900">{deal.title}</h3>

                <div className="mt-4 space-y-2">
                  <p className="text-2xl font-bold text-green-600">${deal.value}</p>
                  <p className="text-sm">
                    <span className={`inline-block px-3 py-1 rounded font-semibold ${stageColors[deal.stage] || 'bg-gray-100'}`}>
                      {deal.stage}
                    </span>
                  </p>
                  <p className="text-sm">📊 {deal.probability}% probability</p>
                  {deal.dueDate && <p className="text-sm">📅 Due: {new Date(deal.dueDate).toLocaleDateString()}</p>}
                </div>

                <button
                  onClick={() => handleDelete(deal.id)}
                  className="mt-4 bg-red-600 text-white px-4 py-1 rounded text-sm hover:bg-red-700 w-full"
                >
                  🗑️ {t('common.delete')}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t('deals.noDeals')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

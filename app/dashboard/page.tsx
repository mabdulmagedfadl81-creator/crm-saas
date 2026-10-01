'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [deals, setDeals] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalContacts: 0, totalDeals: 0, totalRevenue: 0 });

  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', company: '', title: '', status: 'prospect' });
  const [dealForm, setDealForm] = useState({ title: '', value: '', stage: 'prospect', probability: '50', dueDate: '', contactId: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contactsRes, dealsRes, statsRes] = await Promise.all([
        fetch('/api/contacts'),
        fetch('/api/deals'),
        fetch('/api/dashboard/stats'),
      ]);

      if (contactsRes.ok) setContacts(await contactsRes.json());
      if (dealsRes.ok) setDeals(await dealsRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      if (response.ok) {
        setContactForm({ name: '', email: '', phone: '', company: '', title: '', status: 'prospect' });
        fetchData();
      }
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const addDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...dealForm,
          value: parseInt(dealForm.value),
          probability: parseInt(dealForm.probability),
        }),
      });
      if (response.ok) {
        setDealForm({ title: '', value: '', stage: 'prospect', probability: '50', dueDate: '', contactId: '' });
        fetchData();
      }
    } catch (error) {
      console.error('Error adding deal:', error);
    }
  };

  const deleteContact = async (id: string) => {
    if (confirm('Delete this contact?')) {
      try {
        await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
        fetchData();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const deleteDeal = async (id: string) => {
    if (confirm('Delete this deal?')) {
      try {
        await fetch(`/api/deals/${id}`, { method: 'DELETE' });
        fetchData();
      } catch (error) {
        console.error('Error deleting deal:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">📊 SalesCRM Dashboard</h1>
          <Link href="/pricing" className="text-blue-600 hover:underline font-semibold">
            Pricing
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 font-semibold mb-2">👥 Total Contacts</h3>
            <p className="text-4xl font-bold text-blue-600">{contacts.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 font-semibold mb-2">🤝 Total Deals</h3>
            <p className="text-4xl font-bold text-purple-600">{deals.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 font-semibold mb-2">💰 Pipeline Value</h3>
            <p className="text-4xl font-bold text-green-600">${stats.totalRevenue}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Contact */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">➕ Add New Contact</h2>
            <form onSubmit={addContact} className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Company"
                value={contactForm.company}
                onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">
                Add Contact
              </button>
            </form>

            {/* Contacts List */}
            <div className="mt-6">
              <h3 className="font-bold text-lg mb-3">Contacts ({contacts.length})</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {contacts.map((contact) => (
                  <div key={contact.id} className="bg-gray-50 p-3 rounded flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.email}</p>
                      {contact.phone && <p className="text-sm text-gray-600">{contact.phone}</p>}
                    </div>
                    <button
                      onClick={() => deleteContact(contact.id)}
                      className="text-red-600 hover:text-red-800 font-semibold text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {contacts.length === 0 && <p className="text-gray-500 text-center py-4">No contacts yet</p>}
              </div>
            </div>
          </div>

          {/* Add Deal */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">➕ Add New Deal</h2>
            <form onSubmit={addDeal} className="space-y-3">
              <input
                type="text"
                placeholder="Deal Name"
                value={dealForm.title}
                onChange={(e) => setDealForm({ ...dealForm, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
              <input
                type="number"
                placeholder="Deal Value ($)"
                value={dealForm.value}
                onChange={(e) => setDealForm({ ...dealForm, value: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
              <select
                value={dealForm.stage}
                onChange={(e) => setDealForm({ ...dealForm, stage: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="prospect">Prospect</option>
                <option value="qualified">Qualified</option>
                <option value="proposal">Proposal</option>
                <option value="negotiation">Negotiation</option>
                <option value="won">Won</option>
              </select>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Probability (%)"
                value={dealForm.probability}
                onChange={(e) => setDealForm({ ...dealForm, probability: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="date"
                value={dealForm.dueDate}
                onChange={(e) => setDealForm({ ...dealForm, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <select
                value={dealForm.contactId}
                onChange={(e) => setDealForm({ ...dealForm, contactId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select Contact</option>
                {contacts.map((contact) => (
                  <option key={contact.id} value={contact.id}>
                    {contact.name}
                  </option>
                ))}
              </select>
              <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded font-semibold hover:bg-purple-700">
                Add Deal
              </button>
            </form>

            {/* Deals List */}
            <div className="mt-6">
              <h3 className="font-bold text-lg mb-3">Deals ({deals.length})</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {deals.map((deal) => (
                  <div key={deal.id} className="bg-gray-50 p-3 rounded flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{deal.title}</p>
                      <p className="text-sm text-green-600 font-bold">${deal.value}</p>
                      <p className="text-sm text-gray-600">{deal.stage} • {deal.probability}%</p>
                    </div>
                    <button
                      onClick={() => deleteDeal(deal.id)}
                      className="text-red-600 hover:text-red-800 font-semibold text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {deals.length === 0 && <p className="text-gray-500 text-center py-4">No deals yet</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

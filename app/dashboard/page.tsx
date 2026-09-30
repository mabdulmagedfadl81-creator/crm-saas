'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Contact {
  id: string;
  name: string;
  email?: string;
  company?: string;
  status: string;
}

interface Deal {
  id: string;
  title: string;
  value: number;
  stage: string;
  contactId: string;
  contact?: Contact;
}

export default function DashboardPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [tab, setTab] = useState('contacts');

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    const userData = localStorage.getItem('user');

    if (!token) {
      router.push('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    fetchData(token);
  }, [router]);

  const fetchData = async (token: string) => {
    setLoading(true);
    try {
      const [contactsRes, dealsRes] = await Promise.all([
        fetch('/api/contacts'),
        fetch('/api/deals'),
      ]);

      if (contactsRes.ok) {
        setContacts(await contactsRes.json());
      }
      if (dealsRes.ok) {
        setDeals(await dealsRes.json());
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const totalDealsValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const wonDeals = deals.filter(d => d.stage === 'won').length;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SalesCRM</h1>
            <p className="text-gray-600">Welcome, {user.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-medium">Total Contacts</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{contacts.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-medium">Total Deals</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">{deals.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-medium">Pipeline Value</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">${totalDealsValue.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-medium">Won Deals</h3>
            <p className="text-3xl font-bold text-emerald-600 mt-2">{wonDeals}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b">
            <div className="flex gap-4 px-6 pt-4">
              <button
                onClick={() => setTab('contacts')}
                className={`pb-4 font-medium border-b-2 transition ${
                  tab === 'contacts'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Contacts ({contacts.length})
              </button>
              <button
                onClick={() => setTab('deals')}
                className={`pb-4 font-medium border-b-2 transition ${
                  tab === 'deals'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Deals ({deals.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : tab === 'contacts' ? (
              <div>
                <h2 className="text-lg font-semibold mb-4">Contacts</h2>
                {contacts.length === 0 ? (
                  <p className="text-gray-500">No contacts yet. Start adding contacts!</p>
                ) : (
                  <div className="space-y-3">
                    {contacts.map(contact => (
                      <div key={contact.id} className="p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{contact.name}</h3>
                            {contact.email && <p className="text-sm text-gray-600">{contact.email}</p>}
                            {contact.company && <p className="text-sm text-gray-500">{contact.company}</p>}
                          </div>
                          <span className={`px-3 py-1 rounded text-sm font-medium ${
                            contact.status === 'new' ? 'bg-blue-100 text-blue-800' :
                            contact.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                            contact.status === 'qualified' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {contact.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h2 className="text-lg font-semibold mb-4">Sales Pipeline</h2>
                {deals.length === 0 ? (
                  <p className="text-gray-500">No deals yet. Create your first deal!</p>
                ) : (
                  <div className="space-y-3">
                    {deals.map(deal => (
                      <div key={deal.id} className="p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{deal.title}</h3>
                            {deal.contact && <p className="text-sm text-gray-600">{deal.contact.name}</p>}
                            <p className="text-sm font-semibold text-green-600 mt-1">${deal.value.toLocaleString()}</p>
                          </div>
                          <span className={`px-3 py-1 rounded text-sm font-medium ${
                            deal.stage === 'prospect' ? 'bg-blue-100 text-blue-800' :
                            deal.stage === 'negotiation' ? 'bg-yellow-100 text-yellow-800' :
                            deal.stage === 'decision' ? 'bg-purple-100 text-purple-800' :
                            deal.stage === 'won' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {deal.stage}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

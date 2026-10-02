'use client';

import { useState, useEffect } from 'react';

export const dynamic = 'force-dynamic';

export default function Dashboard() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [deals, setDeals] = useState<any[]>([]);

  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', company: '', title: '', status: 'prospect' });
  const [dealForm, setDealForm] = useState({ title: '', value: '', stage: 'prospect', probability: '50', dueDate: '', contactId: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contactsRes, dealsRes] = await Promise.all([
        fetch('/api/contacts'),
        fetch('/api/deals'),
      ]);
      if (contactsRes.ok) setContacts(await contactsRes.json());
      if (dealsRes.ok) setDeals(await dealsRes.json());
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
    if (confirm('حذف؟')) {
      try {
        await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
        fetchData();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const deleteDeal = async (id: string) => {
    if (confirm('حذف؟')) {
      try {
        await fetch(`/api/deals/${id}`, { method: 'DELETE' });
        fetchData();
      } catch (error) {
        console.error('Error deleting deal:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">📊 لوحة التحكم</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* إضافة جهات اتصال */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">👥 جهات اتصال ({contacts.length})</h2>
            <form onSubmit={addContact} className="space-y-3 mb-6">
              <input
                type="text"
                placeholder="الاسم"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="tel"
                placeholder="الهاتف"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="الشركة"
                value={contactForm.company}
                onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">
                ➕ إضافة
              </button>
            </form>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {contacts.map((contact) => (
                <div key={contact.id} className="bg-gray-50 p-3 rounded flex justify-between">
                  <div>
                    <p className="font-semibold">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                  </div>
                  <button onClick={() => deleteContact(contact.id)} className="text-red-600 font-bold">
                    ✕
                  </button>
                </div>
              ))}
              {contacts.length === 0 && <p className="text-gray-500 text-center py-4">لا توجد جهات اتصال</p>}
            </div>
          </div>

          {/* إضافة صفقات */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">🤝 صفقات ({deals.length})</h2>
            <form onSubmit={addDeal} className="space-y-3 mb-6">
              <input
                type="text"
                placeholder="اسم الصفقة"
                value={dealForm.title}
                onChange={(e) => setDealForm({ ...dealForm, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
              <input
                type="number"
                placeholder="القيمة ($)"
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
                <option value="prospect">مشروع</option>
                <option value="qualified">مؤهل</option>
                <option value="proposal">عرض</option>
                <option value="negotiation">تفاوض</option>
                <option value="won">مغلق</option>
              </select>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="الاحتمالية (%)"
                value={dealForm.probability}
                onChange={(e) => setDealForm({ ...dealForm, probability: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <select
                value={dealForm.contactId}
                onChange={(e) => setDealForm({ ...dealForm, contactId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              >
                <option value="">اختر جهة اتصال</option>
                {contacts.map((contact) => (
                  <option key={contact.id} value={contact.id}>
                    {contact.name}
                  </option>
                ))}
              </select>
              <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded font-semibold hover:bg-purple-700">
                ➕ إضافة صفقة
              </button>
            </form>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {deals.map((deal) => (
                <div key={deal.id} className="bg-gray-50 p-3 rounded flex justify-between">
                  <div>
                    <p className="font-semibold">{deal.title}</p>
                    <p className="text-sm text-green-600 font-bold">${deal.value}</p>
                    <p className="text-sm text-gray-600">{deal.stage} • {deal.probability}%</p>
                  </div>
                  <button onClick={() => deleteDeal(deal.id)} className="text-red-600 font-bold">
                    ✕
                  </button>
                </div>
              ))}
              {deals.length === 0 && <p className="text-gray-500 text-center py-4">لا توجد صفقات</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

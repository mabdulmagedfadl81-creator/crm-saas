'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export const dynamic = 'force-dynamic';

export default function SettingsPage() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState('integrations');
  const [settings, setSettings] = useState({
    whatsappPhone: '',
    telegramChatId: '',
    emailReminders: true,
    whatsappReminders: false,
    telegramReminders: false,
  });

  const handleSave = async () => {
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        alert('Settings saved successfully!');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">⚙️ Settings</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('integrations')}
            className={`pb-2 px-4 font-semibold ${
              activeTab === 'integrations'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600'
            }`}
          >
            📱 Integrations
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`pb-2 px-4 font-semibold ${
              activeTab === 'notifications'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600'
            }`}
          >
            🔔 Notifications
          </button>
        </div>

        {/* Integrations Tab */}
        {activeTab === 'integrations' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">WhatsApp</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="+1234567890"
                  value={settings.whatsappPhone}
                  onChange={(e) =>
                    setSettings({ ...settings, whatsappPhone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Telegram</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chat ID
                </label>
                <input
                  type="text"
                  placeholder="Your Chat ID"
                  value={settings.telegramChatId}
                  onChange={(e) =>
                    setSettings({ ...settings, telegramChatId: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-4 bg-white rounded-lg shadow p-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.emailReminders}
                onChange={(e) =>
                  setSettings({ ...settings, emailReminders: e.target.checked })
                }
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3">📧 Email Reminders</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.whatsappReminders}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    whatsappReminders: e.target.checked,
                  })
                }
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3">💬 WhatsApp Reminders</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.telegramReminders}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    telegramReminders: e.target.checked,
                  })
                }
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3">🤖 Telegram Reminders</span>
            </label>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            💾 Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

// WhatsApp Integration
export const sendWhatsAppMessage = async (phone: string, message: string) => {
  try {
    // Integration with WhatsApp Business API or Twilio
    const response = await fetch('https://api.whatsapp.com/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone_number_id: process.env.WHATSAPP_PHONE_ID,
        messages: [{
          messaging_product: 'whatsapp',
          to: phone,
          type: 'text',
          text: { body: message },
        }],
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('WhatsApp error:', error);
    return false;
  }
};

// Telegram Integration
export const sendTelegramMessage = async (chatId: string, message: string) => {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      }
    );
    return response.ok;
  } catch (error) {
    console.error('Telegram error:', error);
    return false;
  }
};

// Email Reminder
export const sendReminderEmail = async (
  email: string,
  subject: string,
  message: string
) => {
  try {
    const response = await fetch('/api/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        subject,
        body: message,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
};

// Schedule Reminder (in a real app, use a job queue like Bull or Agenda)
export const scheduleReminder = async (
  type: 'email' | 'whatsapp' | 'telegram',
  recipient: string,
  dealName: string,
  daysUntilDue: number
) => {
  const message = `Reminder: Deal "${dealName}" is due in ${daysUntilDue} days`;
  const subject = `Deal Reminder: ${dealName}`;

  if (type === 'email') {
    await sendReminderEmail(recipient, subject, message);
  } else if (type === 'whatsapp') {
    await sendWhatsAppMessage(recipient, message);
  } else if (type === 'telegram') {
    await sendTelegramMessage(recipient, message);
  }
};

# 🚀 نشر SalesCRM على Vercel

## المتطلبات:
1. حساب GitHub
2. حساب Vercel (مجاني)
3. حساب Neon (PostgreSQL مجاني)

## خطوات النشر:

### 1. إعداد قاعدة البيانات (Neon)

```bash
# اذهب إلى https://neon.tech
# سجّل باستخدام GitHub
# أنشئ project جديد
# انسخ DATABASE_URL من الـ dashboard
```

### 2. إعداد Repository على GitHub

```bash
git init
git add .
git commit -m "Initial CRM commit"
git branch -M main
git remote add origin https://github.com/your-username/crm-saas.git
git push -u origin main
```

### 3. ربط مع Vercel

```bash
# اختيار 1: من الطرف الميمنة
# اذهب إلى https://vercel.com
# اضغط "New Project"
# اختر GitHub repo الخاص بك
```

**أو بـ CLI:**
```bash
npm i -g vercel
vercel
```

### 4. إضافة متغيرات البيئة

في Vercel Dashboard:
```
Environment Variables:
- DATABASE_URL = your-neon-database-url
- NEXTAUTH_SECRET = generate-random-secret-key
- NEXTAUTH_URL = https://your-app.vercel.app
```

### 5. شغّل Migration على الـ Database

```bash
npx prisma migrate deploy
```

### 6. تم! 🎉

تطبيقك متاح على:
```
https://your-app.vercel.app
```

## إضافة الدفع (Stripe):

### أضف Stripe API keys:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
```

### أنشئ endpoint للـ checkout:

انسخ الكود في `app/api/checkout/route.ts`

## الأسعار الموصى بها:

- **Free:** مجاني - 10 جهات اتصال
- **Pro:** $9/شهر
- **Business:** $29/شهر

## كسب المال:

1. **Subscriptions** - 70% profit margin
2. **White Label** - بع نسخة للشركات
3. **Consulting** - ساعد العملاء بـ $50/hour
4. **Add-ons** - integrations مثل Slack, Teams

Good luck! 💰

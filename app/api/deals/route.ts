import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthToken, verifyToken } from '@/lib/auth';

async function getUserId(request: NextRequest): Promise<string | null> {
  const token = await getAuthToken();
  if (!token) return null;

  const decoded = verifyToken(token);
  return decoded?.userId || null;
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const deals = await prisma.deal.findMany({
      where: { userId },
      include: {
        contact: true,
        notes: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(deals);
  } catch (error) {
    console.error('Get deals error:', error);
    return NextResponse.json({ error: 'Failed to fetch deals' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { contactId, title, value, stage, probability, dueDate } = await request.json();

    if (!contactId || !title) {
      return NextResponse.json(
        { error: 'Contact ID and title are required' },
        { status: 400 }
      );
    }

    const deal = await prisma.deal.create({
      data: {
        userId,
        contactId,
        title,
        value: value || 0,
        stage: stage || 'prospect',
        probability: probability || 50,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
      include: { contact: true },
    });

    return NextResponse.json(deal, { status: 201 });
  } catch (error) {
    console.error('Create deal error:', error);
    return NextResponse.json({ error: 'Failed to create deal' }, { status: 500 });
  }
}

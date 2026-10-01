import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // In a real app, validate the JWT token here
    // For now, we'll extract userId from a session (you'd implement proper JWT validation)

    // Get stats from database
    const totalContacts = await prisma.contact.count();
    const totalDeals = await prisma.deal.count();
    const totalRevenue = await prisma.deal.aggregate({
      _sum: { value: true },
    });

    const recentActivities = await prisma.activity.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      totalContacts,
      totalDeals,
      totalRevenue: totalRevenue._sum.value || 0,
      recentActivities,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}

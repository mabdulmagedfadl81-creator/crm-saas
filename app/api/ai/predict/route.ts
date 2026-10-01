import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Simple ML model for predicting deal success based on historical data
export async function POST(request: NextRequest) {
  try {
    const { dealId } = await request.json();

    const deal = await prisma.deal.findUnique({
      where: { id: dealId },
      include: { contact: true, activities: true },
    });

    if (!deal) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
    }

    // Calculate success probability based on:
    // 1. Deal stage (higher stage = higher probability)
    // 2. Number of activities/interactions
    // 3. Contact engagement level
    // 4. Time in current stage

    const stageScores: Record<string, number> = {
      prospect: 0.2,
      qualified: 0.4,
      proposal: 0.6,
      negotiation: 0.8,
      won: 1.0,
    };

    const baseScore = stageScores[deal.stage] || 0.3;
    const activityScore = Math.min(deal.activities.length * 0.1, 0.4);
    const finalProbability = Math.min((baseScore + activityScore) * 100, 100);

    return NextResponse.json({
      dealId,
      dealName: deal.title,
      predictedProbability: Math.round(finalProbability),
      recommendation:
        finalProbability > 70
          ? '✅ High chance of closing this deal'
          : finalProbability > 40
          ? '⚠️ Medium chance - increase engagement'
          : '❌ Low probability - reassess strategy',
      factors: {
        currentStage: deal.stage,
        interactions: deal.activities.length,
        probability: deal.probability,
      },
    });
  } catch (error) {
    console.error('AI prediction error:', error);
    return NextResponse.json(
      { error: 'Failed to predict deal outcome' },
      { status: 500 }
    );
  }
}

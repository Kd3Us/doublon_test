import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const isActive = searchParams.get('active') !== 'false';

    const skip = (page - 1) * limit;

    const [events, totalCount] = await Promise.all([
      prisma.event.findMany({
        where: {
          isActive,
          isPublic: true,
          date: {
            gte: new Date()
          }
        },
        include: {
          creator: {
            select: {
              id: true,
              firstName: true,
              lastName: true
            }
          },
          _count: {
            select: {
              registrations: true
            }
          }
        },
        orderBy: {
          date: 'asc'
        },
        skip,
        take: limit
      }),
      prisma.event.count({
        where: {
          isActive,
          isPublic: true,
          date: {
            gte: new Date()
          }
        }
      })
    ]);

    const eventsWithMetadata = events.map(event => ({
      ...event,
      registrationCount: event._count.registrations,
      isFullyBooked: event.maxCapacity ? event._count.registrations >= event.maxCapacity : false,
      spotsRemaining: event.maxCapacity ? event.maxCapacity - event._count.registrations : null
    }));

    return NextResponse.json({
      events: eventsWithMetadata,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNext: page * limit < totalCount,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
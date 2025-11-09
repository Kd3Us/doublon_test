import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { registrationSchema } from '@/lib/validation';
import { sendConfirmationEmail } from '@/lib/email';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const eventId = params.id;
    const body = await request.json();
    const validatedData = registrationSchema.parse(body);

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        registrations: {
          select: {
            id: true,
            user: {
              select: {
                email: true
              }
            }
          }
        },
        _count: {
          select: {
            registrations: true
          }
        }
      }
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Événement non trouvé' },
        { status: 404 }
      );
    }

    if (!event.isActive) {
      return NextResponse.json(
        { error: 'Cet événement n\'est plus disponible pour inscription' },
        { status: 400 }
      );
    }

    if (event.date < new Date()) {
      return NextResponse.json(
        { error: 'Impossible de s\'inscrire à un événement passé' },
        { status: 400 }
      );
    }

    if (event.maxCapacity && event._count.registrations >= event.maxCapacity) {
      return NextResponse.json(
        { error: 'Cet événement est complet' },
        { status: 400 }
      );
    }

    const existingRegistration = event.registrations.find(
      reg => reg.user.email === validatedData.email
    );

    if (existingRegistration) {
      return NextResponse.json(
        { error: 'Vous êtes déjà inscrit à cet événement' },
        { status: 400 }
      );
    }

    let user = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });

    if (!user) {
      user = await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
          data: {
            email: validatedData.email,
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            role: validatedData.role === 'student' ? 'STUDENT' : 'COMPANY',
          }
        });

        if (validatedData.role === 'student') {
          await tx.studentInfo.create({
            data: {
              userId: newUser.id,
              school: 'HETIC',
            }
          });
        } else if (validatedData.role === 'company' && validatedData.company) {
          await tx.companyInfo.create({
            data: {
              userId: newUser.id,
              companyName: validatedData.company,
              position: 'Non spécifié',
            }
          });
        }

        return newUser;
      });
    }

    const registration = await prisma.eventRegistration.create({
      data: {
        userId: user.id,
        eventId: eventId,
        status: 'CONFIRMED',
        notes: validatedData.notes,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            role: true
          }
        },
        event: {
          select: {
            title: true,
            date: true,
            startTime: true,
            endTime: true,
            location: true
          }
        }
      }
    });

    try {
      await sendConfirmationEmail({
        to: user.email,
        userName: `${user.firstName} ${user.lastName}`,
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: `${event.startTime} - ${event.endTime}`,
        eventLocation: event.location,
      });
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email:', emailError);
    }

    return NextResponse.json({
      message: 'Inscription réussie',
      registration: {
        id: registration.id,
        status: registration.status,
        user: registration.user,
        event: registration.event
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
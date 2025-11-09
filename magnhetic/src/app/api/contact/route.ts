import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/lib/validation';
import { sendContactNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    const contactMessage = await prisma.contactMessage.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        company: validatedData.company,
        subject: validatedData.subject,
        message: validatedData.message,
        type: 'GENERAL',
        status: 'UNREAD'
      }
    });

    try {
      await sendContactNotification({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        company: validatedData.company,
        subject: validatedData.subject,
        message: validatedData.message,
      });
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de la notification:', emailError);
    }

    return NextResponse.json({
      message: 'Message envoyé avec succès',
      id: contactMessage.id
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
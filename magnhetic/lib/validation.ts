import { z } from 'zod';

export const emailSchema = z.string().email('Email invalide');

export const nameSchema = z
  .string()
  .min(1, 'Ce champ est requis')
  .max(50, 'Maximum 50 caractères');

export const registrationSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  role: z.enum(['student', 'company']),
  company: z.string().optional(),
  notes: z.string().optional(),
});

export const contactSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  company: z.string().optional(),
  subject: z.enum(['PARTNERSHIP', 'EVENT_ORGANIZATION', 'RECRUITMENT', 'TECHNICAL_ISSUE', 'OTHER']),
  message: z.string().min(10, 'Le message doit faire au moins 10 caractères').max(1000),
});
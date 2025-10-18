// lib/schemas.ts
import { z } from 'zod'

export const contactFormSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .toLowerCase()
    .trim(),
  subject: z.string()
    .min(1, 'Subject is required')
    .max(200, 'Subject too long')
    .trim(),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message too long')
    .trim()
    .regex(/^[^<>]*$/, 'Message contains invalid characters'),
  'cf-turnstile-response': z.string(),
  website: z.string().max(0), // Honeypot - must be empty
})

export type ContactFormData = z.infer<typeof contactFormSchema>
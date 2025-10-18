// app/actions/contact.ts
'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { revalidatePath } from 'next/cache'
import DOMPurify from 'isomorphic-dompurify'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  email: z.string().email('Invalid email address').toLowerCase().trim(),
  subject: z.string().min(1, 'Subject required').max(200).trim(),
  message: z.string().min(10, 'Message too short').max(5000).trim(),
  'cf-turnstile-response': z.string(),
  website: z.string().max(0),
})

type FormState = {
  status: 'UNSET' | 'SUCCESS' | 'ERROR'
  message: string
  fieldErrors: Record<string, string[] | undefined>
  timestamp: number
}

async function verifyTurnstile(token: string): Promise<boolean> {
  console.log('Verifying Turnstile token:', token)
  console.log('Using secret key:', process.env.TURNSTILE_SECRET_KEY?.substring(0, 10) + '...')
  
  const fd = new FormData()
  fd.append('secret', process.env.TURNSTILE_SECRET_KEY!)
  fd.append('response', token)

  const res = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    { method: 'POST', body: fd }
  )

  const data = await res.json()
  console.log('Turnstile verification response:', data)
  return data.success === true
}

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // Log what we received for debugging
    const formDataObj = Object.fromEntries(formData)
    console.log('Form data received:', formDataObj)
    console.log('Turnstile token:', formDataObj['cf-turnstile-response'])
    
    // Validate input
    const result = contactSchema.safeParse(formDataObj)

    if (!result.success) {
      console.error('Validation errors:', result.error.flatten())
      console.error('Full validation error:', JSON.stringify(result.error, null, 2))
      return {
        status: 'ERROR',
        message: 'Please check the form for errors',
        fieldErrors: result.error.flatten().fieldErrors,
        timestamp: Date.now(),
      }
    }

    // Honeypot check - if filled, silently accept but don't send
    if (result.data.website) {
      return { status: 'SUCCESS', message: 'Thank you!', fieldErrors: {}, timestamp: Date.now() }
    }

    // Verify Turnstile
    if (!await verifyTurnstile(result.data['cf-turnstile-response'])) {
      return {
        status: 'ERROR',
        message: 'Security verification failed. Please try again.',
        fieldErrors: {},
        timestamp: Date.now(),
      }
    }

    // Sanitize inputs to prevent XSS
    const clean = {
      email: result.data.email,
      subject: DOMPurify.sanitize(result.data.subject, { ALLOWED_TAGS: [] }),
      message: DOMPurify.sanitize(result.data.message, { ALLOWED_TAGS: [] }),
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Mostly Optimal Contact <alex@mostlyoptimal.com>',
      to: process.env.CONTACT_EMAIL || 'alexfiliakov@gmail.com',
      replyTo: clean.email,
      subject: `Contact Form: ${clean.subject}`,
      text: `From: ${clean.email}\n\nSubject: ${clean.subject}\n\n${clean.message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>From:</strong> ${clean.email}</p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${clean.subject}</p>
          </div>
          <div style="padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <p style="white-space: pre-wrap;">${clean.message}</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return {
        status: 'ERROR',
        message: 'Failed to send message. Please try again later.',
        fieldErrors: {},
        timestamp: Date.now(),
      }
    }

    console.log('Email sent successfully:', data)
    revalidatePath('/contact')

    return {
      status: 'SUCCESS',
      message: 'Thank you for your message! I\'ll get back to you soon.',
      fieldErrors: {},
      timestamp: Date.now(),
    }

  } catch (error) {
    console.error('Contact form error:', error)
    return {
      status: 'ERROR',
      message: 'An unexpected error occurred. Please try again.',
      fieldErrors: {},
      timestamp: Date.now(),
    }
  }
}
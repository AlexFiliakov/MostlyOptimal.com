// Cloudflare Pages Function for handling contact form submissions
// This runs on Cloudflare Workers, keeping API keys secure

interface ContactFormData {
  email: string;
  subject: string;
  message: string;
  'cf-turnstile-response': string;
  website?: string;
}

interface TurnstileResponse {
  success: boolean;
  'error-codes'?: string[];
}

async function verifyTurnstile(
  token: string,
  secret: string
): Promise<boolean> {
  const formData = new FormData();
  formData.append('secret', secret);
  formData.append('response', token);

  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body: formData,
    }
  );

  const data: TurnstileResponse = await response.json();
  return data.success === true;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitize(text: string): string {
  // Remove HTML tags and trim
  return text.replace(/<[^>]*>/g, '').trim();
}

export async function onRequestPost(context: any) {
  const { request, env } = context;

  try {
    // Parse form data
    const formData = await request.formData();
    const data: ContactFormData = {
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      'cf-turnstile-response': formData.get('cf-turnstile-response') as string,
      website: formData.get('website') as string,
    };

    // Honeypot check - if website field is filled, it's a bot
    if (data.website) {
      return new Response(
        JSON.stringify({ success: true, message: 'Thank you!' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate required fields
    if (!data.email || !data.subject || !data.message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'All fields are required'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    if (!validateEmail(data.email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid email address'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate message length
    if (data.message.length < 10 || data.message.length > 5000) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Message must be between 10 and 5000 characters'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify Turnstile token
    const turnstileValid = await verifyTurnstile(
      data['cf-turnstile-response'],
      env.TURNSTILE_SECRET_KEY
    );

    if (!turnstileValid) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Security verification failed. Please try again.'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize inputs
    const clean = {
      email: data.email.toLowerCase().trim(),
      subject: sanitize(data.subject),
      message: sanitize(data.message),
    };

    // Send email via Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Mostly Optimal Contact <alex@mostlyoptimal.com>',
        to: env.CONTACT_EMAIL || 'alexfiliakov@gmail.com',
        reply_to: clean.email,
        subject: `Contact Form: ${clean.subject}`,
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
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      console.error('Resend API error:', error);
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Failed to send message. Please try again later.'
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for your message! I\'ll get back to you soon.'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'An unexpected error occurred. Please try again.'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

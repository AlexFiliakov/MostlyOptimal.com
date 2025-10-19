// components/ContactForm.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import Script from 'next/script'
import CustomButton from './CustomButton'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const hasInitializedRef = useRef(false)

  // Manually render Turnstile widget once
  useEffect(() => {
    if (hasInitializedRef.current) {
      return
    }

    const initTurnstile = () => {
      if (
        turnstileRef.current &&
        !widgetIdRef.current &&
        (window as any).turnstile
      ) {
        hasInitializedRef.current = true
        try {
          turnstileRef.current.innerHTML = ''

          widgetIdRef.current = (window as any).turnstile.render(turnstileRef.current, {
            sitekey: '0x4AAAAAAB7WF0b0sbvYerLh',
            theme: 'light',
            size: 'normal',
          })
        } catch (error) {
          console.error('Failed to render Turnstile:', error)
          hasInitializedRef.current = false
        }
      }
    }

    // Wait for Turnstile script to load
    if ((window as any).turnstile) {
      initTurnstile()
    } else {
      const checkInterval = setInterval(() => {
        if ((window as any).turnstile) {
          clearInterval(checkInterval)
          initTurnstile()
        }
      }, 100)

      return () => clearInterval(checkInterval)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)

      // Submit to Cloudflare Pages Function
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      })

      // Check if response is JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        // Not JSON - probably running locally without Wrangler
        throw new Error(
          'Contact form API not available. ' +
          'If running locally, use: npm run build && wrangler pages dev out'
        )
      }

      const result = await response.json()

      if (result.success) {
        toast.success(result.message)
        formRef.current?.reset()

        // Reset Turnstile widget
        if (widgetIdRef.current && (window as any).turnstile) {
          try {
            (window as any).turnstile.reset(widgetIdRef.current)
          } catch (error) {
            console.error('Failed to reset Turnstile:', error)
          }
        }
      } else {
        toast.error(result.message || 'Failed to send message')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      const errorMessage = error instanceof Error
        ? error.message
        : 'An unexpected error occurred. Please try again.'
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
      />
      <Toaster position="top-center" />

      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl mx-auto">
        <div>
          <label htmlFor="email" className="block text-lg font-semibold text-deep-forest/80 mb-2">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-lg font-semibold text-deep-forest/80 mb-2">
            Subject *
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            placeholder="Briefly describe your inquiry"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-lg font-semibold text-deep-forest/80 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="What would you like to discuss?"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
          />
        </div>

        {/* Honeypot - hidden from users, catches bots */}
        <input
          name="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
          aria-hidden="true"
        />

        {/* Cloudflare Turnstile */}
        <div ref={turnstileRef} />

        <div className="flex justify-center md:justify-start">
          <CustomButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </CustomButton>
        </div>
      </form>
    </>
  )
}

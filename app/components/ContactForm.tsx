// components/ContactForm.tsx
'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import Script from 'next/script'
import { submitContactForm } from '@/app/actions/contact'
import styled from 'styled-components'

const StyledButtonWrapper = styled.div`
  .primary-button {
   font-family: 'Ropa Sans', sans-serif;
   color: white;
   cursor: pointer;
   font-size: 16px;
   font-weight: bold;
   letter-spacing: 0.05rem;
   border: 1px solid #2A4D3A;
   padding: 0.8rem 2.1rem;
   background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 531.28 200'%3E%3Cdefs%3E%3Cstyle%3E .shape %7B fill: %23D4AF37 /* fill: %232A4D3A; */ %7D %3C/style%3E%3C/defs%3E%3Cg id='Layer_2' data-name='Layer 2'%3E%3Cg id='Layer_1-2' data-name='Layer 1'%3E%3Cpolygon class='shape' points='415.81 200 0 200 115.47 0 531.28 0 415.81 200' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
   background-color: #2A4D3A;
   background-size: 200%;
   background-position: 200%;
   background-repeat: no-repeat;
   transition: 0.3s ease-in-out;
   transition-property: background-position, border, color;
   position: relative;
   z-index: 1;
  }

  .primary-button:hover {
   border: 1px solid #D4AF37;
   color: white;
   background-position: 40%;
  }

  .primary-button:before {
   content: "";
   position: absolute;
   background-color: #2A4D3A;
   width: 0.2rem;
   height: 0.2rem;
   top: -1px;
   left: -1px;
   transition: background-color 0.15s ease-in-out;
  }

  .primary-button:hover:before {
   background-color: white;
  }

  .primary-button:hover:after {
   background-color: white;
  }

  .primary-button:after {
   content: "";
   position: absolute;
   background-color: #D4AF37;
   width: 0.3rem;
   height: 0.3rem;
   bottom: -1px;
   right: -1px;
   transition: background-color 0.15s ease-in-out;
  }

  .button-borders {
   position: relative;
   width: fit-content;
   height: fit-content;
  }

  .button-borders:before {
   content: "";
   position: absolute;
   width: calc(100% + 0.5em);
   height: 50%;
   left: -0.3em;
   top: -0.3em;
   border: 1px solid #2A4D3A;
   border-bottom: 0px;
  }

  .button-borders:after {
   content: "";
   position: absolute;
   width: calc(100% + 0.5em);
   height: 50%;
   left: -0.3em;
   bottom: -0.3em;
   border: 1px solid #2A4D3A;
   border-top: 0px;
   z-index: 0;
  }

  .shape {
   fill: #2A4D3A;
  }
  
  .primary-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus()
  
  return (
    <StyledButtonWrapper>
      <div className="button-borders">
        <button 
          type="submit" 
          disabled={pending || disabled}
          className="primary-button"
        >
          {pending ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </StyledButtonWrapper>
  )
}

export default function ContactForm() {
  const [formState, action] = useActionState(submitContactForm, {
    status: 'UNSET',
    message: '',
    fieldErrors: {},
    timestamp: Date.now(),
  })
  
  const formRef = useRef<HTMLFormElement>(null)
  const prevTimestamp = useRef(formState.timestamp)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const isRenderingRef = useRef(false)
  const hasInitializedRef = useRef(false)
  
  // Manually render Turnstile widget once
  useEffect(() => {
    if (hasInitializedRef.current) {
      console.log('Turnstile already initialized, skipping...')
      return
    }
    
    const initTurnstile = () => {
      if (
        turnstileRef.current && 
        !widgetIdRef.current && 
        !isRenderingRef.current &&
        (window as any).turnstile
      ) {
        isRenderingRef.current = true
        hasInitializedRef.current = true
        try {
          console.log('Rendering Turnstile widget...')
          // Clear any existing content
          turnstileRef.current.innerHTML = ''
          
          widgetIdRef.current = (window as any).turnstile.render(turnstileRef.current, {
            sitekey: '0x4AAAAAAB7WF0b0sbvYerLh',
            theme: 'light',
            size: 'normal',
          })
          console.log('Turnstile widget rendered with ID:', widgetIdRef.current)
        } catch (error) {
          console.error('Failed to render Turnstile:', error)
          isRenderingRef.current = false
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
  
  // Toast notifications
  useEffect(() => {
    if (formState.timestamp !== prevTimestamp.current && formState.message) {
      if (formState.status === 'ERROR') {
        toast.error(formState.message)
      } else if (formState.status === 'SUCCESS') {
        toast.success(formState.message)
      }
      prevTimestamp.current = formState.timestamp
    }
  }, [formState])
  
  // Form reset on success
  useEffect(() => {
    if (
      formRef.current &&
      formState.status === 'SUCCESS' &&
      formState.timestamp !== prevTimestamp.current
    ) {
      formRef.current.reset()
      // Reset Turnstile widget
      if (widgetIdRef.current && (window as any).turnstile) {
        try {
          (window as any).turnstile.reset(widgetIdRef.current)
          console.log('Turnstile widget reset')
        } catch (error) {
          console.error('Failed to reset Turnstile:', error)
        }
      }
      prevTimestamp.current = formState.timestamp
    }
  }, [formState.status, formState.timestamp])
  
  return (
    <>
      <Script 
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" 
        strategy="afterInteractive"
      />
      <Toaster position="top-center" />
      
      <form ref={formRef} action={action} className="flex flex-col gap-6 max-w-2xl mx-auto">
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
          {formState.fieldErrors?.email && (
            <span className="text-red-500 text-sm mt-1 block">
              {formState.fieldErrors.email[0]}
            </span>
          )}
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
          {formState.fieldErrors?.subject && (
            <span className="text-red-500 text-sm mt-1 block">
              {formState.fieldErrors.subject[0]}
            </span>
          )}
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
          {formState.fieldErrors?.message && (
            <span className="text-red-500 text-sm mt-1 block">
              {formState.fieldErrors.message[0]}
            </span>
          )}
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
        
        {/* Cloudflare Turnstile - Invisible Captcha */}
        <div ref={turnstileRef} />
        
        <div className="flex justify-center md:justify-start">
          <SubmitButton />
        </div>
      </form>
    </>
  )
}
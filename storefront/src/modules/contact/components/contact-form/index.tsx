"use client"

import { useFormState, useFormStatus } from "react-dom"
import { Button, Input, Textarea } from "@medusajs/ui"

import { sendContactMessage } from "@lib/data/contact"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" isLoading={pending} className="w-full">
      Send message
    </Button>
  )
}

const ContactForm = () => {
  const [state, formAction] = useFormState(sendContactMessage, null)

  return (
    <form action={formAction} className="flex flex-col gap-y-4 max-w-xl">
      <Input name="name" placeholder="Your name" autoComplete="name" />
      <Input
        name="email"
        type="email"
        placeholder="Your email"
        autoComplete="email"
        required
      />
      <Textarea name="message" placeholder="Your message" rows={6} required />

      {/* Honeypot: hidden from humans, filled by bots */}
      <input
        type="text"
        name="honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", opacity: 0 }}
      />

      <SubmitButton />

      {state?.message && (
        <p
          className={
            state.success
              ? "text-sm text-green-600"
              : "text-sm text-rose-500"
          }
        >
          {state.message}
        </p>
      )}
    </form>
  )
}

export default ContactForm

"use server"

import { getCurrentStore } from "@lib/config"

export async function sendContactMessage(
  _currentState: unknown,
  formData: FormData
) {
  const name = (formData.get("name") as string) || ""
  const email = (formData.get("email") as string) || ""
  const message = (formData.get("message") as string) || ""
  const honeypot = (formData.get("honeypot") as string) || ""

  if (honeypot) {
    return { success: true, message: "Thanks — your message has been sent." }
  }

  if (!email || !message) {
    return { success: false, message: "Please enter your email and a message." }
  }

  const store = await getCurrentStore()
  const backendUrl =
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

  try {
    const res = await fetch(`${backendUrl}/store/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": store.publishableKey,
      },
      body: JSON.stringify({
        name,
        email,
        message,
        store: store.name,
      }),
    })

    if (!res.ok) {
      return {
        success: false,
        message: "Sorry, we couldn't send your message. Please try again.",
      }
    }

    return { success: true, message: "Thanks — your message has been sent." }
  } catch (e) {
    return {
      success: false,
      message: "Sorry, we couldn't send your message. Please try again.",
    }
  }
}

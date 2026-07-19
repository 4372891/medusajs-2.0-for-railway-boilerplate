import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"
import { INotificationModuleService } from "@medusajs/framework/types"
import { EmailTemplates } from "../../../modules/email-notifications/templates"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const body = (req.body ?? {}) as Record<string, any>
  const { name, email, message, store, honeypot } = body

  if (honeypot) {
    res.status(200).json({ success: true })
    return
  }

  if (!email || !message) {
    res.status(400).json({ error: "Email and message are required." })
    return
  }

  const recipient = process.env.CONTACT_FORM_RECIPIENT
  if (!recipient) {
    res.status(500).json({ error: "Contact form is not configured." })
    return
  }

  const notificationModuleService: INotificationModuleService =
    req.scope.resolve(Modules.NOTIFICATION)

  const storeLabel = store || "Unknown store"

  try {
    await notificationModuleService.createNotifications({
      to: recipient,
      channel: "email",
      template: EmailTemplates.CONTACT_RECEIVED,
      data: {
        storeLabel,
        name: name || "",
        email,
        message,
        emailOptions: {
          subject: `New contact message from ${storeLabel}`,
          replyTo: email,
        },
        preview: `New message from ${storeLabel}`,
      },
    })

    res.status(200).json({ success: true })
  } catch (error) {
    console.error("Contact form send error:", error)
    res.status(500).json({ error: "Could not send message." })
  }
}

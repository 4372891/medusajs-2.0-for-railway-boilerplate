import { Modules } from '@medusajs/framework/utils'
import { INotificationModuleService, IOrderModuleService, ISalesChannelModuleService } from '@medusajs/framework/types'
import { SubscriberArgs, SubscriberConfig } from '@medusajs/medusa'
import { EmailTemplates } from '../modules/email-notifications/templates'

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<any>) {
  const notificationModuleService: INotificationModuleService = container.resolve(Modules.NOTIFICATION)
  const orderModuleService: IOrderModuleService = container.resolve(Modules.ORDER)

  const order = await orderModuleService.retrieveOrder(data.id, { relations: ['items', 'summary', 'shipping_address'] })
  const shippingAddress = await (orderModuleService as any).orderAddressService_.retrieve(order.shipping_address.id)

  // Try to get the store (sales channel) name for a per-store "from" name.
  let fromName: string | null = null
  try {
    if (order.sales_channel_id) {
      const salesChannelService: ISalesChannelModuleService = container.resolve(Modules.SALES_CHANNEL)
      const channel = await salesChannelService.retrieveSalesChannel(order.sales_channel_id)
      fromName = channel?.name ?? null
    }
  } catch (e) {
    // if lookup fails, fall back to the default sender
    fromName = null
  }

  // Resend accepts "Name <email>" in the from field. Build it if we have both.
  const fromEmail = process.env.RESEND_FROM_EMAIL
  const from =
    fromName && fromEmail ? `${fromName} <${fromEmail}>` : undefined

  try {
    await notificationModuleService.createNotifications({
      to: order.email,
      channel: 'email',
      template: EmailTemplates.ORDER_PLACED,
      from, // per-store sender name; falls back to config when undefined
      data: {
        emailOptions: {
          replyTo: process.env.EMAIL_REPLY_TO || 'hello@piesend.com',
          subject: 'Your order has been placed'
        },
        order,
        shippingAddress,
        preview: 'Thank you for your order!'
      }
    })
  } catch (error) {
    console.error('Error sending order confirmation notification:', error)
  }
}

export const config: SubscriberConfig = {
  event: 'order.placed'
}

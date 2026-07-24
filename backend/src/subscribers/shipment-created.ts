import { Modules } from '@medusajs/framework/utils'
import { INotificationModuleService } from '@medusajs/framework/types'
import { SubscriberArgs, SubscriberConfig } from '@medusajs/medusa'
import { EmailTemplates } from '../modules/email-notifications/templates'

export default async function shipmentCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string; no_notification?: boolean }>) {
  // `data.id` is the fulfillment (shipment) id and `no_notification` reflects the
  // "Send notification" toggle in the admin. Respect it so we only email when asked.
  if (data.no_notification) {
    return
  }

  const notificationModuleService: INotificationModuleService = container.resolve(Modules.NOTIFICATION)
  const query = container.resolve('query')

  // Resolve the order that owns this fulfillment, along with everything the
  // shipping-confirmation email needs.
  const { data: orders } = await query.graph({
    entity: 'order',
    fields: [
      'id',
      'display_id',
      'email',
      'currency_code',
      'created_at',
      'sales_channel_id',
      'shipping_address.*',
      'fulfillments.id',
      'fulfillments.labels.tracking_number',
      'fulfillments.labels.tracking_url',
    ],
    filters: { fulfillments: { id: data.id } },
  })

  const order = orders?.[0]
  if (!order) {
    console.error(`SHIPMENT-CREATED: could not find order for fulfillment ${data.id}`)
    return
  }

  if (!order.email) {
    console.error(`SHIPMENT-CREATED: order ${order.id} has no email, skipping notification`)
    return
  }

  const fulfillment = (order.fulfillments ?? []).find((f: any) => f.id === data.id)
  const trackingLinks = (fulfillment?.labels ?? []).map((label: any) => ({
    tracking_number: label.tracking_number,
    tracking_url: label.tracking_url,
  }))

  // Look up the store (sales channel) name so the email is sent from the store's name.
  let fromName: string | null = null
  try {
    const { data: channels } = await query.graph({
      entity: 'sales_channel',
      fields: ['name'],
      filters: { id: (order as any).sales_channel_id },
    })
    fromName = channels?.[0]?.name ?? null
  } catch (e) {
    fromName = null
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL
  const from = fromName && fromEmail ? `${fromName} <${fromEmail}>` : undefined

  try {
    await notificationModuleService.createNotifications({
      to: order.email,
      channel: 'email',
      template: EmailTemplates.ORDER_SHIPPED,
      from,
      data: {
        emailOptions: {
          subject: `Your order #${order.display_id} has shipped`
        },
        order,
        shippingAddress: order.shipping_address,
        trackingLinks,
        preview: 'Your order is on its way!'
      }
    })
  } catch (error) {
    console.error('Error sending shipment notification:', error)
  }
}

export const config: SubscriberConfig = {
  event: 'shipment.created'
}

import { Text, Section, Hr } from '@react-email/components'
import * as React from 'react'
import { Base } from './base'
import { OrderDTO, OrderAddressDTO } from '@medusajs/framework/types'

export const ORDER_SHIPPED = 'order-shipped'

interface OrderShippedTrackingLink {
  tracking_number?: string | null
  tracking_url?: string | null
}

interface OrderShippedPreviewProps {
  order: OrderDTO & { display_id: string }
  shippingAddress: OrderAddressDTO
  trackingLinks: OrderShippedTrackingLink[]
}

export interface OrderShippedTemplateProps {
  order: OrderDTO & { display_id: string }
  shippingAddress: OrderAddressDTO
  trackingLinks?: OrderShippedTrackingLink[]
  preview?: string
}

export const isOrderShippedTemplateData = (data: any): data is OrderShippedTemplateProps =>
  typeof data.order === 'object' && typeof data.shippingAddress === 'object'

export const OrderShippedTemplate: React.FC<OrderShippedTemplateProps> & {
  PreviewProps: OrderShippedPreviewProps
} = ({ order, shippingAddress, trackingLinks = [], preview = 'Your order is on its way!' }) => {
  const validTrackingLinks = trackingLinks.filter((link) => link?.tracking_number)

  return (
    <Base preview={preview}>
      <Section>
        <Text style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', margin: '0 0 30px' }}>
          Your Order Has Shipped
        </Text>

        <Text style={{ margin: '0 0 15px' }}>
          Dear {shippingAddress.first_name} {shippingAddress.last_name},
        </Text>

        <Text style={{ margin: '0 0 30px' }}>
          Good news! Your order #{order.display_id} is on its way. Here are the details:
        </Text>

        {validTrackingLinks.length > 0 && (
          <>
            <Text style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 10px' }}>
              Tracking Information
            </Text>
            {validTrackingLinks.map((link, index) => (
              <Text key={index} style={{ margin: '0 0 5px' }}>
                Tracking number: {link.tracking_url ? (
                  <a href={link.tracking_url} style={{ color: '#2563eb' }}>
                    {link.tracking_number}
                  </a>
                ) : (
                  link.tracking_number
                )}
              </Text>
            ))}
            <Hr style={{ margin: '20px 0' }} />
          </>
        )}

        <Text style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 10px' }}>
          Shipping Address
        </Text>
        <Text style={{ margin: '0 0 5px' }}>
          {shippingAddress.address_1}
        </Text>
        <Text style={{ margin: '0 0 5px' }}>
          {shippingAddress.city}, {shippingAddress.province} {shippingAddress.postal_code}
        </Text>
        <Text style={{ margin: '0 0 20px' }}>
          {shippingAddress.country_code}
        </Text>

        <Hr style={{ margin: '20px 0' }} />

        <Text style={{ margin: '0 0 5px' }}>
          Thank you for shopping with us!
        </Text>
      </Section>
    </Base>
  )
}

OrderShippedTemplate.PreviewProps = {
  order: {
    id: 'test-order-id',
    display_id: 'ORD-123',
    email: 'test@example.com',
    currency_code: 'USD'
  },
  shippingAddress: {
    first_name: 'Test',
    last_name: 'User',
    address_1: '123 Main St',
    city: 'Anytown',
    province: 'CA',
    postal_code: '12345',
    country_code: 'US'
  },
  trackingLinks: [
    { tracking_number: '1Z999AA10123456784', tracking_url: 'https://example.com/track/1Z999AA10123456784' }
  ]
} as OrderShippedPreviewProps

export default OrderShippedTemplate

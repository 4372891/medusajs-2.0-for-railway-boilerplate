import { Text } from '@react-email/components'
import * as React from 'react'
import { Base } from './base'

export const CONTACT_RECEIVED = 'contact-received'

export interface ContactReceivedData {
  storeLabel: string
  name: string
  email: string
  message: string
  preview?: string
}

export const isContactReceivedData = (data: any): data is ContactReceivedData =>
  typeof data.storeLabel === 'string' &&
  typeof data.email === 'string' &&
  typeof data.message === 'string'

export const ContactReceivedTemplate: React.FC<ContactReceivedData> = ({
  storeLabel,
  name,
  email,
  message,
  preview = 'New contact message',
}) => (
  <Base preview={preview}>
    <Text>Store: {storeLabel}</Text>
    <Text>From: {name || '(no name)'} &lt;{email}&gt;</Text>
    <Text style={{ whiteSpace: 'pre-line' }}>{message}</Text>
  </Base>
)

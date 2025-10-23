import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat('en-US').format(num)
}

export function generateWhatsAppLink(phoneNumber: string, message: string) {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
}

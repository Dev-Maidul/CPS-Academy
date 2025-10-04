import { notFound } from 'next/navigation'

export default function NotFoundCatchAll() {
  notFound()
}

export async function generateMetadata() {
  return {
    title: 'Page Not Found - CPS Academy',
  }
}
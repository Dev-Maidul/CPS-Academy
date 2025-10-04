// Import global styles and fonts
import './globals.css'
import { Inter } from 'next/font/google'
 import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })
 
export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}
 
export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <h1>404 - Page Not Found</h1>
        {/* <p>Back To CPS HOme.</p> */}
        <Link href="/">Return Home</Link>
      </body>
    </html>
  )
}
import AppLayout from './AppLayout'
import { Inter } from 'next/font/google'
import './globals.scss'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://media.tenor.com" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous" />
      </head>
      <body className={inter.className}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  )
}

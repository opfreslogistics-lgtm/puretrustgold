import type { Metadata } from 'next'
import './globals.css'
import { Navbar, Footer, GoldTicker } from '@/components/Layout'
import ChatWidget from '@/components/ChatWidget'

export const metadata: Metadata = {
  title: 'PureTrust Gold | Sell Gold & Diamonds with Confidence',
  description: 'The world\'s premier buyer of luxury assets. Professional assay, private appointments, and instant same-day payment.',
  icons: {
    icon: 'https://bznwydxnqyumngwscbfy.supabase.co/storage/v1/object/public/My%20Images/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-black text-white font-sans selection:bg-gold selection:text-black">
        <Navbar />
        <GoldTicker />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  )
}


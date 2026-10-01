import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "Auto Vault Luxury Cars",
  description: "Authentic showroom and transparent PNG car inventory with Stripe checkout.",
  openGraph: {
    title: "Auto Vault Luxury Cars",
    description: "Authentic showroom and transparent PNG car inventory with Stripe checkout.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen flex flex-col antialiased selection:bg-red-600 selection:text-white">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

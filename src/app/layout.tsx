import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { PlatformSettingsProvider } from "@/context/PlatformSettingsContext"

export const metadata: Metadata = {
  title: "Auto Vault Luxury Cars",
  description: "Authentic showroom and backgroundless car inventory for luxury vehicle sales and daily exotic rentals.",
  openGraph: {
    title: "Auto Vault Luxury Cars",
    description: "Authentic showroom and backgroundless car inventory for luxury vehicle sales and daily exotic rentals.",
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
        <PlatformSettingsProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </PlatformSettingsProvider>
      </body>
    </html>
  )
}

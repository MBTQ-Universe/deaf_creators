import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { PlatformProvider } from "@/components/platform-provider"
import "./globals.css"

export const metadata = {
  title: "DeafCreator | Platform for Deaf Influencers",
  description: "The complete platform for deaf content creators and influencers",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <PlatformProvider>
            {children}
            <Toaster />
          </PlatformProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

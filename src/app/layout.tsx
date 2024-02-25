"use client"
import './globals.css'
import {GlobalProvider} from "@/context/Global"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
      <GlobalProvider>
{children}
</GlobalProvider></body>
    </html>
  )
}

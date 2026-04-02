import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Cart from "@/components/Cart" // 1. Importa el Carrito

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Jimmweb | Tienda Personalizada", // Un toque más pro
  description: "Poleras y agendas personalizadas en Concepción",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-black text-white"> 
        {/* Cambié bg-white a bg-black para que combine con la estética ruda 
           que estamos armando en Jimmweb.
        */}
        
        {/* NAVBAR */}
        <Navbar />

        {/* 2. EL CARRITO: Ahora sí está presente para escuchar el click */}
        <Cart />

        {/* CONTENIDO */}
        <main className="flex-1 pt-24"> {/* pt-24 para que el navbar fixed no tape el contenido */}
          {children}
        </main>

      </body>
    </html>
  )
}
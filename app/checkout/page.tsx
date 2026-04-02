import CheckoutForm from "@/components/CheckoutForm"
import Marquee from "@/components/Marquee"

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-16">
          <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none mb-4">
            CHECK<span className="text-red-600">OUT</span>
          </h1>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
            <span>Verificación de Seguridad</span>
            <span className="h-px w-20 bg-white/10"></span>
            <span>Terminal 001</span>
          </div>
        </header>

        <CheckoutForm />
      </div>
      
      <div className="fixed bottom-0 left-0 w-full z-50">
        <Marquee />
      </div>
    </main>
  )
}
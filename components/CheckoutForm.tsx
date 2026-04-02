"use client"

import { useState } from "react"
import { useCart } from "@/store/cart"
import { supabase } from "@/lib/supabaseClient"
import { motion } from "framer-motion"

export default function CheckoutForm() {
  const { items, clearCart, getTotal } = useCart()
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)

  // El total se calcula una sola vez por render para evitar inconsistencias
  const montoTotal = getTotal()

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "Concepción",
    region: "Bio Bio"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (items.length === 0) {
      alert("TU ARSENAL ESTÁ VACÍO")
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase
        .from("pedidos")
        .insert([{
          nombre_cliente: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          direccion: formData.direccion,
          ciudad: formData.ciudad,
          region: formData.region,
          total: montoTotal, // Usamos la constante numérica
          items: items // Supabase guardará esto como JSONB
        }])
        .select()

      if (error) throw error

      if (data) {
        setOrderId(data[0].id)
        clearCart()
      }
    } catch (error: any) {
      alert("FALLO EN EL SISTEMA: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (orderId) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center py-20 border-2 border-green-500/30 bg-green-500/5 backdrop-blur-md rounded-2xl"
      >
        <div className="mb-6 flex justify-center">
          <div className="h-20 w-20 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.4)]">
            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 className="text-5xl font-black uppercase italic mb-4 text-green-500 tracking-tighter">Orden Confirmada</h2>
        <div className="bg-black/50 py-3 px-6 rounded-full inline-block mb-8 border border-white/10">
          <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">
            ID RASTREO: <span className="text-white">{orderId.slice(0, 8).toUpperCase()}</span>
          </p>
        </div>
        <p className="max-w-sm mx-auto text-sm uppercase font-bold tracking-widest text-gray-300 leading-relaxed">
          Operación exitosa. Revisa tu email para las instrucciones de despacho y logística.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* SECCIÓN DATOS (COL 7) */}
      <div className="lg:col-span-7 space-y-10">
        <div className="border-l-4 border-red-600 pl-6">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter">Información de Destino</h2>
          <p className="text-[11px] text-gray-500 uppercase font-black tracking-[0.3em] mt-1">Terminal 001 / Datos de Despacho</p>
        </div>

        <div className="grid gap-6">
          <div className="group">
            <label className="text-[10px] font-black uppercase text-gray-500 mb-2 block tracking-widest group-focus-within:text-red-500 transition-colors">Nombre Completo</label>
            <input 
              required
              placeholder="EJ: BASTIAN JIMM"
              className="w-full bg-white/5 border border-white/10 p-5 text-sm font-bold uppercase italic focus:border-red-600 outline-none transition-all focus:bg-white/10"
              onChange={(e) => setFormData({...formData, nombre: e.target.value.toUpperCase()})}
            />
          </div>

          <div className="group">
            <label className="text-[10px] font-black uppercase text-gray-500 mb-2 block tracking-widest group-focus-within:text-red-500 transition-colors">Email de Contacto</label>
            <input 
              required
              type="email"
              placeholder="TU@EMAIL.COM"
              className="w-full bg-white/5 border border-white/10 p-5 text-sm font-bold focus:border-red-600 outline-none transition-all focus:bg-white/10"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="text-[10px] font-black uppercase text-gray-500 mb-2 block tracking-widest group-focus-within:text-red-500 transition-colors">Teléfono</label>
              <input 
                required
                placeholder="+56 9 ..."
                className="w-full bg-white/5 border border-white/10 p-5 text-sm font-bold focus:border-red-600 outline-none transition-all focus:bg-white/10"
                onChange={(e) => setFormData({...formData, telefono: e.target.value})}
              />
            </div>
            <div className="group opacity-60">
              <label className="text-[10px] font-black uppercase text-gray-500 mb-2 block tracking-widest">Región (Chile)</label>
              <input 
                value={formData.region}
                className="w-full bg-transparent border border-white/5 p-5 text-sm font-black uppercase text-gray-400 cursor-not-allowed"
                readOnly
              />
            </div>
          </div>

          <div className="group">
            <label className="text-[10px] font-black uppercase text-gray-500 mb-2 block tracking-widest group-focus-within:text-red-500 transition-colors">Dirección de Despacho</label>
            <input 
              required
              placeholder="CALLE, NÚMERO, DPTO / CASA"
              className="w-full bg-white/5 border border-white/10 p-5 text-sm font-bold uppercase focus:border-red-600 outline-none transition-all focus:bg-white/10"
              onChange={(e) => setFormData({...formData, direccion: e.target.value.toUpperCase()})}
            />
          </div>
        </div>
      </div>

      {/* SECCIÓN RESUMEN (COL 5) */}
      <div className="lg:col-span-5">
        <div className="bg-[#0f0f0f] border border-white/10 p-8 rounded-xl sticky top-24 shadow-2xl">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8 border-b border-white/10 pb-6 text-center text-red-500 italic">Resumen del Arsenal</h3>
          
          <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {items.map((item) => (
              <div key={`${item.id}-${item.talla}`} className="flex justify-between items-center group">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded overflow-hidden">
                    <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase italic group-hover:text-red-500 transition-colors">{item.nombre}</p>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">Talla: {item.talla} | Cant: {item.cantidad}</p>
                  </div>
                </div>
                <p className="text-xs font-mono font-bold">${(item.precio * item.cantidad).toLocaleString('es-CL')}</p>
              </div>
            ))}
          </div>

          <div className="border-t-2 border-dashed border-white/10 pt-6 space-y-3">
            <div className="flex justify-between text-gray-500 text-[10px] font-black uppercase tracking-widest">
              <span>Subtotal</span>
              <span>${montoTotal.toLocaleString('es-CL')}</span>
            </div>
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
              <span className="text-gray-500">Logística de Envío</span>
              <span className="text-green-500">GRATIS</span>
            </div>
            <div className="flex justify-between items-end pt-4">
              <span className="text-xs font-black uppercase text-red-500 italic">Monto Final</span>
              <span className="text-4xl font-black italic tracking-tighter text-white">
                ${montoTotal.toLocaleString('es-CL')}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || items.length === 0}
            className={`w-full py-6 mt-10 font-black uppercase italic text-2xl tracking-tighter transition-all duration-500 relative overflow-hidden group
              ${loading ? 'bg-gray-800 text-gray-500' : 'bg-white text-black hover:bg-red-600 hover:text-white shadow-[0_10px_30px_-10px_rgba(255,255,255,0.3)]'}
            `}
          >
            <span className="relative z-10">{loading ? "SINCRONIZANDO..." : "SOLTAR EL PAGO"}</span>
            {!loading && <div className="absolute inset-0 bg-red-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />}
          </button>

          <div className="mt-8 flex justify-center items-center gap-6 opacity-20 grayscale hover:opacity-50 transition-opacity">
            <div className="h-4 w-12 bg-white/20 rounded"></div>
            <div className="h-4 w-12 bg-white/20 rounded"></div>
            <div className="h-4 w-12 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>
    </form>
  )
}
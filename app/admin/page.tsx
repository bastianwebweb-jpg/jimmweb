"use client"

import { useEffect, useState, useRef } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

type Product = {
  id?: string
  nombre: string
  precio: number
  categoria: string
  descripcion: string
  stock: number
  imagen?: string
}

const estadoInicial = {
  nombre: "",
  precio: 0,
  categoria: "",
  descripcion: "",
  stock: 0,
  imagen: "",
}

export default function AdminPage() {
  const [view, setView] = useState<'inventory' | 'orders'>('inventory')
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<Product>(estadoInicial)
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false) // Estado de seguridad
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // 1. VERIFICACIÓN DE SEGURIDAD (Capa Extra)
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      // Reemplaza con tu email real de admin
      if (!user || user.email !== 'bastianwebweb@gmail.com') {
        router.push('/')
      } else {
        setIsAdmin(true)
        fetchProducts()
        fetchOrders()
      }
    }
    checkUser()
  }, [router])

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("productos").select("*").order('created_at', { ascending: false })
    if (error) console.error("ERROR FETCH:", error)
    setProducts(data || [])
  }

  const fetchOrders = async () => {
    const { data, error } = await supabase.from("pedidos").select("*").order('created_at', { ascending: false })
    if (error) console.error("ERROR FETCH ORDERS:", error)
    setOrders(data || [])
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploading(true)
    try {
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.\-]/g, "")
      const fileName = `${Date.now()}-${cleanFileName}`
      const { error: uploadError } = await supabase.storage.from("productos").upload(fileName, file)
      if (uploadError) throw uploadError
      const { data: urlData } = supabase.storage.from("productos").getPublicUrl(fileName)
      setForm((prev) => ({ ...prev, imagen: urlData.publicUrl }))
    } catch (error: any) {
      alert("Error subiendo imagen: " + error.message)
    } finally { setIsUploading(false) }
  }

  const handleSubmit = async () => {
    if (!form.nombre || !form.precio) return alert("Nombre y Precio obligatorios")
    setIsSubmitting(true)
    try {
      const { error } = editingId 
        ? await supabase.from("productos").update(form).eq("id", editingId)
        : await supabase.from("productos").insert([form])
      if (error) throw error
      setForm(estadoInicial)
      setEditingId(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
      fetchProducts()
    } catch (error: any) {
      alert("Error: " + error.message)
    } finally { setIsSubmitting(false) }
  }

  const deleteProduct = async (id: string) => {
    if (!window.confirm("¿ELIMINAR PRODUCTO DEL ARSENAL?")) return
    const { error } = await supabase.from("productos").delete().eq("id", id)
    if (error) alert("Error: " + error.message)
    fetchProducts()
  }

  const startEdit = (p: Product) => {
    setForm({ ...p })
    setEditingId(p.id || null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Si no es admin, no renderizamos nada (previene parpadeo de contenido)
  if (!isAdmin) return <div className="min-h-screen bg-black" />

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans p-6 md:p-12">
      {/* HEADER TÉCNICO */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
        <div>
          <h1 className="text-6xl font-black uppercase italic tracking-tighter leading-none">
            CENTRO DE <span className="text-red-600">MANDO</span>
          </h1>
          <p className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase mt-4">
            Gestión de Operaciones / JIMMWEB Terminal v1.1
          </p>
        </div>
        <div className="flex gap-8">
          <div className="text-right">
            <p className="text-[9px] font-black text-gray-600 uppercase">Artículos en Arsenal</p>
            <p className="text-3xl font-black italic">{products.length}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-black text-gray-600 uppercase">Valor Stock</p>
            <p className="text-3xl font-black italic text-red-600">
              ${products.reduce((acc, p) => acc + (p.precio * p.stock), 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* SELECTOR DE VISTA */}
      <div className="max-w-7xl mx-auto mb-12 flex gap-4">
        <button 
          onClick={() => setView('inventory')}
          className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${view === 'inventory' ? 'bg-white text-black border-white' : 'border-white/10 text-gray-500 hover:text-white'}`}
        >
          [ 01. GESTIÓN_STOCK ]
        </button>
        <button 
          onClick={() => setView('orders')}
          className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${view === 'orders' ? 'bg-red-600 text-white border-red-600' : 'border-white/10 text-gray-500 hover:text-white'}`}
        >
          [ 02. RADAR_PEDIDOS ]
        </button>
      </div>

      {view === 'inventory' ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* FORMULARIO LADO IZQUIERDO */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-12 border border-white/10 bg-[#0a0a0a] p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                <h2 className="text-xs font-black uppercase tracking-widest text-white">
                  {editingId ? "[ EDITANDO_DROP ]" : "[ NUEVO_INGRESO ]"}
                </h2>
              </div>
              <div className="space-y-4">
                <input
                  placeholder="NOMBRE DEL PRODUCTO"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full bg-black border border-white/10 p-4 text-sm font-bold uppercase italic focus:border-red-600 outline-none"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="PRECIO (CLP)"
                    value={form.precio || ""}
                    onChange={(e) => setForm({ ...form, precio: Number(e.target.value) })}
                    className="w-full bg-black border border-white/10 p-4 text-sm font-bold focus:border-red-600 outline-none"
                  />
                  <input
                    type="number"
                    placeholder="STOCK"
                    value={form.stock || ""}
                    onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                    className="w-full bg-black border border-white/10 p-4 text-sm font-bold focus:border-red-600 outline-none"
                  />
                </div>
                <input
                  placeholder="CATEGORÍA"
                  value={form.categoria}
                  onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                  className="w-full bg-black border border-white/10 p-4 text-sm font-bold uppercase focus:border-red-600 outline-none"
                />
                <textarea
                  placeholder="DESCRIPCIÓN TÉCNICA"
                  value={form.descripcion}
                  onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                  className="w-full bg-black border border-white/10 p-4 text-xs font-medium min-h-[100px] focus:border-red-600 outline-none"
                />
                <div className="relative border-2 border-dashed border-white/10 p-8 text-center group hover:border-red-600/50 transition-colors">
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  {form.imagen ? (
                    <img src={form.imagen} className="h-24 mx-auto mb-2 rounded shadow-lg" alt="Preview" />
                  ) : (
                    <p className="text-[10px] uppercase text-gray-500 font-black tracking-widest">Cargar Imagen</p>
                  )}
                  {isUploading && <p className="text-[9px] text-red-500 animate-pulse mt-2">SUBIENDO ARCHIVO...</p>}
                </div>
                <button 
                  onClick={handleSubmit} 
                  disabled={isUploading || isSubmitting} 
                  className="w-full bg-red-600 py-6 font-black uppercase italic text-xl hover:bg-white hover:text-black transition-all shadow-[0_10px_30px_-10px_rgba(220,38,38,0.5)] active:translate-y-1 disabled:bg-zinc-800"
                >
                  {isSubmitting ? "Sincronizando..." : editingId ? "Actualizar Arsenal" : "Lanzar al Drop"}
                </button>
                {editingId && (
                  <button 
                    onClick={() => { setEditingId(null); setForm(estadoInicial); }}
                    className="w-full text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white"
                  >
                    Cancelar Edición
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* LISTADO LADO DERECHO */}
          <div className="lg:col-span-7">
            <div className="grid gap-4">
              {products.map((p) => (
                <div key={p.id} className="group bg-[#0a0a0a] border border-white/5 p-4 flex items-center gap-6 hover:border-red-600/50 transition-all">
                  <div className="h-20 w-20 bg-black flex items-center justify-center border border-white/5 overflow-hidden">
                    <img src={p.imagen} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" alt={p.nombre} />
                  </div>
                  <div className="grow">
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] bg-zinc-800 px-1.5 py-0.5 font-bold uppercase">{p.categoria}</span>
                      <h3 className="text-lg font-black uppercase italic tracking-tighter">{p.nombre}</h3>
                    </div>
                    <p className="text-red-600 font-black italic text-xl mt-1">${p.precio.toLocaleString()}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Stock: <span className={p.stock < 5 ? "text-red-500" : "text-white"}>{p.stock} U</span></p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEdit(p)} className="bg-white text-black text-[10px] font-black px-4 py-2 hover:bg-red-600 hover:text-white transition-colors">EDIT</button>
                    <button onClick={() => deleteProduct(p.id!)} className="bg-zinc-900 text-white text-[10px] font-black px-4 py-2 hover:bg-red-600 transition-colors">DEL</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* VISTA DE PEDIDOS */
        <div className="max-w-5xl mx-auto space-y-6">
          {orders.length === 0 ? (
            <div className="border border-white/5 p-40 text-center">
              <div className="text-gray-800 font-black uppercase text-6xl italic opacity-20">Radar Limpio</div>
              <p className="text-gray-600 text-[10px] uppercase tracking-[0.5em] mt-4">Esperando nuevas transmisiones...</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-[#0a0a0a] border border-white/5 p-8 hover:border-red-600/30 transition-all relative overflow-hidden group">
                {/* Indicador de estado visual */}
                <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-red-600/10 rotate-45 group-hover:bg-red-600/20 transition-colors" />
                
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8 relative z-10">
                  <div>
                    <span className="text-[9px] font-black text-red-500 uppercase tracking-[0.4em] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                      ORDEN_ENTRANTE
                    </span>
                    <h3 className="text-4xl font-black italic mt-2 uppercase tracking-tighter text-white">{order.nombre_cliente}</h3>
                    <p className="text-[9px] text-zinc-600 font-mono mt-1 tracking-widest">TRANSMISSION_ID: {order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-black italic text-white tracking-tighter leading-none">${order.total?.toLocaleString()}</p>
                    <span className="inline-block mt-3 text-[10px] font-black bg-white text-black px-4 py-1.5 uppercase skew-x-[-12deg]">
                      {order.estado || 'PENDIENTE'}
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-8 grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-4 h-[1px] bg-gray-500" /> Destino del Arsenal
                      </p>
                      <div className="text-sm font-bold uppercase italic bg-white/5 p-4 border-l-2 border-white/20">
                        <p className="text-white text-lg">{order.direccion}</p>
                        <p className="text-gray-400 mt-1">{order.ciudad}, {order.region}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-white/5 border border-white/5">
                        <p className="text-[8px] text-zinc-500 font-black uppercase mb-1">Email</p>
                        <p className="text-[11px] font-bold text-white truncate">{order.email}</p>
                      </div>
                      <div className="p-3 bg-white/5 border border-white/5">
                        <p className="text-[8px] text-zinc-500 font-black uppercase mb-1">Teléfono</p>
                        <p className="text-[11px] font-bold text-white">{order.telefono}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <span className="w-4 h-[1px] bg-gray-500" /> Manifiesto de Carga
                    </p>
                    <div className="space-y-2">
                      {order.items?.map((item: any, i: number) => (
                        <div key={i} className="flex justify-between items-center bg-zinc-900/50 border border-white/5 p-3 px-5 group-hover:bg-red-600/5 transition-colors">
                          <p className="text-xs font-black uppercase italic">
                            <span className="text-red-600 mr-2">{item.cantidad}X</span> {item.nombre}
                          </p>
                          <span className="text-[9px] font-black bg-white text-black px-2 py-0.5 skew-x-[-10deg]">TALLA_{item.talla}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
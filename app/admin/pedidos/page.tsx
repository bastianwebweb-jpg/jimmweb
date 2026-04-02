"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

type Pedido = {
  id: string
  total: number
  estado: string
  empresa_envio?: string
  tracking?: string
}

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])

  const fetchPedidos = async () => {
    const { data } = await supabase.from("pedidos").select("*").order("created_at", { ascending: false })
    setPedidos(data || [])
  }

  useEffect(() => {
    fetchPedidos()
  }, [])

  const updateEstado = async (pedido: Pedido, nuevoEstado: string) => {
    await supabase
      .from("pedidos")
      .update({ estado: nuevoEstado })
      .eq("id", pedido.id)

    fetchPedidos()
  }

  const updateEnvio = async (pedido: Pedido) => {
    await supabase
      .from("pedidos")
      .update({
        empresa_envio: pedido.empresa_envio,
        tracking: pedido.tracking,
      })
      .eq("id", pedido.id)

    fetchPedidos()
  }

  return (
    <div className="max-w-5xl mx-auto p-4">

      <h1 className="text-2xl font-bold mb-6">
        Gestión de Pedidos
      </h1>

      {pedidos.map((p) => (
        <div key={p.id} className="border p-4 mb-4 rounded">

          <p className="font-bold">Pedido: {p.id}</p>
          <p>Total: ${p.total}</p>

          {/* ESTADO */}
          <select
            value={p.estado}
            onChange={(e) => updateEstado(p, e.target.value)}
            className="border p-2 mt-2"
          >
            <option value="pendiente">Pendiente</option>
            <option value="pagado">Pagado</option>
            <option value="enviado">Enviado</option>
          </select>

          {/* CAMPOS DE ENVÍO */}
          {p.estado === "enviado" && (
            <div className="mt-3">

              <input
                placeholder="Empresa de envío"
                className="border p-2 mr-2"
                onChange={(e) =>
                  (p.empresa_envio = e.target.value)
                }
              />

              <input
                placeholder="Número de seguimiento"
                className="border p-2 mr-2"
                onChange={(e) =>
                  (p.tracking = e.target.value)
                }
              />

              <button
                className="bg-black text-white px-3 py-1"
                onClick={() => updateEnvio(p)}
              >
                Guardar envío
              </button>

            </div>
          )}

        </div>
      ))}

    </div>
  )
}
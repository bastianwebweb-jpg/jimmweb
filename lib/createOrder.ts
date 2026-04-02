import { supabase } from "./supabase"

export async function createOrder(items: any[]) {
  // calcular total
  const total = items.reduce((acc, item) => acc + item.precio, 0)

  // 1. crear pedido
  const { data: pedido, error: errorPedido } = await supabase
    .from("pedidos")
    .insert([{ total }])
    .select()
    .single()

  if (errorPedido) throw errorPedido

  // 2. insertar items
  const itemsToInsert = items.map((item) => ({
    pedido_id: pedido.id,
    producto_id: item.id,
    cantidad: 1,
  }))

  const { error: errorItems } = await supabase
    .from("items_pedido")
    .insert(itemsToInsert)

  if (errorItems) throw errorItems

  return pedido
}
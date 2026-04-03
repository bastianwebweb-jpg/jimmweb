import { supabase } from "./supabase"

export async function createOrder(items: any[]) {
  // Calcular total sumando (precio * cantidad) de cada ítem
  const total = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

  // 1. Crear el registro principal del pedido
  const { data: pedido, error: errorPedido } = await supabase
    .from("pedidos")
    .insert([{ total }])
    .select()
    .single()

  if (errorPedido) throw errorPedido

  // 2. Preparar los ítems para la tabla "items_pedido"
  const itemsToInsert = items.map((item) => ({
    pedido_id: pedido.id,
    producto_id: item.id,
    cantidad: item.cantidad,
    // CRÍTICO: Aquí inyectamos el JSON con las medidas y posición
    // Si no tiene personalización, mandamos un objeto vacío
    custom_config: item.custom_config || {} 
  }))

  // 3. Insertar en la tabla que tiene la columna jsonb que creamos
  const { error: errorItems } = await supabase
    .from("items_pedido")
    .insert(itemsToInsert)

  if (errorItems) throw errorItems

  return pedido
}
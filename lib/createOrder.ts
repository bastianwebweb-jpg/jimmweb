import { supabase } from "./supabase"

export async function createOrder(items: any[]) {
  try {
    // 0. VERIFICAR SESIÓN DEL USUARIO
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      throw new Error("DEBES INICIAR SESIÓN PARA COMPLETAR TU PEDIDO")
    }

    const total = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

    // 1. Crear el registro incluyendo el user_id
    const { data: pedido, error: errorPedido } = await supabase
      .from("pedidos")
      .insert([{ 
        total, 
        user_id: user.id // <--- Vincular la compra al ID de auth
      }])
      .select()
      .single()

    if (errorPedido) {
      console.error("Error Pedido:", errorPedido)
      throw new Error(errorPedido.message)
    }

    if (!pedido) throw new Error("Error crítico al generar el ID de pedido")

    // 2. Preparar los ítems
    const itemsToInsert = items.map((item) => ({
      pedido_id: pedido.id,
      producto_id: item.id,
      cantidad: item.cantidad,
      custom_config: item.custom_config || {} 
    }))

    // 3. Insertar ítems
    const { error: errorItems } = await supabase
      .from("items_pedido")
      .insert(itemsToInsert)

    if (errorItems) {
      console.error("Error Items:", errorItems)
      throw new Error(errorItems.message)
    }

    return pedido

  } catch (err: any) {
    // Este error llegará directamente al alert de tu Cart.tsx
    throw new Error(err.message || "Error desconocido en el proceso")
  }
}
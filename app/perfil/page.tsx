"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function PerfilPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  // obtener usuario
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)

      if (!data.user) {
        router.push("/login")
      }
    }

    getUser()
  }, [])

  // logout
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="max-w-md mx-auto p-4">

      <h1 className="text-2xl font-bold mb-6">
        Mi Perfil
      </h1>

      {!user ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div className="border p-4 mb-4">
            <p className="font-medium">Email:</p>
            <p className="text-gray-600">{user.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2"
          >
            Cerrar sesión
          </button>
        </>
      )}

    </div>
  )
}
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Usamos getSession para asegurar la lectura de la cookie actual
  const { data: { session } } = await supabase.auth.getSession()
  const user = session?.user
  const path = request.nextUrl.pathname

  // Filtro para la zona de administración
  if (path.startsWith('/admin')) {
    console.log("--- INTENTO EN /ADMIN ---")
    console.log("Email en sesión:", user?.email || "No detectado")

    if (!user || user.email !== 'bastianwebweb@gmail.com') {
      console.log("Redirigiendo a /login por falta de permisos.");
      return NextResponse.redirect(new URL('/login', request.url))
    }
    console.log("Acceso autorizado.");
  }

  // Evitar que usuarios logueados vuelvan a login/register
  if (user && (path === '/login' || path === '/register')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
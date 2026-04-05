import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // 1. Creamos la respuesta base una sola vez
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
          // Actualizamos la petición para que el resto del middleware vea la cookie
          request.cookies.set({ name, value, ...options })
          // IMPORTANTE: Solo añadimos la cookie a la respuesta existente
          // No volvemos a ejecutar NextResponse.next()
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Validamos la sesión en el servidor
  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  // Lógica de Protección de Rutas /admin
  if (path.startsWith('/admin')) {
    // Si no hay usuario, al login
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // BYPASS DE EMERGENCIA para tu cuenta
    if (user.email === 'bastianvidal30@gmail.com') {
      return response
    }

    // Verificamos rol en la tabla profiles para otros usuarios
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Evitar que usuarios logueados vean login/register
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
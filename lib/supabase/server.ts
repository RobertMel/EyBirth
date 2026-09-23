import { createClient } from "@supabase/supabase-js"

// Client Supabase utilisé côté serveur (Server Actions, Route Handlers).
// Utilise la clé anon/publishable : sûre à exposer, protégée par les policies RLS
// définies dans supabase/schema.sql (écriture ouverte, lecture réservée à l'admin).
export function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error(
      "Variables Supabase manquantes : vérifie NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY dans .env.local"
    )
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  })
}

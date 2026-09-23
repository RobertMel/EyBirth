"use server"

import { createClient } from "@supabase/supabase-js"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export type Guest = {
  id: string
  name: string
  status: "Présent(e)" | "Absent(e)"
  guest_count: number
  message: string | null
  created_at: string
}

export type RsvpInput = {
  name: string
  attending: boolean
  message: string
}

// Appelée depuis le formulaire RSVP. Utilise la clé anon : respecte la policy
// RLS "insert only" définie dans supabase/schema.sql.
export async function submitRsvp(input: RsvpInput) {
  if (!input.name.trim()) {
    return { ok: false as const, error: "Le nom est requis." }
  }

  const supabase = getSupabaseServerClient()
  const { error } = await supabase.from("guests").insert({
    name: input.name.trim(),
    status: input.attending ? "Présent(e)" : "Absent(e)",
    guest_count: 1,
    message: input.message.trim() || null,
  })

  if (error) {
    console.error("submitRsvp error:", error.message)
    return { ok: false as const, error: "Une erreur est survenue, réessayez." }
  }

  return { ok: true as const }
}

// Client réservé au serveur : utilise le service_role, qui contourne RLS.
// Ne JAMAIS exposer ce client ou cette clé côté navigateur.
function getSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error(
      "Variable SUPABASE_SERVICE_ROLE_KEY manquante dans .env.local (nécessaire pour la page admin)."
    )
  }

  return createClient(url, serviceKey, { auth: { persistSession: false } })
}

// Vérifie le mot de passe admin et renvoie la liste des invités si correct.
// Le mot de passe n'est jamais comparé côté client : tout se passe ici, sur le serveur.
export async function loginAdminAndFetchGuests(password: string) {
  const expected = process.env.ADMIN_PASSWORD

  if (!expected) {
    return { ok: false as const, error: "ADMIN_PASSWORD n'est pas configuré côté serveur." }
  }
  if (password !== expected) {
    return { ok: false as const, error: "Mot de passe incorrect." }
  }

  const supabase = getSupabaseAdminClient()
  const { data, error } = await supabase
    .from("guests")
    .select("id, name, status, guest_count, message, created_at")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("loginAdminAndFetchGuests error:", error.message)
    return { ok: false as const, error: "Impossible de charger la liste des invités." }
  }

  return { ok: true as const, guests: data as Guest[] }
}

-- À exécuter dans Supabase : Dashboard → SQL Editor → New query → coller → Run

create table if not exists public.guests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  status text not null check (status in ('Présent(e)', 'Absent(e)')),
  guest_count integer not null default 1 check (guest_count between 1 and 15),
  message text,
  created_at timestamptz not null default now()
);

alter table public.guests enable row level security;

-- Ouvert en écriture : n'importe quel invité (via la clé anon) peut confirmer
-- sa présence sans compte, mais ne peut pas lire les réponses des autres.
create policy "Tout le monde peut confirmer sa présence"
  on public.guests
  for insert
  to anon
  with check (true);

-- Aucune policy SELECT pour le rôle "anon" : par défaut, RLS bloque toute
-- lecture depuis le navigateur. La page admin lit les données via le
-- service_role (côté serveur uniquement), qui contourne RLS.

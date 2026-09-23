"use client"

import { FormEvent, useEffect, useState } from "react"
import { ArrowLeft, CalendarDays, Check, ChevronRight, Clock3, Gift, LockKeyhole, MapPin, X } from "lucide-react"
import { Guest, loginAdminAndFetchGuests, submitRsvp } from "./actions"

const eventDate = new Date("2026-11-21T13:00:00+01:00").getTime()

function Countdown() {
  const [now, setNow] = useState(Date.now())
  useEffect(() => { const timer = window.setInterval(() => setNow(Date.now()), 1000); return () => window.clearInterval(timer) }, [])
  const remaining = Math.max(0, eventDate - now)
  const values = [
    ["Jours", Math.floor(remaining / 86400000)],
    ["Heures", Math.floor((remaining / 3600000) % 24)],
    ["Minutes", Math.floor((remaining / 60000) % 60)],
    ["Secondes", Math.floor((remaining / 1000) % 60)],
  ] as const
  return <div className="mt-7 grid grid-cols-4 gap-2" aria-label="Compte à rebours">{values.map(([label, value]) => <div key={label} className="rounded-2xl border border-[#536755]/25 bg-[#fbf6eb] px-1 py-3 text-center"><div className="font-serif text-xl text-[#536755]">{String(value).padStart(2, "0")}</div><div className="mt-1 text-[8px] uppercase tracking-[0.12em] text-[#8d8b78]">{label}</div></div>)}</div>
}

function Confetti() { return <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <span key={i} className="confetti" style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 8) * 70}ms`, backgroundColor: i % 3 === 0 ? "#536755" : i % 3 === 1 ? "#9dad96" : "#ece2cf" }} />)}</div> }

function RsvpForm() {
  const [name, setName] = useState("")
  const [attending, setAttending] = useState(true)
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (!name.trim() || submitting) return
    setSubmitting(true)
    setError(null)
    const result = await submitRsvp({ name, attending, message })
    setSubmitting(false)
    if (!result.ok) { setError(result.error); return }
    setSubmitted(true)
  }

  if (submitted) return <div className="mt-8 rounded-3xl border border-[#536755]/25 bg-[#f8f0df] p-6 text-center" role="status"><div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full text-white ${attending ? "bg-[#a8b7a0]" : "bg-[#c99d87]"}`}>{attending ? <Check size={18} /> : <X size={18} />}</div><h3 className="font-serif text-2xl text-[#536755]">{attending ? "Quelle joie !" : "Oh, quel dommage..."}</h3><p className="mt-2 text-sm leading-6 text-[#727463]">{attending ? <>Merci pour votre réponse. Nous avons hâte de vous retrouver !<br /><strong className="font-medium text-[#536755]">3 Rue de Ris, 91170 Viry-Châtillon</strong></> : "On pensera fort à vous pour cette belle journée."}</p>{attending && <p className="mt-4 text-xs italic text-[#8b806e]">Votre présence est déjà le plus beau des cadeaux — mais si le cœur vous en dit, Eyalane serait ravi d'une petite surprise 🎁</p>}</div>

  return <form onSubmit={submit} className="mt-8 border-t border-[#536755]/20 pt-8 text-left">
    <div className="mb-5 text-center"><p className="text-[10px] uppercase tracking-[0.28em] text-[#536755]">Votre réponse</p><h2 className="mt-2 font-serif text-2xl text-[#536755]">Serez-vous des nôtres ?</h2></div>
    <label className="mb-4 block text-xs font-medium text-[#687166]">Nom &amp; prénom<input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Votre nom" className="mt-2 w-full rounded-xl border border-[#d9cdb8] bg-[#fffaf1] px-4 py-3 text-sm text-[#536755] outline-none focus:border-[#9dad96] focus:ring-2 focus:ring-[#a8b7a0]/30" /></label>
    <div className="grid grid-cols-2 gap-2">
      <button type="button" onClick={() => setAttending(true)} aria-pressed={attending} className={`rounded-xl border px-2 py-3 text-xs transition ${attending ? "border-[#9dad96] bg-[#a8b7a0] text-white" : "border-[#d9cdb8] bg-[#fffaf1] text-[#7f8579]"}`}>Je serai présent(e)</button>
      <button type="button" onClick={() => setAttending(false)} aria-pressed={!attending} className={`rounded-xl border px-2 py-3 text-xs transition ${!attending ? "border-[#c99d87] bg-[#c99d87] text-white" : "border-[#d9cdb8] bg-[#fffaf1] text-[#7f8579]"}`}>Je ne pourrai pas venir</button>
    </div>
    <label className="mt-4 block text-xs font-medium text-[#687166]">Un petit mot (facultatif)<textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className="mt-2 w-full rounded-xl border border-[#d9cdb8] bg-[#fffaf1] px-4 py-3 text-sm text-[#536755] outline-none focus:border-[#9dad96] focus:ring-2 focus:ring-[#a8b7a0]/30" /></label>
    {error && <p className="mt-3 text-xs text-[#b0694f]">{error}</p>}
    <button disabled={submitting} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#596d5b] py-3.5 text-sm font-medium text-white shadow-[0_8px_20px_rgba(73,92,75,0.18)] transition hover:bg-[#4c604e] disabled:opacity-60">{submitting ? "Envoi..." : "Confirmer ma réponse"} <ChevronRight size={16} /></button>
  </form>
}

function Admin({ onBack }: { onBack: () => void }) {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [guests, setGuests] = useState<Guest[] | null>(null)

  const login = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    const result = await loginAdminAndFetchGuests(password)
    setLoading(false)
    if (!result.ok) { setError(result.error); return }
    setGuests(result.guests)
  }

  return <main className="min-h-screen bg-[#f5eddf] px-5 py-8 text-[#536755] sm:px-10">
    <div className="mx-auto max-w-3xl">
      <button onClick={onBack} className="mb-12 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#8b806e]"><ArrowLeft size={15} /> Retour à l&apos;invitation</button>

      {guests === null ? (
        <form onSubmit={login} className="mx-auto max-w-sm rounded-3xl border border-[#d8ccb9] bg-[#fffaf1] p-8 text-center">
          <LockKeyhole size={22} className="mx-auto mb-4 text-[#536755]" />
          <h1 className="font-serif text-2xl">Espace privé</h1>
          <p className="mt-2 text-xs text-[#8b806e]">Réservé aux parents d&apos;Eyalane.</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required className="mt-6 w-full rounded-xl border border-[#d9cdb8] bg-white px-4 py-3 text-sm outline-none focus:border-[#9dad96] focus:ring-2 focus:ring-[#a8b7a0]/30" />
          {error && <p className="mt-3 text-xs text-[#b0694f]">{error}</p>}
          <button disabled={loading} className="mt-5 w-full rounded-xl bg-[#596d5b] py-3 text-sm font-medium text-white transition hover:bg-[#4c604e] disabled:opacity-60">{loading ? "Vérification..." : "Accéder à la liste"}</button>
        </form>
      ) : (
        <>
          <div className="mb-9 flex items-end justify-between">
            <div><p className="text-[10px] uppercase tracking-[0.28em] text-[#536755]">Espace privé</p><h1 className="mt-2 font-serif text-4xl">Les invités</h1></div>
            <div className="rounded-2xl bg-[#dbe3d5] px-4 py-3 text-center"><span className="block font-serif text-2xl">{guests.filter((g) => g.status === "Présent(e)").reduce((sum, g) => sum + g.guest_count, 0)}</span><span className="text-[9px] uppercase tracking-widest">confirmés</span></div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-[#d8ccb9] bg-[#fffaf1] shadow-sm">
            <div className="grid grid-cols-[1fr_90px_70px] border-b border-[#e8dece] px-5 py-4 text-[10px] uppercase tracking-widest text-[#9a927f]"><span>Invité</span><span>Statut</span><span>Pers.</span></div>
            {guests.length === 0 && <div className="px-5 py-6 text-sm text-[#9a927f]">Aucune réponse pour le moment.</div>}
            {guests.map((guest) => (
              <div key={guest.id} className="grid grid-cols-[1fr_90px_70px] items-start border-b border-[#eee6d9] px-5 py-4 text-sm last:border-0">
                <div><span className="font-medium">{guest.name}</span>{guest.message && <p className="mt-1 text-xs italic text-[#8b806e]">« {guest.message} »</p>}</div>
                <span className={guest.status === "Présent(e)" ? "text-xs text-[#718770]" : "text-xs text-[#b07f6b]"}>{guest.status}</span>
                <span className="text-xs text-[#687166]">{guest.status === "Présent(e)" ? guest.guest_count : "—"}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  </main>
}

export default function Page() {
  const [splash, setSplash] = useState(true)
  const [opened, setOpened] = useState(false)
  const [admin, setAdmin] = useState(false)
  const openInvitation = () => { setOpened(true); window.setTimeout(() => setSplash(false), 850) }
  if (splash) return <main className="splash-screen"><div className={`text-center transition duration-700 ${opened ? "scale-110 opacity-0" : ""}`}><div className="envelope-wrap mx-auto mb-7 cursor-pointer" onClick={openInvitation} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openInvitation() }} aria-label="Ouvrir l'invitation"><div className="envelope"><div className="envelope-flap" /><div className="envelope-seal"><Gift size={17} /></div></div></div><p className="font-serif text-2xl italic text-[#536755] sm:text-3xl">Prêts à célébrer<br />un moment magique ?</p><p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#536755]">Cliquez pour ouvrir</p></div>{opened && <Confetti />}</main>
  if (admin) return <Admin onBack={() => setAdmin(false)} />
  return <main className="min-h-screen overflow-hidden bg-[#f5eddf] px-4 py-8 text-[#536755] sm:px-6"><div className="mx-auto max-w-xl"><div className="mb-7 flex items-center justify-between px-2"><span className="text-[10px] uppercase tracking-[0.28em] text-[#9a927f]">Invitation privée</span><span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[#536755]"><CalendarDays size={13} /> 21.11.26</span></div><section className="relative overflow-hidden rounded-[2rem] border border-[#536755]/45 bg-[#fffaf1] px-6 py-10 text-center shadow-[0_18px_55px_rgba(83,103,85,0.14)] sm:px-12"><span className="corner-ribbon corner-ribbon-left" aria-hidden="true" /><span className="corner-ribbon corner-ribbon-right" aria-hidden="true" /><div className="pointer-events-none absolute inset-3 rounded-[1.6rem] border border-[#536755]/20" /><div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 select-none text-2xl">
      <span className="absolute top-[4%] left-[8%] -rotate-12 opacity-80">🦁</span>
      <span className="absolute top-[7%] right-[12%] rotate-6 opacity-80">🦒</span>
      <span className="absolute top-[15%] left-[22%] rotate-3 opacity-80">🐘</span>
      <span className="absolute top-[11%] right-[28%] -rotate-6 opacity-80">🦓</span>
      <span className="absolute top-[24%] left-[6%] -rotate-3 opacity-80">🐒</span>
      <span className="absolute top-[20%] right-[9%] rotate-12 opacity-80">🦋</span>
      <span className="absolute top-[33%] left-[30%] -rotate-6 opacity-80">🐦</span>
      <span className="absolute top-[38%] right-[20%] rotate-6 opacity-80">🦜</span>
      <span className="absolute top-[46%] left-[10%] rotate-3 opacity-80">🐆</span>
      <span className="absolute top-[52%] right-[7%] -rotate-12 opacity-80">🌴</span>
      <span className="absolute top-[60%] left-[18%] rotate-6 opacity-80">🐾</span>
      <span className="absolute top-[64%] right-[25%] -rotate-3 opacity-80">☀️</span>
      <span className="absolute top-[71%] left-[8%] rotate-12 opacity-80">🌿</span>
      <span className="absolute top-[76%] right-[13%] -rotate-6 opacity-80">🌾</span>
      <span className="absolute top-[83%] left-[27%] rotate-3 opacity-80">🦋</span>
      <span className="absolute top-[88%] right-[9%] -rotate-12 opacity-80">🐦</span>
      <span className="absolute top-[93%] left-[14%] rotate-6 opacity-80">🐘</span>
      <span className="absolute top-[95%] right-[22%] -rotate-3 opacity-80">🦁</span>
</div><div className="relative z-10"><div className="mx-auto mb-7 flex h-11 w-11 items-center justify-center rounded-full bg-[#dce5d7] text-[#788b76]"><Gift size={20} strokeWidth={1.4} /></div><p className="text-[10px] uppercase tracking-[0.4em] text-[#536755]">Une première bougie, un grand bonheur à partager...</p><h1 className="mt-4 font-serif text-6xl italic tracking-tight text-[#536755] sm:text-7xl">Eyalane</h1><div className="mx-auto my-5 h-44 w-44 overflow-hidden rounded-full border-[3px] border-[#536755]/70 shadow-[0_8px_20px_rgba(83,103,85,0.22)]"><img src="/photos/eyalane.jpg" alt="Eyalane" className="h-full w-full object-cover" /></div><p className="font-serif text-3xl text-[#536755]">1 an</p><p className="mx-auto mt-5 max-w-xs text-sm leading-6 text-[#7d8273]">Venez célébrer ce merveilleux moment à nos côtés et créer avec nous de précieux souvenirs ! 🥳</p><div className="mt-7 flex items-start justify-center divide-x divide-[#536755]/30 text-[10px] text-[#687166]"><div className="flex min-w-0 flex-1 flex-col items-center gap-2 px-2"><CalendarDays size={15} className="text-[#536755]" /><span>21 novembre</span></div><div className="flex min-w-0 flex-1 flex-col items-center gap-2 px-2"><Clock3 size={15} className="text-[#536755]" /><span>13h00</span></div><div className="flex min-w-0 flex-1 flex-col items-center gap-2 px-2"><MapPin size={15} className="text-[#536755]" /><span>Viry Châtillon</span></div></div><p className="mx-auto mt-6 w-fit rounded-full border border-[#536755]/25 bg-[#fbf6eb] px-4 py-2 text-[10px] tracking-wide text-[#78806f]">Code couleur : Vert sauge &amp; beige</p><Countdown /><RsvpForm /></div></section><button onClick={() => setAdmin(true)} aria-label="Ouvrir la vue admin" className="fixed bottom-4 right-4 rounded-full border border-[#536755]/30 bg-[#fffaf1]/80 p-3 text-[#9b8764] shadow-sm backdrop-blur transition hover:bg-white"><LockKeyhole size={14} /></button><p className="py-7 text-center text-[10px] uppercase tracking-[0.28em] text-[#aaa18f]">Avec tout notre amour</p></div></main>
}

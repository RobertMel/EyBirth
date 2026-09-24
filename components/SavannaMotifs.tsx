// Motifs décoratifs "savane" en SVG plat (pas de dépendance externe, pas de
// crédits IA nécessaires) : feuillages + silhouettes d'animaux, dans les
// couleurs du thème (sauge / beige).

const SAGE_DEEP = "#536755"
const SAGE = "#9dad96"
const SAGE_PALE = "#c9d3c1"
const BEIGE = "#ece2cf"
const BEIGE_LINE = "#d9cdb8"

export function LeafSpray({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g>
        <path d="M60 62 C40 40 20 30 4 22 C18 42 26 62 40 78 C46 74 54 68 60 62Z" fill={SAGE} opacity={0.9} />
        <path d="M60 62 C50 34 40 14 26 0 C36 22 40 46 48 70 C52 68 56 66 60 62Z" fill={SAGE_DEEP} opacity={0.85} />
        <path d="M60 62 C70 32 84 10 104 0 C90 24 82 48 70 72 C66 68 62 66 60 62Z" fill={SAGE} opacity={0.9} />
        <path d="M60 62 C82 48 104 42 120 32 C102 48 90 66 76 82 C70 76 64 68 60 62Z" fill={SAGE_DEEP} opacity={0.75} />
        <path d="M60 62 C56 86 50 106 40 120 C48 100 50 80 52 62Z" fill={BEIGE} opacity={0.9} />
      </g>
    </svg>
  )
}

export function LionIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <ellipse key={deg} cx={32} cy={32} rx={9} ry={17} fill={BEIGE} transform={`rotate(${deg} 32 32)`} />
      ))}
      <circle cx={32} cy={32} r={14} fill={SAGE_DEEP} />
      <path d="M20 24 C22 18 26 16 32 16 C38 16 42 18 44 24" fill="none" stroke={BEIGE} strokeWidth={2} strokeLinecap="round" />
      <circle cx={27} cy={31} r={1.6} fill={BEIGE} />
      <circle cx={37} cy={31} r={1.6} fill={BEIGE} />
      <path d="M30 36 Q32 38 34 36" fill="none" stroke={BEIGE} strokeWidth={1.6} strokeLinecap="round" />
      <path d="M32 33 L32 36" stroke={BEIGE} strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  )
}

export function GiraffeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M27 58 C25 42 24 28 27 12 C29 8 35 8 37 12 C39 26 38 42 37 58Z" fill={BEIGE} />
      <ellipse cx={32} cy={10} rx={10} ry={9} fill={BEIGE} />
      <circle cx={26} cy={3} r={2.2} fill={SAGE_DEEP} />
      <circle cx={38} cy={3} r={2.2} fill={SAGE_DEEP} />
      <circle cx={28} cy={10} r={1.5} fill={SAGE_DEEP} />
      <circle cx={36} cy={9} r={1.5} fill={SAGE_DEEP} />
      <ellipse cx={30} cy={22} rx={3} ry={2.4} fill={SAGE} />
      <ellipse cx={35} cy={30} rx={2.6} ry={2} fill={SAGE} />
      <ellipse cx={29} cy={38} rx={3} ry={2.2} fill={SAGE} />
      <ellipse cx={35} cy={46} rx={2.4} ry={2} fill={SAGE} />
    </svg>
  )
}

export function ElephantIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <ellipse cx={14} cy={28} rx={11} ry={13} fill={SAGE} opacity={0.9} />
      <ellipse cx={50} cy={28} rx={11} ry={13} fill={SAGE} opacity={0.9} />
      <circle cx={32} cy={28} r={17} fill={BEIGE} />
      <circle cx={25} cy={25} r={1.8} fill={SAGE_DEEP} />
      <circle cx={39} cy={25} r={1.8} fill={SAGE_DEEP} />
      <path d="M28 34 C26 42 26 50 30 56 C33 58 35 56 34 52" fill="none" stroke={BEIGE} strokeWidth={5} strokeLinecap="round" />
    </svg>
  )
}

export function ZebraIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M20 16 L16 6 M26 14 L24 4 M32 14 L32 4 M38 14 L40 4" stroke={BEIGE} strokeWidth={3} strokeLinecap="round" />
      <ellipse cx={30} cy={26} rx={16} ry={14} fill={BEIGE} />
      <ellipse cx={22} cy={40} rx={9} ry={12} fill={BEIGE} />
      <circle cx={25} cy={24} r={1.6} fill={SAGE_DEEP} />
      <path d="M14 20 Q22 18 28 22 M16 28 Q24 26 30 30 M14 34 Q20 33 24 36" stroke={SAGE_DEEP} strokeWidth={2.2} strokeLinecap="round" fill="none" />
      <path d="M18 36 Q22 40 20 48 M26 40 Q28 44 26 50" stroke={SAGE_DEEP} strokeWidth={2} strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function GorillaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <ellipse cx={32} cy={44} rx={17} ry={14} fill={SAGE} opacity={0.9} />
      <circle cx={16} cy={34} r={6} fill={SAGE} opacity={0.9} />
      <circle cx={48} cy={34} r={6} fill={SAGE} opacity={0.9} />
      <ellipse cx={32} cy={22} rx={15} ry={14} fill={BEIGE} />
      <ellipse cx={32} cy={26} rx={9} ry={7} fill={SAGE_PALE} />
      <circle cx={27} cy={20} r={1.8} fill={SAGE_DEEP} />
      <circle cx={37} cy={20} r={1.8} fill={SAGE_DEEP} />
      <path d="M22 14 Q32 8 42 14" fill="none" stroke={BEIGE} strokeWidth={3} strokeLinecap="round" />
    </svg>
  )
}

export function LeopardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M20 16 L16 8 M28 13 L26 5 M36 13 L38 5 M44 16 L48 8" stroke={BEIGE} strokeWidth={2.6} strokeLinecap="round" />
      <circle cx={32} cy={28} r={17} fill={BEIGE} />
      <circle cx={26} cy={26} r={1.6} fill={SAGE_DEEP} />
      <circle cx={38} cy={26} r={1.6} fill={SAGE_DEEP} />
      <path d="M29 33 Q32 35 35 33" fill="none" stroke={SAGE_DEEP} strokeWidth={1.4} strokeLinecap="round" />
      {[
        [20, 18], [40, 17], [16, 30], [46, 30], [22, 40], [38, 40], [30, 12],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={1.8} fill={SAGE} />
      ))}
    </svg>
  )
}

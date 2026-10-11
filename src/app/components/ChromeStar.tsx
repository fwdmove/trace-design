// A four-point sparkle filled with a chrome gradient. Pure SVG, so it stays
// sharp at any size; `id` keeps each instance's gradient unique.
export default function ChromeStar({ id, className = '' }: { id: string; className?: string }) {
  return (
    <svg className={`star ${className}`} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.3" stopColor="#c9d1e0" />
          <stop offset="0.48" stopColor="#5b6478" />
          <stop offset="0.52" stopColor="#1d2130" />
          <stop offset="0.6" stopColor="#aab4c8" />
          <stop offset="0.82" stopColor="#f4f7fc" />
          <stop offset="1" stopColor="#8e98ad" />
        </linearGradient>
      </defs>
      <path
        d="M50 0 C53 32 68 47 100 50 C68 53 53 68 50 100 C47 68 32 53 0 50 C32 47 47 32 50 0 Z"
        fill={`url(#${id}-g)`}
      />
    </svg>
  )
}

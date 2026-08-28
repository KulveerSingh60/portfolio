import { MARQUEE_WORDS } from '../data'

export default function Marquee() {
  const row = [...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((w, i) => (
          <span className="marquee-item" key={i}>
            <span className="mq-word">{w}</span>
            <span className="mq-sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

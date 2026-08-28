export default function SectionHead({ chapter, eyebrow, title, sub, align = 'left' }) {
  return (
    <div className={`section-head ${align === 'center' ? 'center' : 'left'}`}>
      <div className="section-head-row">
        {chapter && <span className="chapter mono">{chapter}</span>}
        {eyebrow && <span className="eyebrow mono">{eyebrow}</span>}
      </div>
      <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />
      {sub && <p className="section-sub">{sub}</p>}
    </div>
  )
}

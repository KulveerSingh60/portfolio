import { STATS } from '../../data'

export default function HeroFallback() {
  return (
    <div className="hero-fallback" aria-label="Developer workspace visual">
      <div className="code-window">
        <div className="cwin-bar">
          <span className="cwin-dot red" />
          <span className="cwin-dot yellow" />
          <span className="cwin-dot green" />
          <span className="cwin-title mono">developer.ts</span>
          <span className="cwin-branch mono">main</span>
        </div>
        <pre className="cwin-body mono">
          <code>
            <span className="t-c">// kulveer singh</span>
            {'\n'}
            <span className="t-key">const</span> <span className="t-var">developer</span> = {'{'}
            {'\n'}
            {'  '}<span className="t-prop">name</span>: <span className="t-str">'Kulveer Singh'</span>,
            {'\n'}
            {'  '}<span className="t-prop">role</span>: <span className="t-str">'Full-Stack'</span>,
            {'\n'}
            {'  '}<span className="t-prop">stack</span>: [<span className="t-str">'PHP'</span>,{' '}
            <span className="t-str">'MySQL'</span>, <span className="t-str">'JavaScript'</span>],
            {'\n'}
            {'  '}<span className="t-prop">status</span>: <span className="t-str">'open to work'</span>,
            {'\n'}
            {'}'};
          </code>
        </pre>
        <div className="cwin-stats">
          {STATS.map((s) => (
            <div key={s.label}>
              <b>{s.value}{s.suffix}</b>
              <span>{s.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

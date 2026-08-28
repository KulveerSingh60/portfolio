export default function HeroFallback() {
  return (
    <div className="hero-fallback" aria-label="Developer code visual">
      <div className="code-window">
        <div className="cwin-bar">
          <span className="cwin-dot red" />
          <span className="cwin-dot yellow" />
          <span className="cwin-dot green" />
          <span className="cwin-title mono">developer.ts</span>
        </div>
        <pre className="cwin-body mono">
          <code>
            <span className="t-key">const</span> <span className="t-var">developer</span> = {'{'}
            {'\n'}
            {'  '}<span className="t-prop">name</span>: <span className="t-str">'Kulveer Singh'</span>,
            {'\n'}
            {'  '}<span className="t-prop">role</span>: <span className="t-str">'Full-Stack'</span>,
            {'\n'}
            {'  '}<span className="t-prop">stack</span>: [<span className="t-str">'PHP'</span>,{' '}
            <span className="t-str">'MySQL'</span>, <span className="t-str">'JS'</span>]
            {'\n'}
            {'}'};
          </code>
        </pre>
        <div className="cwin-stats">
          <div><b>12+</b><span>months</span></div>
          <div><b>3</b><span>interns</span></div>
          <div><b>20+</b><span>skills</span></div>
        </div>
      </div>
    </div>
  )
}

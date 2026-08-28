import { Component } from 'react'

export default class SectionBoundary extends Component {
  state = { hasError: false, message: '' }

  static getDerivedStateFromError(err) {
    return { hasError: true, message: String((err && err.message) || err) }
  }

  componentDidCatch(error, info) {
    console.error('[Portfolio] Section boundary caught error:', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children
    if (this.props.fallback !== undefined) return this.props.fallback
    return (
      <div className="container pad">
        <div className="b-error mono">
          This section failed to render.{' '}
          <span className="accent">{this.state.message}</span>
        </div>
      </div>
    )
  }
}

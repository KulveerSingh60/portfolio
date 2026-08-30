const DEV_URL = 'http://localhost:8787'
const TIMEOUT_MS = 20000

export const MAX_MESSAGE_LENGTH = 2000
export const MAX_BROWSER_HISTORY = 10

/**
 * Resolves the KULVEER.AI Worker endpoint.
 * - Explicit VITE_AI_API_URL wins (set at build/deploy time for production).
 * - In local Vite development, fall back to the local Wrangler dev server.
 * - In a production build with no URL configured, return '' so the UI shows a
 *   friendly "not configured" state instead of a broken fetch.
 */
export function getAiApiUrl() {
  const explicit = import.meta.env.VITE_AI_API_URL
  if (explicit && typeof explicit === 'string' && explicit.trim()) {
    return explicit.trim()
  }
  if (import.meta.env.DEV) {
    return DEV_URL
  }
  return ''
}

/**
 * Sends a single user message (plus bounded conversation history) to the
 * Worker and resolves to the assistant's text reply.
 * Throws on timeout, non-OK HTTP, or malformed/empty response.
 */
export async function requestReply({ apiUrl, message, history }) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
      signal: controller.signal,
    })

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }

    const data = await res.json()
    if (!data || typeof data.response !== 'string' || !data.response.trim()) {
      throw new Error('Malformed response')
    }
    return data.response.trim()
  } finally {
    clearTimeout(timer)
  }
}

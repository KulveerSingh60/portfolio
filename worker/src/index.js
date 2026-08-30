import { buildSystemPrompt } from './portfolio-context.js'

const DEFAULT_MODEL = '@cf/meta/llama-3.1-8b-instruct-fast'
const MAX_MESSAGE_LENGTH = 2000
const MAX_HISTORY_MESSAGES = 10
const MAX_OUTPUT_TOKENS = 420

const ALLOWED_ORIGINS = [
  'https://kulveersingh60.github.io',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]

function cors(origin) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ''
  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  }
  if (allowed) {
    headers['Access-Control-Allow-Origin'] = allowed
  }
  return headers
}

function json(data, status, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...extra },
  })
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors(origin) })
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, cors(origin))
    }

    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return json({ error: 'Forbidden origin' }, 403, cors(origin))
    }

    let body
    try {
      body = await request.json()
    } catch {
      return json({ error: 'Invalid request body' }, 400, cors(origin))
    }

    const message = typeof body?.message === 'string' ? body.message.trim() : ''
    if (!message) {
      return json({ error: 'Message is required' }, 400, cors(origin))
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return json({ error: 'Message is too long' }, 413, cors(origin))
    }

    const history = Array.isArray(body?.history) ? body.history : []
    const sanitized = history
      .filter(
        (m) =>
          m &&
          (m.role === 'user' || m.role === 'assistant') &&
          typeof m.content === 'string'
      )
      .slice(-MAX_HISTORY_MESSAGES)
      .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }))

    const messages = [
      { role: 'system', content: buildSystemPrompt() },
      ...sanitized,
      { role: 'user', content: message },
    ]

    const model = env.AI_MODEL || DEFAULT_MODEL

    try {
      const result = await env.AI.run(model, {
        messages,
        max_tokens: MAX_OUTPUT_TOKENS,
        temperature: 0.4,
      })

      const reply = typeof result?.response === 'string' ? result.response.trim() : ''
      if (!reply) {
        return json({ error: 'The assistant returned an empty response' }, 502, cors(origin))
      }

      return json({ response: reply }, 200, cors(origin))
    } catch (err) {
      console.error('KULVEER.AI worker error:', err)
      return json({ error: 'AI service temporarily unavailable' }, 502, cors(origin))
    }
  },
}

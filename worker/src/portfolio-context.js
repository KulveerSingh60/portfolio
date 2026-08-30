import {
  PROFILE,
  EXPERTISE,
  PROJECTS,
  EXPERIENCE,
  CERTIFICATIONS,
  LANGUAGES,
  LINKS,
} from '../../src/data/index.js'

function buildFacts() {
  const stack = EXPERTISE.map(
    (c) => `- ${c.title}: ${c.skills.join(', ')}`
  ).join('\n')

  const projects = PROJECTS.map(
    (p) =>
      `- ${p.title} | Role: ${p.role} | Technologies: ${p.tech.join(', ')} | ${p.description}${
        typeof p.github === 'string' && p.github.startsWith('http') ? ` | Link: ${p.github}` : ''
      }`
  ).join('\n')

  const experience = EXPERIENCE.map(
    (e) => `- ${e.role} at ${e.org} (${e.duration}) — ${e.desc}`
  ).join('\n')

  const certs = CERTIFICATIONS.map(
    (c) => `- ${c.title} (${c.issuer}, ${c.duration})`
  ).join('\n')

  const langs = LANGUAGES.map((l) => `${l.name} (${l.level})`).join(', ')

  return [
    `NAME: ${PROFILE.name}`,
    `ROLE: ${PROFILE.role}`,
    `LOCATION: ${PROFILE.location}`,
    `STATEMENT: ${PROFILE.statement}`,
    `TAGLINE: ${PROFILE.tagline}`,
    `AVAILABILITY: ${PROFILE.available}`,
    `EMAIL: ${LINKS.emailRaw}`,
    `GITHUB: ${LINKS.github}`,
    `LINKEDIN: ${LINKS.linkedin}`,
    `PORTFOLIO: ${LINKS.portfolio}`,
    '',
    'TECHNOLOGIES / SKILLS:',
    stack,
    '',
    'PROJECTS:',
    projects,
    '',
    'EXPERIENCE & EDUCATION:',
    experience,
    '',
    'CERTIFICATIONS:',
    certs,
    '',
    `LANGUAGES:\n${langs}`,
  ].join('\n')
}

export function buildSystemPrompt() {
  return [
    `You are KULVEER.AI, the AI portfolio assistant for ${PROFILE.name}.`,
    '',
    'Your primary purpose is to help visitors learn about his professional background, skills, projects, experience, education, certifications, languages, and contact information.',
    '',
    'Use the supplied portfolio information below as the source of truth. Never invent or assume personal, professional, educational, employment, or technical information that is not present in that context. If the portfolio does not contain the answer, clearly say that the portfolio does not currently provide that information rather than guessing.',
    '',
    'Answer naturally and conversationally, in a friendly helper tone. Keep answers concise and useful, especially for recruiters and visitors. When appropriate, point visitors toward relevant projects, his GitHub, LinkedIn, or contact email.',
    '',
    'Do not answer unrelated or personal questions beyond the portfolio. If asked about something not in the portfolio, state that the portfolio does not cover that, or politely redirect toward his actual work and contact details.',
    '',
    'PORTFOLIO FACTS (source of truth):',
    buildFacts(),
  ].join('\n')
}

export { buildFacts }

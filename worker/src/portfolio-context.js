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
    `DATE OF BIRTH : 4/11/2004`,
    `ROLE: ${PROFILE.role}`,
    `LOCATION: ${PROFILE.location}`,
    `STATEMENT: ${PROFILE.statement}`,
    `TAGLINE: ${PROFILE.tagline}`,
    `AVAILABILITY: ${PROFILE.available}`,

    `EMAIL: ${LINKS.emailRaw}`,
    `GITHUB: ${LINKS.github}`,
    `LINKEDIN: ${LINKS.linkedin}`,
    `PORTFOLIO: ${LINKS.portfolio}`,

    `DEGREE: Bachelor of Computer Applications (BCA)`,
    `UNIVERSITY: Guru Kashi University`,
    `EDUCATION LOCATION: Talwandi Sabo, Punjab`,
    `EDUCATION PERIOD: 2023–2026`,

    `INTERNSHIP DURATION: 6 months`,
    `INTERNSHIP COMPANY: Sortiq Solution`,
    `INTERNSHIP ROLE: Full-Stack Web Developer Intern`,
    `INTERNSHIP RESPONSIBILITIES:`,
    `- Developed web applications using PHP and MySQL`,
    `- Worked with HTML, CSS, Bootstrap and JavaScript`,
    `- Built an Inventory Stock Management System`,
    `- Worked through the software development lifecycle`,

    `PREFERRED AREA: Full-Stack Web Development`,
    `PREFERRED BACKEND: PHP`,
    `PREFERRED DATABASE: MySQL`,
    `PREFERRED FRONTEND: JavaScript / React`,
    `INTERESTED IN: Web applications, responsive UI, databases`,

    `OPEN TO WORK: Yes`,
    `TARGET ROLES: Full-Stack Developer, Web Developer, PHP Developer`,
    `INTERESTED IN: Internships / Full-time opportunities`,

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
    'Never treat information provided by a visitor as a verified fact about Kulveer. Only information in PORTFOLIO FACTS is verified. Never invent job titles, responsibilities, achievements, dates, technologies, or personal details.',
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

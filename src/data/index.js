export const LINKS = {
  github: 'https://github.com/KulveerSingh60',
  linkedin: 'https://www.linkedin.com/in/kulveer-singh-/',
  email: 'mailto:kulveerxsingh60@gmail.com',
  emailRaw: 'kulveerxsingh60@gmail.com',
  portfolio: 'https://kulveersingh60.github.io/portfolio/',
  projects: 'https://github.com/KulveerSingh60/projects',
}

export const SOCIALS = [
  { name: 'GitHub', url: LINKS.github, handle: '@KulveerSingh60' },
  { name: 'LinkedIn', url: LINKS.linkedin, handle: 'Kulveer Singh' },
  { name: 'Email', url: LINKS.email, handle: LINKS.emailRaw },
]

export const PROFILE = {
  name: 'Kulveer Singh',
  firstName: 'Kulveer',
  lastName: 'Singh',
  role: 'Full-Stack Developer',
  statement: 'I build modern web applications and interactive digital experiences.',
  subLine: 'Building modern web applications with PHP, MySQL and JavaScript.',
  location: 'Gidderbaha, Punjab, India',
  logo: 'KULVEER.SINGH',
  tagline:
    'Computer Applications graduate & full-stack developer. I design and ship real-world web apps with PHP, MySQL and JavaScript — clean, responsive, built to perform.',
  available: 'Available for full-Stack & web developer roles',
  about:
    "I'm a motivated Computer Applications graduate (BCA, Guru Kashi University) with 12+ months of combined internship experience across full-stack web development, digital marketing, and business computing. I've shipped a real-world inventory system end-to-end and I'm equally comfortable in technical and non-technical environments — quick to learn, detail-oriented, and committed to quality.",
}

export const STATS = [
  { value: 12, suffix: '+', label: 'Months', sub: 'Experience' },
  { value: 3, suffix: '', label: 'Internships', sub: '& Training' },
  { value: 4, suffix: '', label: 'Certifications', sub: 'Earned' },
  { value: 12, suffix: '+', label: 'Technologies', sub: 'In my stack' },
]

/* Labrador-format expertise: primary dev stack first, additional skills separated */
export const EXPERTISE = [
  {
    id: 'frontend',
    title: 'Frontend',
    desc: 'Responsive, accessible interfaces that look right on every screen.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Bootstrap'],
  },
  {
    id: 'backend',
    title: 'Backend & Data',
    desc: 'Server-side logic, databases, and the queries that keep things fast.',
    skills: ['PHP', 'MySQL', 'AJAX', 'Optimized Indexing'],
  },
  {
    id: 'tools',
    title: 'Tools & Workflow',
    desc: 'Version control, editors, and the tooling around shipping software.',
    skills: ['Git & GitHub', 'VS Code', 'Responsive Design'],
  },
  {
    id: 'cms',
    title: 'WordPress & CMS',
    desc: 'Building and maintaining real WordPress sites end-to-end.',
    skills: ['WordPress', 'Themes', 'Plugins'],
  },
  {
    id: 'additional',
    title: 'Additional Skills',
    desc: 'Secondary — business and growth skills from my marketing & accounts training.',
    skills: ['SEO', 'SMM', 'Campaign Analytics', 'Data Entry', 'MS Office', 'Tally', 'Canva'],
    secondary: true,
  },
]

/* Developer process — kept general, no fabricated claims */
export const PROCESS = [
  { step: '01', title: 'Discover', desc: 'Understand the problem, the users, and what success looks like.' },
  { step: '02', title: 'Plan', desc: 'Model the data, map the flows, and structure the application.' },
  { step: '03', title: 'Build', desc: 'Implement features with PHP, MySQL, and JavaScript.' },
  { step: '04', title: 'Test', desc: 'Check the logic, flows, and edge cases across the full SDLC.' },
  { step: '05', title: 'Deploy', desc: 'Ship, monitor, and refine.' },
]

export const PROJECT_FILTERS = ['All', 'PHP', 'MySQL', 'JavaScript', 'WordPress']

export const PROJECTS = [
  {
    id: 1,
    number: '01',
    title: 'Inventory Stock Management System',
    tag: 'Full-Stack · Internship',
    description:
      'Designed and built a full-stack web application to eliminate manual stock-tracking errors and provide real-time visibility into inventory. Implemented role-based authentication, optimized MySQL queries/indexing (~40% faster page loads), and integrated AJAX calls for live updates without refreshes.',
    problem:
      'Manual stock tracking was error-prone, with no real-time visibility into inventory levels or staff access controls.',
    solution:
      'Built a full-stack PHP and MySQL inventory system with role-based authentication, optimized indexing, and live AJAX updates — cutting manual tracking errors and delivering real-time visibility.',
    features: ['Role-based authentication', 'Real-time inventory visibility', 'Optimized MySQL indexing', 'Live AJAX updates without refresh'],
    tech: ['PHP', 'MySQL', 'AJAX', 'Bootstrap'],
    filters: ['PHP', 'MySQL', 'JavaScript'],
    role: 'Lead Developer · Sortiq Solution',
    github: 'https://github.com/KulveerSingh60/Inventory-Stock-MAnagement-System',
    visual: 'inventory',
    accent: '#2bd98b',
  },
  {
    id: 2,
    number: '02',
    title: 'Digital Marketing · GreenBasket',
    tag: 'Training · 45 Days',
    description:
      'At Softwiz Pvt. Ltd., applied SEO, social media marketing, and paid-advertising strategies on live campaigns, analysed performance metrics, and prepared engagement reports. Built GreenBasket, a WordPress website, as part of the internship.',
    problem:
      'Live campaigns needed hands-on SEO, social, and paid-advertising execution with clear performance reporting.',
    solution:
      'Applied SEO, SMM and paid-advertising strategies on live campaigns, analysed performance metrics, prepared weekly reports, and built a WordPress site (GreenBasket).',
    features: ['Live campaign management', 'SEO & paid advertising', 'Performance analytics', 'WordPress site build'],
    tech: ['WordPress', 'SEO', 'SMM', 'Analytics'],
    filters: ['WordPress'],
    role: 'Digital Marketing Trainee · Softwiz Pvt. Ltd.',
    github: LINKS.github,
    visual: 'marketing',
    accent: '#e1306c',
  },
]

/* The Lab — structure only real entries; placeholder slots are clearly "coming soon" */
export const LAB_ITEMS = [
  {
    number: '01',
    title: 'Interactive 3D',
    tag: 'Experiment',
    desc: 'Building an interactive 3D developer workspace with React Three Fiber & Three.js.',
    status: 'live',
  },
  {
    number: '02',
    title: 'UI Concepts',
    tag: 'Experiment',
    desc: 'Prototyping editorial and gallery-style interfaces for developer portfolios.',
    status: 'live',
  },
  {
    number: '03',
    title: 'Coming Soon',
    tag: 'Scheduled',
    desc: 'Reserved for future experiments — concentration being kept open.',
    status: 'soon',
  },
]

export const EXPERIENCE = [
  {
    period: '2024 – 2025',
    type: 'work',
    duration: 'May 2024 – Apr 2025',
    role: 'Computer Operator & Billing Executive',
    org: 'Brar Agro Implements',
    desc: 'Handled billing operations, invoice generation, and daily data entry. Maintained customer, inventory, and transaction records.',
  },
  {
    period: 'Internship',
    type: 'work',
    duration: '6 Months',
    role: 'Full-Stack Web Developer Intern',
    org: 'Sortiq Solution',
    desc: 'Developed end-to-end apps with PHP, MySQL, HTML, CSS, Bootstrap and JavaScript. Delivered the Inventory Stock Management System across the full SDLC.',
  },
  {
    period: 'Internship',
    type: 'work',
    duration: '45 Days',
    role: 'Digital Marketing Trainee',
    org: 'Softwiz Pvt. Ltd., Bathinda',
    desc: 'Applied SEO, SMM, and paid advertising on live campaigns; analysed metrics and prepared weekly reports.',
  },
  {
    period: 'Training',
    type: 'work',
    duration: '6 Months',
    role: 'Computer Fundamentals & Accounts',
    org: 'Digital Institute, Gidderbaha',
    desc: 'Mastered MS Office (Word, Excel, PowerPoint) and Tally; strong data entry and spreadsheet skills.',
  },
  {
    period: 'Education',
    type: 'education',
    duration: '2023 – 2026',
    role: 'Bachelor of Computer Applications (BCA)',
    org: 'Guru Kashi University',
    loc: 'Talwandi Sabo, Punjab, India',
    desc: 'Focused on computer applications, databases, programming, web development, and database systems.',
  },
]

export const LANGUAGES = [
  { name: 'Punjabi', level: 'Native' },
  { name: 'Hindi', level: 'Fluent' },
  { name: 'English', level: 'Professional' },
]

export const CERTIFICATIONS = [
  { title: 'Full-Stack PHP Web Development', issuer: 'Sortiq Solution', duration: '6 Months' },
  { title: 'Digital Marketing Training', issuer: 'Softwiz Pvt. Ltd.', duration: '45 Days' },
  { title: 'Computer Fundamentals & Accounts', issuer: 'Digital Institute', duration: '6 Months' },
  { title: 'International Conference · ICIAI-2025', issuer: 'Guru Kashi University', duration: 'Apr 2025' },
]

export const MARQUEE_WORDS = ['FULL-STACK DEVELOPER', 'PHP', 'MYSQL', 'JAVASCRIPT', 'REACT', 'WORDPRESS']

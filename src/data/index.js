export const LINKS = {
  github: 'https://github.com/KulveerSingh60',
  linkedin: 'https://www.linkedin.com/in/kulveer-singh-/',
  email: 'mailto:kulveerxsingh60@gmail.com',
  emailRaw: 'kulveerxsingh60@gmail.com',
  portfolio: 'https://kulveersingh60.github.io/portfolio/',
  projects: 'https://github.com/KulveerSingh60/projects',
}

export const PROFILE = {
  name: 'Kulveer Singh',
  firstName: 'Kulveer',
  role: 'Full-Stack Developer',
  subLine: 'Building modern web applications with PHP, MySQL and JavaScript.',
  location: 'Gidderbaha, Punjab, India',
  logo: 'kulveer.dev',
  tagline: 'Computer Applications graduate & full-stack developer. I design and ship real-world web apps with PHP, MySQL and JavaScript — clean, responsive, built to perform.',
  available: 'Available for full-stack & web developer roles',
}

export const STATS = [
  { value: 12, suffix: '+', label: 'Months Experience', icon: 'calendar' },
  { value: 3, suffix: '', label: 'Internships & Training', icon: 'briefcase' },
  { value: 4, suffix: '', label: 'Certifications', icon: 'award' },
  { value: 20, suffix: '+', label: 'Technologies', icon: 'code' },
]

export const SKILL_GROUPS = [
  {
    title: 'Frontend',
    skills: [
      { name: 'JavaScript', level: 85, icon: 'javascript' },
      { name: 'HTML5', level: 95, icon: 'html' },
      { name: 'CSS3', level: 90, icon: 'css' },
      { name: 'Bootstrap', level: 92, icon: 'bootstrap' },
      { name: 'Responsive Design', level: 90, icon: 'responsive' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'PHP', level: 88, icon: 'php' },
      { name: 'AJAX', level: 82, icon: 'ajax' },
      { name: 'WordPress', level: 82, icon: 'wordpress' },
      { name: 'SEO', level: 78, icon: 'seo' },
      { name: 'Drag & Drop Builders', level: 85, icon: 'builder' },
    ],
  },
  {
    title: 'Database & Tools',
    skills: [
      { name: 'MySQL', level: 85, icon: 'mysql' },
      { name: 'Git & GitHub', level: 80, icon: 'git' },
      { name: 'VS Code', level: 90, icon: 'vscode' },
      { name: 'Canva', level: 75, icon: 'canva' },
    ],
  },
  {
    title: 'Business & Office',
    skills: [
      { name: 'MS Word', level: 88, icon: 'word' },
      { name: 'MS Excel', level: 85, icon: 'excel' },
      { name: 'PowerPoint', level: 80, icon: 'ppt' },
      { name: 'Tally (Accounts)', level: 80, icon: 'tally' },
      { name: 'Data Entry', level: 90, icon: 'keyboard' },
    ],
  },
  {
    title: 'Digital Marketing',
    skills: [
      { name: 'Marketing Analytics', level: 70, icon: 'analytics' },
      { name: 'SMM', level: 80, icon: 'smm' },
    ],
  },
  {
    title: 'Soft Skills',
    skills: [
      { name: 'Communication', level: 85, icon: 'communication' },
      { name: 'Teamwork', level: 90, icon: 'teamwork' },
      { name: 'Problem-Solving', level: 80, icon: 'problem' },
      { name: 'Adaptability', level: 85, icon: 'adaptability' },
      { name: 'Time Management', level: 88, icon: 'time' },
    ],
  },
]

export const PROJECT_FILTERS = ['All', 'PHP', 'MySQL', 'JavaScript', 'WordPress', 'Conference']

export const PROJECTS = [
  {
    id: 1,
    number: '01',
    title: 'Inventory Stock Management System',
    tag: 'Full-Stack · Internship Project',
    description:
      'Designed and built a full-stack web application to eliminate manual stock-tracking errors and provide real-time visibility into inventory. Implemented role-based authentication, optimized MySQL queries/indexing (~40% faster page loads), and integrated AJAX calls for live updates without refreshes.',
    tech: ['PHP', 'MySQL', 'AJAX', 'Bootstrap'],
    filters: ['PHP', 'MySQL', 'JavaScript'],
    github: 'https://github.com/KulveerSingh60/Inventory-Stock-MAnagement-System',
    features: ['Role-based authentication', 'Real-time inventory visibility', 'Optimized MySQL indexing', 'Live AJAX updates without refresh'],
    visual: 'inventory',
  },
  {
    id: 2,
    number: '02',
    title: 'Full-Stack Web Development',
    tag: 'Internship · 6 Months',
    description:
      'At Sortiq Solution, developed end-to-end web applications with PHP, MySQL, HTML5, CSS3, Bootstrap, and JavaScript. Participated across the full SDLC including database modelling and QA testing.',
    tech: ['PHP', 'JavaScript', 'HTML5', 'CSS3'],
    filters: ['PHP', 'JavaScript'],
    github: LINKS.projects,
    features: ['End-to-end web apps', 'Database modelling', 'QA testing', 'Full SDLC participation'],
    visual: 'laptop',
  },
  {
    id: 3,
    number: '03',
    title: 'Digital Marketing · GreenBasket',
    tag: 'Training · 45 Days',
    description:
      'At Softwiz Pvt. Ltd., applied SEO, social media marketing, and paid-advertising strategies on live campaigns, analysed performance metrics, and prepared engagement reports. Built GreenBasket, a WordPress website, as part of the internship.',
    tech: ['WordPress', 'SEO', 'SMM', 'Analytics'],
    filters: ['WordPress'],
    github: LINKS.github,
    features: ['Live campaign management', 'SEO & paid advertising', 'Performance analytics', 'WordPress site build'],
    visual: 'marketing',
  },
  {
    id: 4,
    number: '04',
    title: 'ICIAI-2025 Participation',
    tag: 'Conference · April 25–26, 2025',
    description:
      'Participated in the International Conference on Innovations and Applications of AI at Guru Kashi University. Gained key knowledge on advanced AI trends, research frameworks, and modern AI implementations.',
    tech: ['AI Innovations', 'Conference', 'GKU'],
    filters: ['Conference'],
    github: LINKS.github,
    features: ['AI trends & research', 'Innovation frameworks', 'Modern AI implementations', 'University conference'],
    visual: 'conference',
  },
]

export const EXPERIENCE = [
  {
    type: 'work',
    duration: 'May 2024 – Apr 2025',
    role: 'Computer Operator & Billing Executive',
    company: 'Brar Agro Implements',
    description:
      'Handled billing operations, invoice generation, and daily data entry tasks. Maintained customer records, inventory records, and transaction reports.',
  },
  {
    type: 'work',
    duration: '6 Months',
    role: 'Full-Stack Web Developer Intern',
    company: 'Sortiq Solution',
    description:
      'Developed end-to-end web applications using PHP, MySQL, HTML5, CSS3, Bootstrap, and JavaScript. Delivered the Inventory Stock Management System as the lead developer across the full SDLC.',
  },
  {
    type: 'work',
    duration: '45 Days',
    role: 'Digital Marketing Trainee',
    company: 'Softwiz Pvt. Ltd., Bathinda',
    description:
      'Applied SEO, social media marketing, and paid advertising strategies on live campaigns. Analysed campaign performance metrics and prepared weekly reports.',
  },
  {
    type: 'work',
    duration: '6 Months',
    role: 'Computer Fundamentals & Accounts',
    company: 'Digital Institute, Gidderbaha',
    description:
      'Mastered MS Office Suite (Word, Excel, PowerPoint) and Tally accounting software. Developed strong data entry, documentation, and spreadsheet management skills.',
  },
  {
    type: 'education',
    duration: '2023 – 2026',
    role: 'Bachelor of Computer Applications (BCA)',
    company: 'Guru Kashi University',
    location: 'Talwandi Sabo, Punjab, India',
    description:
      'Focused on core computer applications, databases, programming languages, web development, and database systems. Committed to continuous learning.',
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
  { title: 'International Conference', issuer: 'Guru Kashi University', duration: 'Participant' },
]

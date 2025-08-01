import githubIcon from '../assets/Github.png';
import linkedinIcon from '../assets/LinkedIn_logo_initials.png';

export const PERSONAL_INFO = {
  name: "Wilson Huang",
  location: "New York, NY",
  email: "whuang88@binghamton.edu",
  status: "Open to opportunities"
};

export const NAVIGATION_ITEMS = [
  { id: 'about', label: 'About Me' },
  { id: 'skills', label: 'Tech Stack' },
  { id: 'contact', label: 'Connect' }
];

export const SKILLS = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    items: [
      'React.js',
      'TypeScript',
      'JavaScript',
      'HTML5/CSS3',
      'Redux',
      'Responsive Design',
      'Material-UI',
      'Figma / Photoshop'
    ]
  },
  {
    id: 'backend',
    title: 'Backend Development',
    items: [
      'Node.js',
      'Python',
      'Java',
      'C/C++',
      'RESTful APIs',
      'GraphQL',
      'Express.js',
      'MongoDB'
    ]
  },
  {
    id: 'devops',
    title: 'DevOps & Tools',
    items: [
      'Git/GitHub',
      'Docker',
      'AWS',
      'CI/CD',
      'Linux/Unix',
    ]
  },
  {
    id: 'security',
    title: 'Security & Best Practices',
    items: [
      'OWASP Top 10',
      'OAuth/JWT',
      'SSL/TLS',
      'Penetration Testing',
      'Code Review',
      'Security Auditing',
      'Encryption',
      'Authentication'
    ]
  }
];

export const SOCIAL_LINKS = [
  {
    id: 'github',
    url: 'https://github.com/whuang0',
    icon: githubIcon,
    label: 'GitHub'
  },
  {
    id: 'linkedin',
    url: 'https://linkedin.com/in/whuang0',
    icon: linkedinIcon,
    label: 'LinkedIn'
  }
]; 
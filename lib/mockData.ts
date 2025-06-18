import type { Candidate, CalendarEvent } from './types';

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Marie Dubois',
    position: 'Développeuse Full Stack',
    email: 'marie.dubois@email.com',
    phone: '+33 1 23 45 67 89',
    location: 'Paris, France',
    status: 'screened',
    appliedDate: '2024-01-15',
    score: 92,
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'],
    summary: 'Développeuse passionnée avec 5 ans d\'expérience dans le développement d\'applications web modernes. Expertise en React et Node.js.',
    experiences: [
      {
        id: '1',
        title: 'Senior Full Stack Developer',
        company: 'TechCorp',
        startDate: '2022-01-01',
        endDate: '2024-01-01',
        description: 'Développement d\'applications web complexes, encadrement d\'équipe de 3 développeurs junior.',
        current: false
      },
      {
        id: '2',
        title: 'Full Stack Developer',
        company: 'StartupXYZ',
        startDate: '2019-06-01',
        endDate: '2021-12-31',
        description: 'Création d\'une plateforme e-commerce de A à Z, gestion de la stack technique complète.',
        current: false
      }
    ],
    certifications: [
      {
        id: '1',
        name: 'AWS Certified Solutions Architect',
        organization: 'Amazon Web Services',
        date: '2023-03-15',
        expiryDate: '2026-03-15',
        credentialId: 'AWS-CSA-2023-001'
      },
      {
        id: '2',
        name: 'React Advanced Certification',
        organization: 'Meta',
        date: '2022-11-20',
        credentialId: 'META-REACT-2022-456'
      }
    ],
    languages: [
      { id: '1', name: 'Français', level: 'Natif' },
      { id: '2', name: 'Anglais', level: 'Courant' },
      { id: '3', name: 'Espagnol', level: 'Intermédiaire' }
    ]
  },
  {
    id: '2',
    name: 'Thomas Martin',
    position: 'Designer UX/UI',
    email: 'thomas.martin@email.com',
    phone: '+33 6 78 90 12 34',
    location: 'Lyon, France',
    status: 'scheduled',
    appliedDate: '2024-01-20',
    score: 88,
    interviewDate: '2024-02-15T14:00:00',
    skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Design Systems'],
    summary: 'Designer UX/UI créatif avec une approche centrée utilisateur et 4 ans d\'expérience en agence et startup.',
    experiences: [
      {
        id: '3',
        title: 'Senior UX Designer',
        company: 'Design Studio',
        startDate: '2021-03-01',
        description: 'Direction créative de projets UX/UI pour des clients Fortune 500.',
        current: true
      },
      {
        id: '4',
        title: 'UX Designer',
        company: 'Digital Agency',
        startDate: '2020-01-01',
        endDate: '2021-02-28',
        description: 'Conception d\'interfaces utilisateur pour applications mobiles et web.',
        current: false
      }
    ],
    certifications: [
      {
        id: '3',
        name: 'Google UX Design Certificate',
        organization: 'Google',
        date: '2021-08-10',
        credentialId: 'GOOGLE-UX-2021-789'
      }
    ],
    languages: [
      { id: '4', name: 'Français', level: 'Natif' },
      { id: '5', name: 'Anglais', level: 'Avancé' }
    ]
  },
  {
    id: '3',
    name: 'Sophie Chen',
    position: 'Data Scientist',
    email: 'sophie.chen@email.com',
    phone: '+33 7 89 01 23 45',
    location: 'Toulouse, France',
    status: 'hired',
    appliedDate: '2023-12-10',
    score: 95,
    hireDate: '2024-01-08',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'R', 'Tableau'],
    summary: 'Data Scientist experte en machine learning avec un PhD en informatique et 6 ans d\'expérience en analyse de données.',
    experiences: [
      {
        id: '5',
        title: 'Senior Data Scientist',
        company: 'AI Research Lab',
        startDate: '2020-09-01',
        endDate: '2023-12-31',
        description: 'Développement d\'algorithmes de machine learning pour l\'analyse prédictive.',
        current: false
      },
      {
        id: '6',
        title: 'Data Analyst',
        company: 'Analytics Corp',
        startDate: '2018-01-01',
        endDate: '2020-08-31',
        description: 'Analyse de données massives et création de dashboards interactifs.',
        current: false
      }
    ],
    certifications: [
      {
        id: '4',
        name: 'TensorFlow Developer Certificate',
        organization: 'Google',
        date: '2022-05-20',
        credentialId: 'TF-DEV-2022-123'
      },
      {
        id: '5',
        name: 'AWS Machine Learning Specialty',
        organization: 'Amazon Web Services',
        date: '2023-01-15',
        expiryDate: '2026-01-15',
        credentialId: 'AWS-MLS-2023-456'
      }
    ],
    languages: [
      { id: '6', name: 'Français', level: 'Courant' },
      { id: '7', name: 'Anglais', level: 'Natif' },
      { id: '8', name: 'Mandarin', level: 'Natif' }
    ]
  },
  {
    id: '4',
    name: 'Pierre Lefebvre',
    position: 'Chef de Projet Digital',
    email: 'pierre.lefebvre@email.com',
    phone: '+33 6 12 34 56 78',
    location: 'Marseille, France',
    status: 'dismissed',
    appliedDate: '2024-01-05',
    score: 65,
    dismissalDate: '2024-01-25',
    dismissalReason: 'Expérience insuffisante en gestion d\'équipe',
    skills: ['Gestion de projet', 'Scrum', 'Jira', 'Confluence', 'Budget'],
    summary: 'Chef de projet avec 3 ans d\'expérience cherchant à évoluer vers des responsabilités plus importantes.',
    experiences: [
      {
        id: '7',
        title: 'Chef de Projet Junior',
        company: 'Digital Solutions',
        startDate: '2021-09-01',
        description: 'Gestion de projets web pour PME, coordination d\'équipes de 5 personnes.',
        current: true
      }
    ],
    certifications: [
      {
        id: '6',
        name: 'Scrum Master Certified',
        organization: 'Scrum Alliance',
        date: '2022-03-10',
        expiryDate: '2025-03-10',
        credentialId: 'SM-2022-789'
      }
    ],
    languages: [
      { id: '9', name: 'Français', level: 'Natif' },
      { id: '10', name: 'Anglais', level: 'Intermédiaire' }
    ]
  },
  {
    id: '5',
    name: 'Laura Rodriguez',
    position: 'Développeuse Frontend',
    email: 'laura.rodriguez@email.com',
    phone: '+33 7 56 78 90 12',
    location: 'Nice, France',
    status: 'screened',
    appliedDate: '2024-01-18',
    score: 85,
    skills: ['Vue.js', 'JavaScript', 'CSS', 'Sass', 'Webpack', 'Jest'],
    summary: 'Développeuse frontend spécialisée en Vue.js avec une passion pour l\'UX et les performances web.',
    experiences: [
      {
        id: '8',
        title: 'Frontend Developer',
        company: 'Web Agency',
        startDate: '2022-06-01',
        description: 'Développement d\'interfaces utilisateur responsives et accessibles.',
        current: true
      }
    ],
    certifications: [
      {
        id: '7',
        name: 'Vue.js Certification',
        organization: 'Vue School',
        date: '2023-09-15',
        credentialId: 'VUE-2023-001'
      }
    ],
    languages: [
      { id: '11', name: 'Français', level: 'Courant' },
      { id: '12', name: 'Espagnol', level: 'Natif' },
      { id: '13', name: 'Anglais', level: 'Avancé' }
    ]
  },
  {
    id: '6',
    name: 'Alex Johnson',
    position: 'DevOps Engineer',
    email: 'alex.johnson@email.com',
    phone: '+33 6 34 56 78 90',
    location: 'Bordeaux, France',
    status: 'scheduled',
    appliedDate: '2024-01-22',
    score: 90,
    interviewDate: '2024-02-20T10:30:00',
    skills: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Terraform', 'Python'],
    summary: 'Ingénieur DevOps avec expertise en automatisation et infrastructure cloud.',
    experiences: [
      {
        id: '9',
        title: 'DevOps Engineer',
        company: 'Cloud Solutions',
        startDate: '2021-01-01',
        description: 'Automatisation des déploiements et gestion d\'infrastructure cloud.',
        current: true
      }
    ],
    certifications: [
      {
        id: '8',
        name: 'Kubernetes Administrator',
        organization: 'CNCF',
        date: '2023-06-01',
        expiryDate: '2026-06-01',
        credentialId: 'CKA-2023-567'
      }
    ],
    languages: [
      { id: '14', name: 'Anglais', level: 'Natif' },
      { id: '15', name: 'Français', level: 'Courant' }
    ]
  }
];

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Entretien Thomas Martin',
    date: '2024-02-15',
    time: '14:00',
    duration: 60,
    type: 'interview',
    candidateId: '2'
  },
  {
    id: '2',
    title: 'Entretien Alex Johnson',
    date: '2024-02-20',
    time: '10:30',
    duration: 45,
    type: 'interview',
    candidateId: '6'
  },
  {
    id: '3',
    title: 'Réunion équipe RH',
    date: '2024-02-16',
    time: '09:00',
    duration: 90,
    type: 'meeting'
  },
  {
    id: '4',
    title: 'Call de suivi candidat',
    date: '2024-02-18',
    time: '15:30',
    duration: 30,
    type: 'call'
  }
];
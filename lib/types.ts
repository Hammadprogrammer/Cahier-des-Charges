export interface Candidate {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  location: string;
  status: 'screened' | 'scheduled' | 'hired' | 'dismissed';
  appliedDate: string;
  score?: number;
  interviewDate?: string;
  hireDate?: string;
  dismissalDate?: string;
  dismissalReason?: string;
  skills: string[];
  experiences: Experience[];
  certifications: Certification[];
  languages: Language[];
  avatar?: string;
  summary: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
  current: boolean;
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
}

export interface Language {
  id: string;
  name: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Courant' | 'Natif';
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  type: 'interview' | 'meeting' | 'call';
  candidateId?: string;
}
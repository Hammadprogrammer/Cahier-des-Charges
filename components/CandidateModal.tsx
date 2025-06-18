'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Download, 
  ExternalLink, 
  Briefcase, 
  Award, 
  Languages, 
  Star,
  Clock,
  Building,
  GraduationCap,
  X
} from 'lucide-react';
import type { Candidate } from '@/lib/types';
import NguyenCalendar from './NguyenCalendar';

interface CandidateModalProps {
  candidate: Candidate;
  isOpen: boolean;
  onClose: () => void;
}

export default function CandidateModal({ candidate, isOpen, onClose }: CandidateModalProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'screened': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-amber-100 text-amber-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'dismissed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'screened': return 'Présélectionné';
      case 'scheduled': return 'Entretien programmé';
      case 'hired': return 'Embauché';
      case 'dismissed': return 'Rejeté';
      default: return status;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Natif': return 'bg-green-100 text-green-800';
      case 'Courant': return 'bg-blue-100 text-blue-800';
      case 'Avancé': return 'bg-purple-100 text-purple-800';
      case 'Intermédiaire': return 'bg-amber-100 text-amber-800';
      case 'Débutant': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden p-0 m-2 sm:m-4">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="px-4 sm:px-6 py-3 sm:py-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute right-2 top-2 sm:right-4 sm:top-4 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0 pr-10 sm:pr-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                    {candidate.name}
                  </DialogTitle>
                  <p className="text-base sm:text-lg text-gray-600 font-medium truncate">{candidate.position}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 space-y-1 sm:space-y-0 text-xs sm:text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="truncate">{candidate.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span>{candidate.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span>{candidate.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end space-x-3">
                {candidate.score && (
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{candidate.score}%</div>
                    <div className="text-xs text-gray-500">Compatibilité</div>
                  </div>
                )}
                <Badge className={getStatusColor(candidate.status)}>
                  {getStatusLabel(candidate.status)}
                </Badge>
              </div>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsList className="w-full justify-start px-4 sm:px-6 py-2 bg-gray-50 border-b overflow-x-auto">
                <div className="flex space-x-1 min-w-max">
                  <TabsTrigger value="overview" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm whitespace-nowrap">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Aperçu</span>
                  </TabsTrigger>
                  <TabsTrigger value="experiences" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm whitespace-nowrap">
                    <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Expériences</span>
                  </TabsTrigger>
                  <TabsTrigger value="certifications" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm whitespace-nowrap">
                    <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Certifications & Autres</span>
                    <span className="sm:hidden">Certif.</span>
                  </TabsTrigger>
                  <TabsTrigger value="calendar" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm whitespace-nowrap">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Calendar</span>
                  </TabsTrigger>
                </div>
              </TabsList>

              <div className="flex-1 overflow-y-auto">
                <TabsContent value="overview" className="p-4 sm:p-6 space-y-4 sm:space-y-6 m-0">
                  {/* Summary */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                        <Star className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                        <span>Résumé professionnel</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{candidate.summary}</p>
                    </CardContent>
                  </Card>

                  {/* Skills */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                        <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                        <span>Compétences techniques</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="px-2 py-1 text-xs sm:text-sm">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Timeline */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                        <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                        <span>Chronologie</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                          <div className="w-3 h-3 bg-blue-600 rounded-full mt-1 flex-shrink-0"></div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 text-sm sm:text-base">Candidature reçue</p>
                            <p className="text-xs sm:text-sm text-gray-600">
                              {new Date(candidate.appliedDate).toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        
                        {candidate.interviewDate && (
                          <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg">
                            <div className="w-3 h-3 bg-amber-600 rounded-full mt-1 flex-shrink-0"></div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-900 text-sm sm:text-base">Entretien programmé</p>
                              <p className="text-xs sm:text-sm text-gray-600">
                                {new Date(candidate.interviewDate).toLocaleDateString('fr-FR', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {candidate.hireDate && (
                          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                            <div className="w-3 h-3 bg-green-600 rounded-full mt-1 flex-shrink-0"></div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-900 text-sm sm:text-base">Candidat embauché</p>
                              <p className="text-xs sm:text-sm text-gray-600">
                                {new Date(candidate.hireDate).toLocaleDateString('fr-FR', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {candidate.dismissalDate && (
                          <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                            <div className="w-3 h-3 bg-red-600 rounded-full mt-1 flex-shrink-0"></div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-900 text-sm sm:text-base">Candidature rejetée</p>
                              <p className="text-xs sm:text-sm text-gray-600">
                                {new Date(candidate.dismissalDate).toLocaleDateString('fr-FR', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                              {candidate.dismissalReason && (
                                <p className="text-xs sm:text-sm text-red-600 mt-1">
                                  Motif: {candidate.dismissalReason}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="experiences" className="p-4 sm:p-6 m-0">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Expériences professionnelles</h3>
                      <Button variant="outline" size="sm" className="self-start sm:self-auto">
                        <Download className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Télécharger CV</span>
                        <span className="sm:hidden">CV</span>
                      </Button>
                    </div>
                    
                    <div className="space-y-4 sm:space-y-6">
                      {candidate.experiences.map((experience, index) => (
                        <Card key={experience.id} className="border-l-4 border-l-blue-500">
                          <CardContent className="pt-4 sm:pt-6">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                              <div className="min-w-0 flex-1">
                                <h4 className="text-base sm:text-lg font-semibold text-gray-900">{experience.title}</h4>
                                <div className="flex items-center space-x-2 text-gray-600 mt-1">
                                  <Building className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                  <span className="font-medium text-sm sm:text-base">{experience.company}</span>
                                </div>
                              </div>
                              {experience.current && (
                                <Badge className="bg-green-100 text-green-800 self-start">En cours</Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                              <span>
                                {new Date(experience.startDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                                {' - '}
                                {experience.endDate 
                                  ? new Date(experience.endDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
                                  : 'Présent'
                                }
                              </span>
                            </div>
                            
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{experience.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="certifications" className="p-4 sm:p-6 m-0">
                  <div className="space-y-6 sm:space-y-8">
                    {/* Certifications */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                        <Award className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                        <span>Certifications</span>
                      </h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {candidate.certifications.map((cert) => (
                          <Card key={cert.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="pt-4 sm:pt-6">
                              <div className="space-y-3">
                                <div>
                                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{cert.name}</h4>
                                  <p className="text-gray-600 text-sm">{cert.organization}</p>
                                </div>
                                
                                <div className="space-y-2 text-xs sm:text-sm">
                                  <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Date d'obtention:</span>
                                    <span className="text-gray-900">
                                      {new Date(cert.date).toLocaleDateString('fr-FR')}
                                    </span>
                                  </div>
                                  
                                  {cert.expiryDate && (
                                    <div className="flex items-center justify-between">
                                      <span className="text-gray-500">Expire le:</span>
                                      <span className="text-gray-900">
                                        {new Date(cert.expiryDate).toLocaleDateString('fr-FR')}
                                      </span>
                                    </div>
                                  )}
                                  
                                  {cert.credentialId && (
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
                                      <span className="text-gray-500">ID:</span>
                                      <span className="text-gray-900 font-mono text-xs break-all">{cert.credentialId}</span>
                                    </div>
                                  )}
                                </div>
                                
                                <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">
                                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                                  Vérifier
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                        <Languages className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                        <span>Langues</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {candidate.languages.map((language) => (
                          <Card key={language.id}>
                            <CardContent className="pt-4 sm:pt-6 text-center">
                              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{language.name}</h4>
                              <Badge className={getLevelColor(language.level)}>
                                {language.level}
                              </Badge>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="calendar" className="p-4 sm:p-6 m-0">
                  <NguyenCalendar candidateId={candidate.id} candidateName={candidate.name} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
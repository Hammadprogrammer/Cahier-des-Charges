'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, Search, Filter, Star, Clock, CheckCircle, XCircle, MapPin, Mail, Phone, Download, Calendar, Menu } from 'lucide-react';
import CandidateModal from '@/components/CandidateModal';
import { mockCandidates } from '@/lib/mockData';
import type { Candidate } from '@/lib/types';

export default function RecruitmentPlatform() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [activeTab, setActiveTab] = useState('screened');

  const filteredCandidates = (status: string) => {
    return mockCandidates
      .filter(candidate => candidate.status === status)
      .filter(candidate => 
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'date') {
          return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
        } else if (sortBy === 'score') {
          return (b.score || 0) - (a.score || 0);
        }
        return a.name.localeCompare(b.name);
      });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'screened':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">Présélectionné</Badge>;
      case 'scheduled':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 text-xs">Entretien programmé</Badge>;
      case 'hired':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 text-xs">Embauché</Badge>;
      case 'dismissed':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 text-xs">Rejeté</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'screened':
        return <Star className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />;
      case 'scheduled':
        return <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600" />;
      case 'hired':
        return <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />;
      case 'dismissed':
        return <XCircle className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const CandidateCard = ({ candidate }: { candidate: Candidate }) => (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-0 shadow-md bg-white"
      onClick={() => setSelectedCandidate(candidate)}
    >
      <CardHeader className="pb-2 sm:pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-lg flex-shrink-0">
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-sm sm:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                {candidate.name}
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-600 font-medium truncate">{candidate.position}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            {getStatusIcon(candidate.status)}
            <div className="hidden sm:block">
              {getStatusBadge(candidate.status)}
            </div>
          </div>
        </div>
        {/* Mobile status badge */}
        <div className="sm:hidden mt-2">
          {getStatusBadge(candidate.status)}
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-2 sm:space-y-3">
        {candidate.score && (
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-gray-600">Score</span>
            <div className="flex items-center space-x-2">
              <div className="w-12 sm:w-20 h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                  style={{ width: `${candidate.score}%` }}
                />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-900">{candidate.score}%</span>
            </div>
          </div>
        )}
        
        {candidate.interviewDate && (
          <div className="flex items-start space-x-2 text-xs sm:text-sm text-gray-600">
            <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">
              Entretien le {new Date(candidate.interviewDate).toLocaleDateString('fr-FR', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 space-y-1 sm:space-y-0">
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{candidate.location}</span>
          </div>
          <span className="text-xs">
            {candidate.status === 'hired' ? 'Embauché le' : 
             candidate.status === 'dismissed' ? 'Rejeté le' : 'Candidature le'} {' '}
            {new Date(candidate.appliedDate).toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: '2-digit'
            })}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1 pt-1 sm:pt-2">
          {candidate.skills.slice(0, 2).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1">
              {skill}
            </Badge>
          ))}
          {candidate.skills.length > 2 && (
            <Badge variant="outline" className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1">
              +{candidate.skills.length - 2}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const EmptyState = ({ status }: { status: string }) => {
    const messages = {
      screened: "Aucun candidat présélectionné",
      scheduled: "Aucun entretien programmé",
      hired: "Aucun candidat embauché",
      dismissed: "Aucun candidat rejeté"
    };

    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4">
        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
          {getStatusIcon(status)}
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
          {messages[status as keyof typeof messages]}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 max-w-md">
          Les candidats apparaîtront ici une fois qu'ils auront atteint ce statut.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
            Plateforme de Recrutement
          </h1>
          <p className="text-sm sm:text-lg text-gray-600">
            Gérez vos candidats efficacement
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 sm:mb-8 bg-white p-4 sm:p-6 rounded-xl shadow-sm border-0">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par nom ou poste..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-0 bg-gray-50 focus:bg-white transition-colors text-sm sm:text-base"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48 border-0 bg-gray-50 text-sm">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Trier par..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date de candidature</SelectItem>
                  <SelectItem value="score">Score</SelectItem>
                  <SelectItem value="name">Nom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 sm:mb-8 bg-white shadow-sm border-0 p-1 h-auto gap-1 sm:gap-0">
            <TabsTrigger 
              value="screened" 
              className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 py-2 sm:py-3 px-2 sm:px-4 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-200 text-xs sm:text-sm"
            >
              <Star className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="font-medium hidden sm:inline">Présélectionnés</span>
              <span className="font-medium sm:hidden">Présél.</span>
              <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 px-1">
                {filteredCandidates('screened').length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="scheduled"
              className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 py-2 sm:py-3 px-2 sm:px-4 data-[state=active]:bg-amber-600 data-[state=active]:text-white transition-all duration-200 text-xs sm:text-sm"
            >
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="font-medium hidden sm:inline">Programmés</span>
              <span className="font-medium sm:hidden">Prog.</span>
              <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-800 px-1">
                {filteredCandidates('scheduled').length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="hired"
              className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 py-2 sm:py-3 px-2 sm:px-4 data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all duration-200 text-xs sm:text-sm"
            >
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="font-medium">Embauchés</span>
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 px-1">
                {filteredCandidates('hired').length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="dismissed"
              className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 py-2 sm:py-3 px-2 sm:px-4 data-[state=active]:bg-red-600 data-[state=active]:text-white transition-all duration-200 text-xs sm:text-sm"
            >
              <XCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="font-medium">Rejetés</span>
              <Badge variant="secondary" className="text-xs bg-red-100 text-red-800 px-1">
                {filteredCandidates('dismissed').length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          {['screened', 'scheduled', 'hired', 'dismissed'].map(status => (
            <TabsContent key={status} value={status} className="mt-0">
              {filteredCandidates(status).length === 0 ? (
                <EmptyState status={status} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredCandidates(status).map(candidate => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Candidate Modal */}
        {selectedCandidate && (
          <CandidateModal
            candidate={selectedCandidate}
            isOpen={!!selectedCandidate}
            onClose={() => setSelectedCandidate(null)}
          />
        )}
      </div>
    </div>
  );
}
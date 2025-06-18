'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Video, 
  Phone, 
  MapPin, 
  ChevronLeft, 
  ChevronRight,
  Users,
  Mail
} from 'lucide-react';
import { mockCalendarEvents } from '@/lib/mockData';
import type { CalendarEvent } from '@/lib/types';

interface NguyenCalendarProps {
  candidateId: string;
  candidateName: string;
}

export default function NguyenCalendar({ candidateId, candidateName }: NguyenCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(mockCalendarEvents);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<{
    title: string;
    date: string;
    time: string;
    duration: number;
    type: 'interview' | 'meeting' | 'call';
    notes: string;
  }>({
    title: '',
    date: '',
    time: '',
    duration: 60,
    type: 'interview',
    notes: ''
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setNewEvent(prev => ({
      ...prev,
      date: date.toISOString().split('T')[0],
      title: `Entretien ${candidateName}`
    }));
    setIsModalOpen(true);
  };

  const handleScheduleInterview = () => {
    const newCalendarEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      duration: newEvent.duration,
      type: newEvent.type,
      candidateId: candidateId
    };

    setEvents(prev => [...prev, newCalendarEvent]);
    setIsModalOpen(false);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      duration: 60,
      type: 'interview',
      notes: ''
    });
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'interview':
        return <Users className="h-2 w-2 sm:h-3 sm:w-3" />;
      case 'meeting':
        return <Video className="h-2 w-2 sm:h-3 sm:w-3" />;
      case 'call':
        return <Phone className="h-2 w-2 sm:h-3 sm:w-3" />;
      default:
        return <Calendar className="h-2 w-2 sm:h-3 sm:w-3" />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'interview':
        return 'bg-blue-100 text-blue-800';
      case 'meeting':
        return 'bg-green-100 text-green-800';
      case 'call':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center space-x-2">
          <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
          <span className="hidden sm:inline">Nguyen Calendar - Planification d'entretien</span>
          <span className="sm:hidden">Nguyen Calendar</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth('prev')}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth('next')}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-2 sm:mb-4">
                {dayNames.map(day => (
                  <div key={day} className="p-1 sm:p-2 text-center text-xs sm:text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
                {days.map((day, index) => {
                  if (!day) {
                    return <div key={index} className="p-1 sm:p-2 h-16 sm:h-24"></div>;
                  }
                  
                  const dayEvents = getEventsForDate(day);
                  const isToday = day.toDateString() === new Date().toDateString();
                  const isPast = day < new Date() && !isToday;
                  
                  return (
                    <div
                      key={index}
                      className={`p-1 sm:p-2 h-16 sm:h-24 border rounded-lg cursor-pointer transition-colors hover:bg-blue-50 ${
                        isToday ? 'bg-blue-100 border-blue-300' : 'border-gray-200'
                      } ${isPast ? 'bg-gray-50 text-gray-400' : ''}`}
                      onClick={() => !isPast && handleDateClick(day)}
                    >
                      <div className={`text-xs sm:text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : ''}`}>
                        {day.getDate()}
                      </div>
                      <div className="space-y-0.5 sm:space-y-1">
                        {dayEvents.slice(0, 1).map(event => (
                          <div
                            key={event.id}
                            className={`text-xs p-0.5 sm:p-1 rounded flex items-center space-x-0.5 sm:space-x-1 ${getEventTypeColor(event.type)}`}
                          >
                            {getEventTypeIcon(event.type)}
                            <span className="truncate text-xs">{event.time}</span>
                          </div>
                        ))}
                        {dayEvents.length > 1 && (
                          <div className="text-xs text-gray-500">
                            +{dayEvents.length - 1}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg flex items-center space-x-2">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <span>Prochains événements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 sm:space-y-3">
                {events
                  .filter(event => new Date(event.date) >= new Date())
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 5)
                  .map(event => (
                    <div key={event.id} className="p-2 sm:p-3 border rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between mb-1 sm:mb-2">
                        <h4 className="font-medium text-gray-900 text-xs sm:text-sm line-clamp-2">{event.title}</h4>
                        <Badge className={`${getEventTypeColor(event.type)} text-xs`} variant="secondary">
                          {event.type === 'interview' ? 'Entretien' : 
                           event.type === 'meeting' ? 'Réunion' : 'Appel'}
                        </Badge>
                      </div>
                      <div className="space-y-0.5 sm:space-y-1 text-xs text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-2 w-2 sm:h-3 sm:w-3" />
                          <span>{new Date(event.date).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit'
                          })}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-2 w-2 sm:h-3 sm:w-3" />
                          <span>{event.time} ({event.duration}min)</span>
                        </div>
                      </div>
                    </div>
                  ))}
                
                {events.filter(event => new Date(event.date) >= new Date()).length === 0 && (
                  <div className="text-center py-6 sm:py-8 text-gray-500">
                    <Calendar className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-xs sm:text-sm">Aucun événement programmé</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Schedule Interview Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-md mx-2 sm:mx-4">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">Programmer un entretien</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 block">
                Titre de l'entretien
              </label>
              <Input
                value={newEvent.title}
                onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Entretien technique avec..."
                className="text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 block">
                  Date
                </label>
                <Input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 block">
                  Heure
                </label>
                <Input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                  className="text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 block">
                  Durée (minutes)
                </label>
                <Select
                  value={newEvent.duration.toString()}
                  onValueChange={(value) => setNewEvent(prev => ({ ...prev, duration: parseInt(value) }))}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 heure</SelectItem>
                    <SelectItem value="90">1h30</SelectItem>
                    <SelectItem value="120">2 heures</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 block">
                  Type
                </label>
                <Select
                  value={newEvent.type}
                  onValueChange={(value: 'interview' | 'meeting' | 'call') => 
                    setNewEvent(prev => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="interview">Entretien</SelectItem>
                    <SelectItem value="meeting">Réunion</SelectItem>
                    <SelectItem value="call">Appel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 block">
                Notes (optionnel)
              </label>
              <Textarea
                value={newEvent.notes}
                onChange={(e) => setNewEvent(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Notes sur l'entretien..."
                rows={3}
                className="text-sm"
              />
            </div>

            <div className="flex items-center justify-end space-x-2 sm:space-x-3 pt-2 sm:pt-4">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                size="sm"
              >
                Annuler
              </Button>
              <Button
                onClick={handleScheduleInterview}
                disabled={!newEvent.title || !newEvent.date || !newEvent.time}
                size="sm"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Programmer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
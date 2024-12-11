import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventForm } from './EventForm';
import { EventList } from './EventList';
import { generateEventId } from '../lib/utils';
import { exportToJson, exportToCsv } from '../lib/export';
import { Button } from './ui/button';

export function Calendar() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dayGridMonth');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const storedEvents = localStorage.getItem('calendarEvents');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const handleDateSelect = (selectInfo) => {
    setSelectedEvent({
      start: selectInfo.startStr,
      end: selectInfo.endStr
    });
    setIsFormOpen(true);
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event.toPlainObject());
    setIsFormOpen(true);
  };

  const handleEventSubmit = (eventData) => {
    if (selectedEvent?.id) {
      setEvents(events.map(event => 
        event.id === selectedEvent.id 
          ? { ...eventData, id: selectedEvent.id }
          : event
      ));
    } else {
      setEvents([...events, { ...eventData, id: generateEventId() }]);
    }
    setSelectedEvent(null);
  };

  const handleEventDrop = (dropInfo) => {
    const { event } = dropInfo;
    setEvents(events.map(evt => 
      evt.id === event.id
        ? {
            ...evt,
            start: event.startStr,
            end: event.endStr
          }
        : evt
    ));
  };

  const handleExport = () => {
    const format = window.confirm('Click OK to export as JSON, or Cancel for CSV')
      ? 'json'
      : 'csv';

    const currentEvents = events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getFullYear() === currentDate.getFullYear();
    });

    if (format === 'json') {
      exportToJson(currentEvents);
    } else {
      exportToCsv(currentEvents);
    }
  };

  const getCurrentMonthEvents = () => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getFullYear() === currentDate.getFullYear();
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView={currentView}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={events}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          datesSet={(dateInfo) => {
            setCurrentDate(dateInfo.start);
            setCurrentView(dateInfo.view.type);
          }}
          height="auto"
        />
      </div>

      <EventList 
        events={getCurrentMonthEvents()} 
        onExport={handleExport}
      />

      <EventForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedEvent(null);
        }}
        onSubmit={handleEventSubmit}
        event={selectedEvent}
      />
    </div>
  );
}
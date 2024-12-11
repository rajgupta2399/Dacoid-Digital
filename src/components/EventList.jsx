import React from 'react';
import { format } from 'date-fns';
import { Button } from './ui/button';
import { Download } from 'lucide-react';

export function EventList({ events, onExport }) {
  const sortedEvents = [...events].sort((a, b) => new Date(a.start) - new Date(b.start));

  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Events This Month</h2>
        <Button onClick={onExport} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
      {sortedEvents.length === 0 ? (
        <p className="text-muted-foreground">No events scheduled for this month.</p>
      ) : (
        <div className="space-y-3">
          {sortedEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center p-3 rounded-md border"
              style={{ borderLeftColor: event.color, borderLeftWidth: '4px' }}
            >
              <div className="flex-1">
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(event.start), 'MMM d, yyyy h:mm a')} - 
                  {format(new Date(event.end), 'h:mm a')}
                </p>
                {event.description && (
                  <p className="text-sm mt-1">{event.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
# Event Calendar Application 

A modern, feature-rich calendar application built with React and FullCalendar.io. This application allows users to manage events with an intuitive interface and powerful features.

## 🌟 Features

- **Calendar Views**
  - Month, Week, and Day view options
  - Clean and modern UI using shadcn components
  - Visual distinction for weekends and current day

- **Event Management**
  - Create, edit, and delete events
  - Drag-and-drop event rescheduling
  - Color coding for different event types
  - Event details including title, time, description, and color

- **Data Management**
  - Persistent storage using localStorage
  - Export events to JSON or CSV format
  - Monthly event list view
  - Automatic handling of month transitions

- **User Interface**
  - Responsive design for all screen sizes
  - Clean and intuitive interface
  - Modal forms for event creation/editing
  - Monthly events summary

## 🚀 Live Demo

Visit the live application: [Event Calendar App](https://dulcet-zuccutto-38019a.netlify.app)

## 💻 Running Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the local server URL

## 🛠️ Built With

- React.js
- FullCalendar.io
- Tailwind CSS
- shadcn/ui Components
- Vite

## 📦 Key Dependencies

- @fullcalendar/react
- @fullcalendar/daygrid
- @fullcalendar/timegrid
- @fullcalendar/interaction
- date-fns
- Radix UI components
- Tailwind CSS

## 🔍 Project Structure

```
src/
├── components/
│   ├── Calendar.jsx       # Main calendar component
│   ├── EventForm.jsx      # Event creation/editing form
│   ├── EventList.jsx      # Monthly events list
│   └── ui/               # UI components
├── lib/
│   ├── export.js         # Export utilities
│   └── utils.js          # Helper functions
└── App.jsx               # Root component
```

## 🎨 Features in Detail

### Event Management
- Create events with title, start time, end time, description, and color
- Edit existing events by clicking on them
- Drag and drop events to reschedule
- Delete events through the edit modal

### Data Export
- Export monthly events to JSON format
- Export monthly events to CSV format
- Exported files include all event details

### Persistence
- All events are automatically saved to localStorage
- Events persist between page refreshes
- No backend required

## 📱 Responsive Design
The application is fully responsive and works well on:
- Desktop computers
- Tablets
- Mobile devices
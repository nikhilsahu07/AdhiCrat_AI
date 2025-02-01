// src > pages > Productivity > TaskReminder > TaskComponents >Calendar.jsx 

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  Typography, 
  Chip 
} from '@mui/material';

export default function Calendar({ 
  tasks, 
  googleEvents, 
  onTaskClick 
}) {
  const [events, setEvents] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const formattedEvents = [
      ...tasks.map(task => ({
        id: task.id,
        title: task.title,
        start: task.dueDate,
        color: task.completed ? 'gray' : 'blue',
        extendedProps: { 
          description: task.description,
          task: task
        }
      })),
      ...googleEvents.map(event => ({
        title: event.summary,
        start: event.start.dateTime || event.start.date,
        color: 'green',
        extendedProps: { description: event.description }
      }))
    ];
    setEvents(formattedEvents);
  }, [tasks, googleEvents]);

  const handleEventClick = (clickInfo) => {
    const task = clickInfo.event.extendedProps.task;
    if (task) {
      setSelectedTask(task);
    }
  };

  const handleCloseTaskDialog = () => {
    setSelectedTask(null);
  };

  return (
    <>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          height={600}
        />
      </div>

      {selectedTask && (
        <Dialog 
          open={!!selectedTask} 
          onClose={handleCloseTaskDialog}
        >
          <DialogTitle>
            {selectedTask.title}
            <Chip 
              label={selectedTask.completed ? 'Completed' : 'Pending'}
              color={selectedTask.completed ? 'default' : 'primary'}
              size="small"
              sx={{ ml: 2 }}
            />
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              <strong>Description:</strong> {selectedTask.description}
            </Typography>
            <Typography variant="body2">
              <strong>Due Date:</strong> {new Date(selectedTask.dueDate).toLocaleString()}
            </Typography>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
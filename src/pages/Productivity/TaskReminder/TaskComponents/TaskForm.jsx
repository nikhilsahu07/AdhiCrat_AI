// src > pages > Productivity > TaskReminder > TaskComponents > TaskForm.jsx >

import { useState, useEffect } from 'react';
import { 
  Button, 
  TextField, 
  Stack, 
  InputLabel,
  Box 
} from '@mui/material';
import ReactQuill from 'react-quill';
import { stripHtml } from 'string-strip-html'; // Recommended library for stripping HTML

export default function TaskForm({ addTask, accessToken }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  
  // New function to determine task status
  const determineTaskStatus = (dueDate) => {
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    const timeDiff = taskDueDate.getTime() - currentDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    if (daysDiff <= 0) return 'completed';  // Past due date
    
    // Calculate percentage of time left
    const totalDuration = (taskDueDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);
    const percentageLeft = (daysDiff / totalDuration) * 100;

    return percentageLeft <= 30 ? 'pending' : 'active';
  };

  const createCalendarEvent = async (task) => {
    // Ensure access token is available
    if (!accessToken) {
      console.warn('No Google access token available. Event will not be synced.');
      return null;
    }

    const event = {
      summary: task.title,
      description: stripHtml(task.description).result, // Strip HTML from description
      start: { 
        dateTime: task.dueDate, 
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone 
      },
      end: { 
        dateTime: task.dueDate, 
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone 
      },
      reminders: { useDefault: true },
    };

    try {
      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      const data = await response.json();
      return data.id; // Return Google Calendar event ID
    } catch (error) {
      console.error('Calendar event creation failed:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !dueDate) return;

    const taskStatus = determineTaskStatus(dueDate);
    
    const calendarEventId = await createCalendarEvent({
      title,
      description,
      dueDate: new Date(dueDate).toISOString(),
    });

    addTask({
      title,
      description: stripHtml(description).result, // Store description as plain text
      dueDate,
      calendarEventId,
      status: taskStatus, // Use new status determination
      completed: taskStatus === 'completed'
    });

    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  // Enhance date input to be more interactive
  useEffect(() => {
    const dueDateInput = document.getElementById('due-date-input');
    if (dueDateInput) {
      dueDateInput.addEventListener('click', () => {
        dueDateInput.showPicker();
      });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <Stack spacing={2}>
        <TextField 
          label="Task Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          fullWidth 
        />

        <Box>
          <InputLabel>Description</InputLabel>
          <ReactQuill 
            value={description} 
            onChange={setDescription} 
            placeholder="Enter task details..."
          />
        </Box>

        <TextField 
          id="due-date-input"  // Add ID for interactive picking
          label="Due Date" 
          type="datetime-local" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
          InputLabelProps={{ shrink: true }} 
          required 
          fullWidth
        />

        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
        >
          Add Task
        </Button>
      </Stack>
    </form>
  );
}
// src > pages > Productivity > TaskReminder > TaskReminder.jsx >

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Button, 
  Container, 
  Typography, 
  Stack, 
  ThemeProvider, 
  createTheme,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import TaskForm from './TaskComponents/TaskForm';
import Calendar from './TaskComponents/Calendar';
import TaskList from './TaskComponents/TaskList';
import { useGoogleLogin } from '@react-oauth/google';

// Custom Modern Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
      light: '#7986cb',
      dark: '#303f9f'
    },
    background: {
      default: '#f4f6f9',
      paper: '#ffffff'
    },
    text: {
      primary: '#2c3e50'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 600,
      color: '#2c3e50'
    }
  }
});

function TaskReminder() {
  const LOCAL_STORAGE_KEY = 'task-reminder-app';

  // Notification States
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Confirmation Dialog State
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    taskId: null,
    taskTitle: ''
  });

  // State Management
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [view, setView] = useState('calendar');
  const [accessToken, setAccessToken] = useState('');
  const [googleUser, setGoogleUser] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);

  // Update Local Storage and Show Notification
  const updateTasksWithNotification = useCallback((newTasks, message, severity = 'success') => {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
    
    // Show Snackbar Notification
    setSnackbar({
      open: true,
      message,
      severity
    });
  }, []);

  // Close Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  // Add Task with Notification
  const addTask = (newTask) => {
    const taskWithId = { 
      ...newTask, 
      id: Date.now(), 
      completed: false 
    };
    
    updateTasksWithNotification(
      [...tasks, taskWithId], 
      `🎉 Task "${newTask.title}" added successfully!`
    );
  };

  // Delete Task Confirmation
  const handleDeleteTask = (taskId) => {
    const taskToDelete = tasks.find(task => task.id === taskId);
    
    if (taskToDelete) {
      setConfirmDialog({
        open: true,
        taskId: taskId,
        taskTitle: taskToDelete.title
      });
    }
  };

  // Confirm Delete Task
  const confirmDeleteTask = async () => {
    const { taskId } = confirmDialog;
    const taskToDelete = tasks.find(task => task.id === taskId);
    
    if (!taskToDelete) {
      setSnackbar({
        open: true,
        message: 'Task not found!',
        severity: 'error'
      });
      return;
    }

    const updatedTasks = tasks.filter(task => task.id !== taskId);

    // If Google account is connected, attempt to delete from Google Calendar
    if (accessToken && googleUser && taskToDelete.calendarEventId) {
      try {
        await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${taskToDelete.calendarEventId}`, {
          method: 'DELETE',
          headers: { 
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        console.error('Failed to delete Google Calendar event:', error);
      }
    }

    // Close confirmation dialog
    setConfirmDialog({ open: false, taskId: null, taskTitle: '' });

    // Update tasks with notification
    updateTasksWithNotification(
      updatedTasks, 
      `🗑️ Task "${taskToDelete.title}" deleted successfully!`,
      'info'
    );
  };

  // Cancel Delete Task
  const cancelDeleteTask = () => {
    setConfirmDialog({ open: false, taskId: null, taskTitle: '' });
  };

  // Toggle Task Completion
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed } 
        : task
    );

    const toggledTask = tasks.find(task => task.id === taskId);
    const completionStatus = toggledTask.completed ? 'completed' : 'marked as active';

    updateTasksWithNotification(
      updatedTasks, 
      `✅ Task "${toggledTask.title}" ${completionStatus}!`,
      'success'
    );
  };

  // Google Login and Event Fetching Methods (Keep previous implementation)
  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar.events',
    onSuccess: async (tokenResponse) => {
      setAccessToken(tokenResponse.access_token);
      await fetchGoogleUser(tokenResponse.access_token);
      await fetchGoogleCalendarEvents(tokenResponse.access_token);
    },
  });

  const fetchGoogleUser = async (token) => {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = await response.json();
      setGoogleUser(userData);
    } catch (error) {
      console.error('Error fetching Google user:', error);
    }
  };

  const fetchGoogleCalendarEvents = async (token) => {
    try {
      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setCalendarEvents(data.items || []);
    } catch (error) {
      console.error('Error fetching Google Calendar events:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ 
        backgroundColor: theme.palette.background.default, 
        minHeight: '100vh', 
        py: 4 
      }}>
        <Typography variant="h3" align="center" gutterBottom>
          Task Manager
        </Typography>

        {!googleUser ? (
          <Button 
            onClick={() => login()} 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mb: 2 }}
          >
            Sign Up for Notifications & Reminders
          </Button>
        ) : (
          <Typography variant="h6" align="center">
            Hello, {googleUser.name}!
          </Typography>
        )}

        <TaskForm 
          addTask={addTask} 
          accessToken={accessToken} 
        />

        <Stack 
          direction="row" 
          spacing={2} 
          justifyContent="center" 
          sx={{ my: 2 }}
        >
          <Button 
            variant={view === 'list' ? 'contained' : 'outlined'} 
            onClick={() => setView('list')}
          >
            Task List
          </Button>
          <Button 
            variant={view === 'calendar' ? 'contained' : 'outlined'} 
            onClick={() => setView('calendar')}
          >
            Calendar View
          </Button>
        </Stack>

        {view === 'calendar' ? (
          <Calendar 
            tasks={tasks} 
            googleEvents={calendarEvents} 
          />
        ) : (
          <TaskList 
            tasks={tasks} 
            onDelete={handleDeleteTask}
            onToggleComplete={toggleTaskCompletion}
          />
        )}

        {/* Snackbar Notification */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseSnackbar}
            severity={snackbar.severity} 
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={confirmDialog.open}
          onClose={cancelDeleteTask}
        >
          <DialogTitle>Confirm Task Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the task "{confirmDialog.taskTitle}"?
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDeleteTask} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDeleteTask} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}

export default TaskReminder;
// src > pages > Productivity > TaskReminder > TaskComponents > TaskList.jsx >

import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Checkbox, 
  IconButton, 
  Typography,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TaskList({ 
  tasks, 
  onDelete, 
  onToggleComplete 
}) {
  return (
    <Box sx={{ 
      backgroundColor: 'background.paper', 
      borderRadius: 2, 
      boxShadow: 1 
    }}>
      {tasks.length === 0 ? (
        <Typography 
          variant="body1" 
          color="textSecondary" 
          align="center" 
          sx={{ py: 2 }}
        >
          No tasks available. Add a new task!
        </Typography>
      ) : (
        <List>
          {tasks.map(task => (
            <ListItem 
              key={task.id} 
              dense 
              secondaryAction={
                <IconButton 
                  edge="end" 
                  onClick={() => onDelete(task.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
              sx={{
                textDecoration: task.completed ? 'line-through' : 'none',
                opacity: task.completed ? 0.5 : 1
              }}
            >
              <Checkbox
                checked={task.completed}
                onChange={() => onToggleComplete(task.id)}
              />
              <ListItemText 
                primary={task.title}
                secondary={`Due: ${new Date(task.dueDate).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
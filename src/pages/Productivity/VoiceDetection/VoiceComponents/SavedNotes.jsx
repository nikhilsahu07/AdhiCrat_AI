import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const SavedNotes = ({ savedNotes, handleDeleteNote }) => {
  if (!savedNotes.length) return null;

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Bookmarked Notes
      </Typography>
      <List>
        {savedNotes.map((note, index) => (
          <React.Fragment key={note.id}>
            {index > 0 && <Divider />}
            <ListItem>
              <ListItemText 
                primary={note.text}
                secondary={new Date(note.timestamp).toLocaleString()}
              />
              <ListItemSecondaryAction>
                <IconButton 
                  edge="end" 
                  aria-label="delete"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default SavedNotes;

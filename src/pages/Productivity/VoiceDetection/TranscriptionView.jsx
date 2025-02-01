// src/components/TranscriptionView.jsx

import React from 'react';
import { Paper, Box, Typography, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const TranscriptionView = ({ 
  transcription, 
  isEditing, 
  onEdit, 
  onEditComplete, 
  onChange 
}) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Original Transcription</Typography>
        {transcription && !isEditing && (
          <IconButton onClick={onEdit}>
            <EditIcon />
          </IconButton>
        )}
      </Box>
      {isEditing ? (
        <TextField
          fullWidth
          multiline
          value={transcription}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onEditComplete}
          autoFocus
        />
      ) : (
        <Typography variant="body1" color={transcription ? 'text.primary' : 'text.secondary'}>
          {transcription || 'Start speaking...'}
        </Typography>
      )}
    </Paper>
  );
};

export default TranscriptionView;
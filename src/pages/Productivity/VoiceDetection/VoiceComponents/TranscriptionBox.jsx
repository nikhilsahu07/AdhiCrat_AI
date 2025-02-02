import React from 'react';
import { Box, Paper, Typography, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const TranscriptionBox = ({ transcription, isEditing, setIsEditing, setTranscription }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Original Transcription</Typography>
        {transcription && !isEditing && (
          <IconButton onClick={() => setIsEditing(true)}>
            <EditIcon />
          </IconButton>
        )}
      </Box>
      {isEditing ? (
        <TextField
          fullWidth
          multiline
          value={transcription}
          onChange={(e) => setTranscription(e.target.value)}
          onBlur={() => setIsEditing(false)}
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

export default TranscriptionBox;

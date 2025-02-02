// TranscriptionBox.jsx
import React from 'react';
import { Box, Paper, Typography, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const TranscriptionBox = ({ transcription, isEditing, setIsEditing, setTranscription, onClear }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Original Transcription</Typography>
        <Box>
          {transcription && (
            <>
              <IconButton onClick={onClear} title="Clear transcription">
                <DeleteOutlineIcon />
              </IconButton>
              {!isEditing && (
                <IconButton onClick={() => setIsEditing(true)} title="Edit transcription">
                  <EditIcon />
                </IconButton>
              )}
            </>
          )}
        </Box>
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
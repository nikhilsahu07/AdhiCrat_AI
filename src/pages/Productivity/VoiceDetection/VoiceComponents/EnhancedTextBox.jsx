import React from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const EnhancedTextBox = ({ enhancedText, handleSaveNote }) => {
  if (!enhancedText) return null;

  return (
    <Paper variant='elevation' elevation={3} sx={{ p: 3, mb: 3}}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" gutterBottom>
          Enhanced Text
        </Typography>
        <IconButton
          color="primary"
          onClick={handleSaveNote}
          title="Bookmark this text"
        >
          <BookmarkIcon />
        </IconButton>
      </Box>
      <Typography variant="body1">{enhancedText}</Typography>
    </Paper>
  );
};

export default EnhancedTextBox;

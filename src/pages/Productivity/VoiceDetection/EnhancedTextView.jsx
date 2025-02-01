// src/components/EnhancedTextView.jsx

import React from 'react';
import { Paper, Box, Typography, IconButton } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const EnhancedTextView = ({ text, onSave }) => {
  if (!text) return null;

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: '#e3f2fd' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" gutterBottom>
          Enhanced Text
        </Typography>
        <IconButton
          color="primary"
          onClick={onSave}
          title="Bookmark this text"
        >
          <BookmarkIcon />
        </IconButton>
      </Box>
      <Typography variant="body1">{text}</Typography>
    </Paper>
  );
};

export default EnhancedTextView;
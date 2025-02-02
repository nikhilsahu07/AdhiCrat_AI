import React from 'react';
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip, CircularProgress } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

// Create pulsing animation
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled mic button component
const AnimatedMicButton = styled(IconButton)`
  &.active {
    animation: ${pulse} 1.5s ease-in-out infinite;
  }
`;

const ControlPanel = ({
  isListening,
  transcription,
  isLoading,
  writingStyle,
  toggleListening,
  setWritingStyle,
  handleTextProcessing,
  handleSaveNote,
  enhancedText
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
      <Tooltip title={isListening ? "Stop Listening" : "Start Listening"}>
        <AnimatedMicButton 
          color={isListening ? "error" : "primary"} 
          onClick={toggleListening}
          size="large"
          className={isListening ? 'active' : ''}
        >
          <MicIcon fontSize="large" />
        </AnimatedMicButton>
      </Tooltip>

      {transcription && (
        <>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Style</InputLabel>
            <Select
              value={writingStyle}
              onChange={(e) => setWritingStyle(e.target.value)}
              label="Style"
            >
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="academic">Academic</MenuItem>
              <MenuItem value="creative">Creative</MenuItem>
            </Select>
          </FormControl>

          <Button 
            variant="contained" 
            onClick={() => handleTextProcessing(false)}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : <AutoFixHighIcon />}
          >
            Enhance Text
          </Button>

          <Button
            variant="outlined"
            onClick={() => handleTextProcessing(true)}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : <SpellcheckIcon />}
          >
            Fix Grammar
          </Button>

          <Tooltip title="Save Note">
            <IconButton
              color="primary"
              onClick={handleSaveNote}
              disabled={!transcription && !enhancedText}
            >
              <BookmarkIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
};

export default ControlPanel;
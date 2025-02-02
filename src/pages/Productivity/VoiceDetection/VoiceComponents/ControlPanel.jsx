import React from 'react';
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip, CircularProgress } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

// Create ripple animation
const ripple = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
`;

// Styled container for mic button with ripple effect
const AnimatedMicContainer = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: ${props => props.isListening ? '#ef5350' : '#1976d2'};
    opacity: 0;
    z-index: 0;
  }

  &.active::before {
    animation: ${ripple} 2s ease-out infinite;
  }

  &.active::after {
    animation: ${ripple} 2s ease-out 1s infinite;
  }

  .MuiIconButton-root {
    z-index: 1;
    background-color: white;
    position: relative;
    transition: all 0.3s ease;
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
      <AnimatedMicContainer isListening={isListening} className={isListening ? 'active' : ''}>
        <Tooltip title={isListening ? "Stop Listening" : "Start Listening"}>
          <IconButton 
            color={isListening ? "error" : "primary"} 
            onClick={toggleListening}
            size="large"
            sx={{
              width: '48px',
              height: '48px',
              '&:hover': {
                backgroundColor: 'white',
              }
            }}
          >
            <MicIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </AnimatedMicContainer>

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
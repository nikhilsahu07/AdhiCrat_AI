import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  CircularProgress,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

const processTextWithGemini = async (text, style, isGrammarOnly = false) => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey || apiKey.trim() === '') {
      throw new Error('Gemini API key is missing or invalid');
    }

    const prompt = isGrammarOnly
      ? `Only fix grammar and spelling errors in this text, making minimal changes: "${text}"`
      : `Enhance this text to be more ${style} in style, fixing any grammar or spelling errors while maintaining the original meaning. Keep the enhanced text no longer than 1.5x the original length: "${text}"`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;

  } catch (error) {
    console.error('Text processing error:', error);
    throw new Error('Failed to process text. Please check your API key.');
  }
};

function VoiceDictation() {
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [enhancedText, setEnhancedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [writingStyle, setWritingStyle] = useState('professional');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isEditing, setIsEditing] = useState(false);
  const [savedNotes, setSavedNotes] = useState([]);
  
  const recognitionRef = useRef(null);

  useEffect(() => {
    const loadSavedNotes = () => {
      const notes = JSON.parse(localStorage.getItem('voiceNotes') || '[]');
      setSavedNotes(notes);
    };
    loadSavedNotes();
  }, []);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscription(finalTranscript || interimTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        showSnackbar('Speech recognition error. Please try again.', 'error');
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
  };

  const handleTextProcessing = async (isGrammarOnly = false) => {
    if (!transcription.trim()) {
      showSnackbar('Please record some text first.', 'warning');
      return;
    }

    stopListening();
    setIsLoading(true);
    
    try {
      const processedText = await processTextWithGemini(transcription, writingStyle, isGrammarOnly);
      setEnhancedText(processedText);
      showSnackbar(`Text ${isGrammarOnly ? 'grammar corrected' : 'enhanced'} successfully!`, 'success');
    } catch (error) {
      console.error('Processing failed:', error);
      showSnackbar('Failed to process text. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNote = () => {
    try {
      const textToSave = enhancedText || transcription;
      if (!textToSave.trim()) {
        showSnackbar('Nothing to save!', 'warning');
        return;
      }
      
      const newNote = {
        id: Date.now(),
        text: textToSave,
        timestamp: new Date().toISOString()
      };
      
      const updatedNotes = [...savedNotes, newNote];
      setSavedNotes(updatedNotes);
      localStorage.setItem('voiceNotes', JSON.stringify(updatedNotes));
      
      showSnackbar('Note saved successfully!', 'success');
    } catch (error) {
      console.error('Failed to save note:', error);
      showSnackbar('Failed to save note.', 'error');
    }
  };

  const handleDeleteNote = (noteId) => {
    try {
      const updatedNotes = savedNotes.filter(note => note.id !== noteId);
      setSavedNotes(updatedNotes);
      localStorage.setItem('voiceNotes', JSON.stringify(updatedNotes));
      showSnackbar('Note deleted successfully!', 'success');
    } catch (error) {
      console.error('Failed to delete note:', error);
      showSnackbar('Failed to delete note.', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', p: 3}}>
      <Typography variant="h4" gutterBottom align="center">
        AI-Powered Voice Dictation Assistant
      </Typography>

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

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
        <Tooltip title={isListening ? "Stop Listening" : "Start Listening"}>
          <IconButton 
            color={isListening ? "error" : "primary"} 
            onClick={toggleListening}
            size="large"
          >
            {isListening ? <MicOffIcon fontSize="large" /> : <MicIcon fontSize="large" />}
          </IconButton>
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

      {enhancedText && (
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
      )}

      {savedNotes.length > 0 && (
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
      )}

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default VoiceDictation;
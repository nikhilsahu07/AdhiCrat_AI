// File: pages/Productivity/VoiceDetection/VoiceDictation.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import TranscriptionBox from './VoiceComponents/TranscriptionBox';
import ControlPanel from './VoiceComponents/ControlPanel';
import EnhancedTextBox from './VoiceComponents/EnhancedTextBox';
import SavedNotes from './VoiceComponents/SavedNotes';
import { processTextWithGemini } from './services/geminiService';
import { loadSavedNotes, saveNote } from './services/notesService';
import { useSpeechRecognition } from './services/useSpeechRecognition';

function VoiceDictation() {
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [enhancedText, setEnhancedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [writingStyle, setWritingStyle] = useState('professional');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isEditing, setIsEditing] = useState(false);
  const [savedNotes, setSavedNotes] = useState([]);

  useEffect(() => {
    const notes = loadSavedNotes();
    setSavedNotes(notes);
  }, []);

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const recognitionRef = useSpeechRecognition(
    (text) => setTranscription(text),
    () => {
      setIsListening(false);
      showSnackbar('Speech recognition error. Please try again.', 'error');
    }
  );

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
      saveNote(updatedNotes);
      
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
      saveNote(updatedNotes);
      showSnackbar('Note deleted successfully!', 'success');
    } catch (error) {
      console.error('Failed to delete note:', error);
      showSnackbar('Failed to delete note.', 'error');
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', p: 3}}>
      <Typography variant="h4" gutterBottom align="center">
        AI-Powered Voice Dictation Assistant
      </Typography>

      <TranscriptionBox 
        transcription={transcription}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setTranscription={setTranscription}
      />

      <ControlPanel 
        isListening={isListening}
        transcription={transcription}
        isLoading={isLoading}
        writingStyle={writingStyle}
        toggleListening={toggleListening}
        setWritingStyle={setWritingStyle}
        handleTextProcessing={handleTextProcessing}
        handleSaveNote={handleSaveNote}
        enhancedText={enhancedText}
      />

      <EnhancedTextBox 
        enhancedText={enhancedText}
        handleSaveNote={handleSaveNote}
      />

      <SavedNotes 
        savedNotes={savedNotes}
        handleDeleteNote={handleDeleteNote}
      />

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
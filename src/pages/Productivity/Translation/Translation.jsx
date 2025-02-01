import React, { useState, useRef } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Box,
  Alert,
  CircularProgress,
  TextareaAutosize,
} from '@mui/material';
import {
  SwapVert,
  VolumeUp,
  VolumeOff,
  ContentCopy,
  Refresh,
  Translate
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.8)',
}));

// const TextArea = styled(TextField)(({ theme }) => ({
//   '& .MuiOutlinedInput-root': {
//     borderRadius: '12px',
//     backgroundColor: '#ffffff',
//     transition: 'all 0.3s ease',
//     '&:hover': {
//       backgroundColor: '#fafafa',
//     },
//     '&.Mui-focused': {
//       backgroundColor: '#ffffff',
//       boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
//     },
//   },
// }));

// const IconButton = styled(IconButton)(({ theme, isActive }) => ({
//   backgroundColor: isActive ? '#e3f2fd' : 'transparent',
//   '&:hover': {
//     backgroundColor: isActive ? '#bbdefb' : '#f5f5f5',
//   },
// }));

const Translation = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('hi');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSpeakingSource, setIsSpeakingSource] = useState(false);
  const [isSpeakingTarget, setIsSpeakingTarget] = useState(false);

  // Add refs for speech synthesis
  const sourceSpeechRef = useRef(null);
  const targetSpeechRef = useRef(null);

  const languages = [
    { code: 'hi', name: 'Hindi' },
    { code: 'en', name: 'English' }
  ];

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const translateText = async () => {
    if (!sourceText.trim()) {
      setError('Please enter text to translate');
      return;
    }
  
    setIsLoading(true);
    setError('');
  
    try {
      const endpoint = `https://translation.googleapis.com/language/translate/v2?key=${import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY}`;
  
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: sourceText,
          source: sourceLanguage,
          target: targetLanguage,
          format: 'text'
        })
      });
  
      const data = await response.json();
      setTranslatedText(data.data?.translations[0]?.translatedText || 'Translation failed');
    } catch (err) {
      setError('Translation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const toggleSpeech = (text, lang, isSource = true) => {
    const currentRef = isSource ? sourceSpeechRef : targetSpeechRef;
    const setIsSpeaking = isSource ? setIsSpeakingSource : setIsSpeakingTarget;
    
    // Stop current speech if any
    window.speechSynthesis.cancel();
    
    // If there was active speech, just stop it
    if ((isSource ? isSpeakingSource : isSpeakingTarget)) {
      setIsSpeaking(false);
      currentRef.current = null;
      return;
    }
    
    // Start new speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.onend = () => {
      setIsSpeaking(false);
      currentRef.current = null;
    };
    
    currentRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2, 
          mb: 3,
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Source Language</InputLabel>
            <Select
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
              label="Source Language"
            >
              {languages.map((lang) => (
                <MenuItem key={lang.code} value={lang.code}>
                  {lang.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <IconButton 
            onClick={swapLanguages}
            color="primary"
            sx={{ 
              // bgcolor: '#e3f2fd',
              boxShadow: 1,
              // '&:hover': { bgcolor: '#bbdefb' }
            }}
          >
            <SwapVert />
          </IconButton>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Target Language</InputLabel>
            <Select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              label="Target Language"
            >
              {languages.map((lang) => (
                <MenuItem key={lang.code} value={lang.code}>
                  {lang.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
          gap: 3,
          mb: 4 
        }}>
          <Box sx={{ position: 'relative' }}>
            <TextField
              fullWidth
              multiline
              rows={8}
              placeholder="Enter text to translate..."
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              variant="outlined"
            />
            <Box sx={{ position: 'absolute', bottom: 8, right: 8, display: 'flex', gap: 1 }}>
              <IconButton
                size="small"
                isActive={isSpeakingSource}
                onClick={() => toggleSpeech(sourceText, sourceLanguage, true)}
              >
                {isSpeakingSource ? <VolumeOff /> : <VolumeUp />}
              </IconButton>
              <IconButton
                size="small"
                onClick={() => copyToClipboard(sourceText)}
              >
                <ContentCopy />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ position: 'relative' }}>
            <TextField
              fullWidth
              multiline
              rows={8}
              placeholder="Translation will appear here..."
              value={translatedText}
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
            <Box sx={{ position: 'absolute', bottom: 8, right: 8, display: 'flex', gap: 1 }}>
              <IconButton
                size="small"
                isActive={isSpeakingTarget}
                onClick={() => toggleSpeech(translatedText, targetLanguage, false)}
              >
                {isSpeakingTarget ? <VolumeOff /> : <VolumeUp />}
              </IconButton>
              <IconButton
                size="small"
                onClick={() => copyToClipboard(translatedText)}
              >
                <ContentCopy />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={() => {
              setSourceText('');
              setTranslatedText('');
              window.speechSynthesis.cancel();
              setIsSpeakingSource(false);
              setIsSpeakingTarget(false);
            }}
            sx={{
              borderRadius: '8px',
              borderWidth: '2px',
              '&:hover': {
                borderWidth: '2px',
              }
            }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Translate />}
            onClick={translateText}
            disabled={isLoading}
            sx={{
              borderRadius: '8px',
              background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
              boxShadow: '0 3px 5px 2px rgba(25, 118, 210, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976d2 30%, #1565c0 90%)',
              }
            }}
          >
            {isLoading ? 'Translating...' : 'Translate'}
          </Button>
        </Box>
        </div>
  );
};

export default Translation;
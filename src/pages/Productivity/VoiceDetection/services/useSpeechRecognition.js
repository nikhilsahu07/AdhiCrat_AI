import { useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const useEnhancedSpeechRecognition = (options = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition({
    commands: options.commands || [],
    continuous: options.continuous ?? true,
    interimResults: options.interimResults ?? true,
  });

  const startListening = () => {
    try {
      setError(null);
      if (!browserSupportsSpeechRecognition) {
        throw new Error('Browser does not support speech recognition.');
      }
      if (!isMicrophoneAvailable) {
        throw new Error('Microphone permission is required.');
      }
      
      SpeechRecognition.startListening({
        continuous: options.continuous ?? true,
        language: options.language || 'en-US',
      });
      setIsListening(true);
      
      if (options.continuous) {
        timeoutRef.current = setInterval(() => {
          if (!listening && isListening) {
            SpeechRecognition.startListening({
              continuous: true,
              language: options.language || 'en-US',
            });
          }
        }, 300);
      }
    } catch (err) {
      setError(err.message);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  useEffect(() => {
    return () => {
      stopListening();
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, []);

  return {
    transcript,
    isListening,
    listening,
    startListening,
    stopListening,
    toggleListening,
    resetTranscript,
    error,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  };
};
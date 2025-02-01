// src/services/notesService.js

const STORAGE_KEY = 'voiceNotes';

export const loadNotes = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (error) {
    console.error('Failed to load notes:', error);
    return [];
  }
};

export const saveNote = (text) => {
  try {
    const notes = loadNotes();
    const newNote = {
      id: Date.now(),
      text,
      timestamp: new Date().toISOString()
    };
    
    const updatedNotes = [...notes, newNote];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
    return newNote;
  } catch (error) {
    console.error('Failed to save note:', error);
    throw new Error('Failed to save note');
  }
};

export const deleteNote = (noteId) => {
  try {
    const notes = loadNotes();
    const updatedNotes = notes.filter(note => note.id !== noteId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
  } catch (error) {
    console.error('Failed to delete note:', error);
    throw new Error('Failed to delete note');
  }
};
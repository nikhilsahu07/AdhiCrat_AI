export const loadSavedNotes = () => {
  return JSON.parse(localStorage.getItem('voiceNotes') || '[]');
};

export const saveNote = (notes) => {
  localStorage.setItem('voiceNotes', JSON.stringify(notes));
};
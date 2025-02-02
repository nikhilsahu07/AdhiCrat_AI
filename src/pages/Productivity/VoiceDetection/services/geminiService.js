// File: pages/Productivity/VoiceDetection/services/geminiService.js
export const processTextWithGemini = async (text, style, isGrammarOnly = false) => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey || apiKey.trim() === '') {
      throw new Error('Gemini API key is missing or invalid');
    }

    if (!text || text.trim() === '') {
      throw new Error('Input text is empty');
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
    
    // Check if the response has the expected structure
    if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid API response structure');
    }

    return data.candidates[0].content.parts[0].text;

  } catch (error) {
    console.error('Text processing error:', error);
    if (error.message.includes('API key')) {
      throw new Error('Failed to process text. Please check your API key.');
    } else if (error.message.includes('Invalid API response')) {
      throw new Error('Received invalid response from Gemini API. Please try again.');
    } else {
      throw new Error('Failed to process text. Please try again later.');
    }
  }
};
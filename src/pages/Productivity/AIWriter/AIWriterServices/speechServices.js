import CryptoJS from 'crypto-js';

export const generateSpeech = async ({ template, prompt, audience, duration, tabValue }) => {
  // Simulated API call - replace with actual Gemini API integration
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const selectedTemplate = TEMPLATES[tabValue === 0 ? "public" : "private"].find(
    (t) => t.id === template
  );

  const targetWordCount = duration * 130;

  // Generate prompt for AI
  const promptText = `
Create a ${speechDuration}-minute ${template.name.toLowerCase()} (approximately ${targetWordCount} words) for an audience of ${audience}. 

Topic: ${prompt}

Requirements:
1. Use formal bureaucratic language appropriate for government communications
2. Include proper salutations and protocol acknowledgments
3. Maintain professional tone throughout
4. Include clear policy references and procedural details where appropriate
5. End with actionable next steps or clear directives

Speech Structure:
1. Opening Protocol (formal greetings and acknowledgments)
2. Context Setting
3. Main Policy Points or Announcements
4. Implementation Details or Recommendations
5. Conclusion with Clear Directives

Additional Context: ${prompt}`

  // Return simulated response
  return `Simulated speech for ${template} about ${prompt}`;
};

export const saveSpeech = ({
  content,
  template,
  type,
  isProtected,
  password,
  duration,
  audience,
  topic,
  savedSpeeches,
}) => {
  const contentToSave = {
    id: Date.now(),
    content: isProtected ? encryptContent(content, password) : content,
    template,
    type,
    timestamp: new Date().toISOString(),
    isProtected,
    password,
    duration,
    audience,
    topic,
  };

  const updatedSpeeches = [...savedSpeeches, contentToSave];
  localStorage.setItem("bureaucraticSpeeches", JSON.stringify(updatedSpeeches));
  return updatedSpeeches;
};

export const loadSpeeches = () => {
  return JSON.parse(localStorage.getItem("bureaucraticSpeeches") || "[]");
};

export const deleteSpeech = (id, savedSpeeches) => {
  const updatedSpeeches = savedSpeeches.filter((speech) => speech.id !== id);
  localStorage.setItem("bureaucraticSpeeches", JSON.stringify(updatedSpeeches));
  return updatedSpeeches;
};

export const loadProtectedSpeech = (speech, passwordAttempt) => {
  try {
    const decryptedContent = decryptContent(speech.content, passwordAttempt);
    return {
      ...speech,
      content: decryptedContent,
    };
  } catch (error) {
    throw new Error("Incorrect password");
  }
};

const encryptContent = (content, password) => {
  return CryptoJS.AES.encrypt(content, password).toString();
};

const decryptContent = (encryptedContent, password) => {
  const bytes = CryptoJS.AES.decrypt(encryptedContent, password);
  return bytes.toString(CryptoJS.enc.Utf8);
};
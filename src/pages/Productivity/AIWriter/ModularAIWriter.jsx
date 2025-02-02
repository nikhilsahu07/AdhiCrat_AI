import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { AIWriterForm } from './AIWriterComponents/AIWriterForm';
import { SavedSpeeches } from './AIWriterComponents/SavedSpeeches';
import { generateSpeech, saveSpeech, loadSpeeches, deleteSpeech } from './AIWriterServices/speechServices';

const AIWriter = () => {
  const [content, setContent] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isProtected, setIsProtected] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [savedSpeeches, setSavedSpeeches] = useState([]);
  const [speechDuration, setSpeechDuration] = useState(10);
  const [audience, setAudience] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const speeches = loadSpeeches();
    setSavedSpeeches(speeches);
  }, []);

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    try {
      const generatedContent = await generateSpeech({
        template: selectedTemplate,
        prompt,
        audience,
        duration: speechDuration,
        tabValue
      });
      setContent(generatedContent);
      showNotification("Speech generated successfully!", "success");
    } catch (error) {
      showNotification("Failed to generate speech", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveContent = () => {
    try {
      const updatedSpeeches = saveSpeech({
        content,
        template: selectedTemplate,
        type: tabValue === 0 ? "public" : "private",
        isProtected,
        password,
        duration: speechDuration,
        audience,
        topic: prompt,
        savedSpeeches
      });
      setSavedSpeeches(updatedSpeeches);
      showNotification("Speech saved successfully!", "success");
    } catch (error) {
      showNotification("Failed to save speech", "error");
    }
  };

  const handleDeleteSpeech = (id) => {
    const updatedSpeeches = deleteSpeech(id, savedSpeeches);
    setSavedSpeeches(updatedSpeeches);
    showNotification("Speech deleted successfully!", "success");
  };

  const showNotification = (message, severity) => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  const formProps = {
    content,
    setContent,
    prompt,
    setPrompt,
    isGenerating,
    isProtected,
    setIsProtected,
    password,
    setPassword,
    selectedTemplate,
    setSelectedTemplate,
    tabValue,
    setTabValue,
    speechDuration,
    setSpeechDuration,
    audience,
    setAudience,
    onGenerate: handleGenerateContent,
    onSave: handleSaveContent,
    setDrawerOpen
  };

  const speechesProps = {
    drawerOpen,
    setDrawerOpen,
    savedSpeeches,
    onDelete: handleDeleteSpeech,
    formProps,
    notification,
    setNotification
  };

  return (
    <Container>
      <AIWriterForm {...formProps} />
      <SavedSpeeches {...speechesProps} />
    </Container>
  );
};

export default AIWriter;
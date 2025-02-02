import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  Slider,
  FormControlLabel,
  Checkbox,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import {
  CreateIcon,
  SaveIcon,
  LockIcon,
} from "@mui/icons-material";
import { TEMPLATES, AUDIENCE_TYPES } from '../AIWriterServices/constants';

export const AIWriterForm = ({
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
  onGenerate,
  onSave,
  setDrawerOpen,
}) => {
  const calculateWordsForDuration = (minutes) => minutes * 130;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSelectedTemplate("");
    setContent("");
    setPrompt("");
    setIsProtected(false);
    setPassword("");
  };

  return (
    <Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Public Addresses" />
            <Tab label="Internal Communications" />
          </Tabs>
        </Box>

        <Box sx={{ mb: 4 }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select Template</InputLabel>
            <Select
              value={selectedTemplate}
              label="Select Template"
              onChange={(e) => setSelectedTemplate(e.target.value)}
            >
              {templates[tabValue === 0 ? "public" : "private"].map(
                (template) => (
                  <MenuItem key={template.id} value={template.id}>
                    {template.name}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Target Audience</InputLabel>
            <Select
              value={audience}
              label="Target Audience"
              onChange={(e) => setAudience(e.target.value)}
            >
              {audienceTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Speech Duration (minutes)</Typography>
            <Slider
              value={speechDuration}
              onChange={(e, newValue) => setSpeechDuration(newValue)}
              min={5}
              max={60}
              step={5}
              marks
              valueLabelDisplay="auto"
            />
            <Typography variant="caption" color="text.secondary">
              Approximate word count:{" "}
              {calculateWordsForDuration(speechDuration)} words
            </Typography>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Topic and Key Points"
            variant="outlined"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            sx={{ mb: 3 }}
          />
        </Box>

        {tabValue === 1 && (
          <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isProtected}
                  onChange={(e) => setIsProtected(e.target.checked)}
                  icon={<LockIcon />}
                  checkedIcon={<LockIcon color="primary" />}
                />
              }
              label="Protect Speech"
            />
            {isProtected && (
              <TextField
                type="password"
                label="Set Password"
                variant="outlined"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ width: 200 }}
              />
            )}
          </Box>
        )}

        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <Button
            variant="contained"
            startIcon={
              isGenerating ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <CreateIcon />
              )
            }
            disabled={!selectedTemplate || !prompt || isGenerating || !audience}
            onClick={generateContent}
            sx={{ minWidth: 150 }}
          >
            {isGenerating ? "Generating..." : "Generate"}
          </Button>
          <Button
            variant="outlined"
            startIcon={<SaveIcon />}
            disabled={!content}
            onClick={handleSave}
            sx={{ minWidth: 150 }}
          >
            Save
          </Button>
        </Box>
        {content && (
          <Paper elevation={2} sx={{ p: 2}}>
            <TextField
              fullWidth
              multiline
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              variant="outlined"
              placeholder="Generated speech will appear here..."
            />
          </Paper>
        )}
      </Box>
  );
};
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Paper,
  Container,
  FormControl,
  InputLabel,
  CircularProgress,
  Snackbar,
  Alert,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Slider,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import SaveIcon from "@mui/icons-material/Save";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryIcon from "@mui/icons-material/History";

const AIWriter = () => {
  const [content, setContent] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isProtected, setIsProtected] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [savedSpeeches, setSavedSpeeches] = useState([]);
  const [speechDuration, setSpeechDuration] = useState(10);
  const [audience, setAudience] = useState("");
  const [passwordDialog, setPasswordDialog] = useState({
    open: false,
    speechToLoad: null,
    passwordAttempt: "",
  });

  const templates = {
    public: [
      {
        id: "policy_announcement",
        name: "Policy Announcement",
        prompt:
          "Create a formal policy announcement speech with clear directives and implementation guidelines",
      },
      {
        id: "public_address",
        name: "Public Address",
        prompt:
          "Generate an official public address focusing on government initiatives and public welfare",
      },
      {
        id: "inaugural_speech",
        name: "Inaugural Speech",
        prompt:
          "Develop an inaugural speech highlighting vision, objectives, and strategic plans",
      },
    ],
    private: [
      {
        id: "department_brief",
        name: "Departmental Briefing",
        prompt:
          "Create a comprehensive departmental briefing covering progress, challenges, and action items",
      },
      {
        id: "committee_address",
        name: "Committee Address",
        prompt:
          "Prepare a formal committee address discussing policy implications and recommendations",
      },
      {
        id: "executive_summary",
        name: "Executive Summary",
        prompt:
          "Generate an executive summary presentation with key findings and strategic recommendations",
      },
    ],
  };

  const audienceTypes = [
    { value: "ministers", label: "Cabinet Ministers" },
    { value: "secretaries", label: "Department Secretaries" },
    { value: "public", label: "General Public" },
    { value: "stakeholders", label: "Stakeholders" },
    { value: "committee", label: "Committee Members" },
    { value: "department", label: "Department Staff" },
  ];

  useEffect(() => {
    loadSavedSpeeches();
  }, []);

  const loadSavedSpeeches = () => {
    const speeches = JSON.parse(
      localStorage.getItem("bureaucraticSpeeches") || "[]"
    );
    setSavedSpeeches(speeches);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSelectedTemplate("");
    setContent("");
    setPrompt("");
    setIsProtected(false);
    setPassword("");
  };

  const calculateWordsForDuration = (minutes) => {
    // Average speaking pace: 130 words per minute
    return minutes * 130;
  };

  const generateContent = async () => {
    if (!selectedTemplate || !prompt || !audience) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    setIsGenerating(true);
    try {
      const template = [...templates.public, ...templates.private].find(
        (t) => t.id === selectedTemplate
      );

      const targetWordCount = calculateWordsForDuration(speechDuration);

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

Additional Context: ${prompt}`;

      // Simulated API call for demonstration
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulated response
      const simulatedContent = `
Honorable Colleagues and Distinguished Members of the Assembly,

[Formal Acknowledgments]
Respected Chairperson,
Distinguished Secretary of Department,
Esteemed Committee Members,
Ladies and Gentlemen,

It is my privilege to address this august gathering regarding ${prompt}. As we convene to deliberate on matters of significant administrative and policy importance, I draw your attention to the critical aspects that warrant our immediate consideration.

[Context and Background]
In accordance with Circular No. 27(B)/2024, and in pursuance of the strategic objectives outlined in our department's vision document, the matter of ${prompt} has emerged as a focal point requiring comprehensive administrative action and policy implementation.

[Key Policy Points]
1. Strategic Framework
   - Implementation of Phase-I initiatives as per Memorandum dated 15th January 2024
   - Establishment of inter-departmental coordination mechanism
   - Development of monitoring and evaluation protocols

2. Procedural Guidelines
   - Standard Operating Procedures (SOPs) in accordance with Section 12(A)
   - Compliance requirements under the revised regulatory framework
   - Timeline-based implementation matrix

3. Resource Allocation
   - Budgetary provisions under Head of Account 2024-25
   - Human resource deployment strategy
   - Infrastructure and technical requirements

[Implementation Roadmap]
The implementation shall proceed in accordance with the following timeline:
- Immediate Term (0-3 months): Initial framework establishment
- Medium Term (3-6 months): Pilot phase implementation
- Long Term (6-12 months): Full-scale deployment

[Monitoring Mechanism]
A robust monitoring mechanism shall be instituted, comprising:
1. Monthly progress review meetings
2. Quarterly audit of implementation metrics
3. Bi-annual impact assessment reports

[Conclusion and Directives]
In view of the above, all concerned departments and officials are hereby directed to:
1. Initialize the preliminary proceedings as per the prescribed format
2. Submit weekly progress reports through the integrated monitoring system
3. Ensure strict compliance with the stipulated timelines

The cooperation of all stakeholders is solicited for the successful implementation of these initiatives.

Thank you.

[Official Closing]
[Name]
[Designation]
[Department]
`;

      setContent(simulatedContent);
      showNotification("Speech generated successfully!", "success");
    } catch (error) {
      console.error("Error generating content:", error);
      showNotification("Failed to generate speech. Please try again.", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeleteSpeech = (id) => {
    const updatedSpeeches = savedSpeeches.filter((speech) => speech.id !== id);
    localStorage.setItem(
      "bureaucraticSpeeches",
      JSON.stringify(updatedSpeeches)
    );
    setSavedSpeeches(updatedSpeeches);
    showNotification("Speech deleted successfully!", "success");
  };

  const handleLoadSpeech = (speech) => {
    if (speech.isProtected) {
      setPasswordDialog({
        open: true,
        speechToLoad: speech,
        passwordAttempt: "",
      });
    } else {
      loadSpeechContent(speech);
    }
  };

  const loadSpeechContent = (speech) => {
    setContent(speech.content);
    setPrompt(speech.topic);
    setSelectedTemplate(speech.template);
    setSpeechDuration(speech.duration);
    setAudience(speech.audience);
    setTabValue(speech.type === "public" ? 0 : 1);
    setIsProtected(speech.isProtected);
    setPassword(speech.password || "");
    setDrawerOpen(false);
  };

  const handlePasswordSubmit = () => {
    const speech = passwordDialog.speechToLoad;
    if (speech && passwordDialog.passwordAttempt === speech.password) {
      loadSpeechContent(speech);
      setPasswordDialog({
        open: false,
        speechToLoad: null,
        passwordAttempt: "",
      });
    } else {
      showNotification("Incorrect password", "error");
    }
  };

  const handleSave = () => {
    if (isProtected && !password) {
      showNotification("Please set a password for protected content", "error");
      return;
    }

    try {
      const contentToSave = {
        id: Date.now(),
        content,
        template: selectedTemplate,
        type: tabValue === 0 ? "public" : "private",
        timestamp: new Date().toISOString(),
        isProtected,
        password,
        duration: speechDuration,
        audience,
        topic: prompt,
      };

      const updatedSpeeches = [...savedSpeeches];
      const existingIndex = updatedSpeeches.findIndex(
        (speech) =>
          speech.topic === prompt && speech.template === selectedTemplate
      );

      if (existingIndex !== -1) {
        // Update existing speech
        updatedSpeeches[existingIndex] = {
          ...updatedSpeeches[existingIndex],
          ...contentToSave,
          id: updatedSpeeches[existingIndex].id, // Preserve original ID
        };
      } else {
        // Add new speech
        updatedSpeeches.push(contentToSave);
      }

      localStorage.setItem(
        "bureaucraticSpeeches",
        JSON.stringify(updatedSpeeches)
      );
      setSavedSpeeches(updatedSpeeches);
      showNotification("Speech saved successfully!", "success");
    } catch (error) {
      console.error("Error saving speech:", error);
      showNotification("Failed to save speech. Please try again.", "error");
    }
  };

  const showNotification = (message, severity) => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") return;
    setNotification({ ...notification, open: false });
  };

  return (
    <div>
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<HistoryIcon />}
          onClick={() => setDrawerOpen(true)}
          sx={{marginTop: '.5rem'}}
        >
          Saved Speeches
        </Button>
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 350, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Saved Speeches
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {savedSpeeches.length === 0 ? (
              <ListItem>
                <ListItemText primary="No saved speeches" />
              </ListItem>
            ) : (
              savedSpeeches.map((speech) => (
                <ListItem key={speech.id}>
                  <ListItemText
                    primary={speech.topic}
                    secondary={`${speech.duration} mins (${new Date(speech.timestamp).toLocaleDateString()})`}
                  />
                  <ListItemSecondaryAction>
                    {speech.isProtected && (
                      <LockIcon
                        fontSize="small"
                        sx={{ mr: 1, color: "text.secondary" }}
                      />
                    )}
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={() => handleLoadSpeech(speech)}
                      sx={{ mr: 1 }}
                    >
                      <CreateIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={() => handleDeleteSpeech(speech.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            )}
          </List>
        </Box>
      </Drawer>

      <Dialog
        open={passwordDialog.open}
        onClose={() => setPasswordDialog({ ...passwordDialog, open: false })}
      >
        <DialogTitle>Protected Speech</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This speech is password protected. Please enter the password to view
            and edit.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={passwordDialog.passwordAttempt}
            onChange={(e) =>
              setPasswordDialog({
                ...passwordDialog,
                passwordAttempt: e.target.value,
              })
            }
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handlePasswordSubmit();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setPasswordDialog({ ...passwordDialog, open: false })
            }
          >
            Cancel
          </Button>
          <Button onClick={handlePasswordSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AIWriter;

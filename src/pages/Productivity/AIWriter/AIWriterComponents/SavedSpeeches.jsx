import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import {
  LockIcon,
  CreateIcon,
  DeleteIcon,
} from "@mui/icons-material";
import { loadProtectedSpeech } from '../AIWriterServices/speechServices';

export const SavedSpeeches = ({
  drawerOpen,
  setDrawerOpen,
  savedSpeeches,
  onDelete,
  formProps,
  notification,
  setNotification,
}) => {
  const [passwordDialog, setPasswordDialog] = useState({
    open: false,
    speechToLoad: null,
    passwordAttempt: "",
  });

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

  const handlePasswordSubmit = () => {
    try {
      const speech = loadProtectedSpeech(
        passwordDialog.speechToLoad,
        passwordDialog.passwordAttempt
      );
      loadSpeechContent(speech);
      setPasswordDialog({
        open: false,
        speechToLoad: null,
        passwordAttempt: "",
      });
    } catch (error) {
      setNotification({
        open: true,
        message: "Incorrect password",
        severity: "error",
      });
    }
  };

  const loadSpeechContent = (speech) => {
    formProps.setContent(speech.content);
    formProps.setPrompt(speech.topic);
    formProps.setSelectedTemplate(speech.template);
    formProps.setSpeechDuration(speech.duration);
    formProps.setAudience(speech.audience);
    formProps.setTabValue(speech.type === "public" ? 0 : 1);
    formProps.setIsProtected(speech.isProtected);
    formProps.setPassword(speech.password || "");
    setDrawerOpen(false);
  };

  return (
    <>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
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
    </>
  );
};
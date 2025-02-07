import * as React from "react";
import { Box, Button, Grid, Typography, Card, CardActionArea, CardContent } from "@mui/material";
import { RecordVoiceOver, Event, Translate, Notes } from "@mui/icons-material";
import { useNavigate } from "react-router";

const FEATURES = [
  { title: "Voice Dictation", icon: <RecordVoiceOver fontSize="large" />, path: "/app/productivity/voice-dictation" },
  { title: "Task Reminder", icon: <Event fontSize="large" />, path: "/app/productivity/task-reminder" },
  { title: "Translation", icon: <Translate fontSize="large" />, path: "/app/productivity/translation" },
  { title: "AI Writer", icon: <Notes fontSize="large" />, path: "/app/productivity/ai-writer" },
];

export default function AppLayoutPlaceholder() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 3}}>
      {/* Welcome Message */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Welcome to Adhicrat!
      </Typography>
      <Typography variant="body1" color="text.secondary" textAlign="center" mb={3}>
        Boost your productivity with AI-powered tools. Select a feature below to get started.
      </Typography>

      {/* Feature Cards */}
      <Grid container spacing={2} justifyContent="center">
        {FEATURES.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ textAlign: "center", p: 2 }}>
              <CardActionArea onClick={() => navigate(feature.path)}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
                  {feature.icon}
                  <Typography variant="h6" mt={1}>{feature.title}</Typography>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AccountCircle, Event, Notes, RecordVoiceOver, Translate } from "@mui/icons-material";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Typography } from "@mui/material";

const NAVIGATION = [
  {
    kind: "header",
    title: "My Account",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "profile",
    title: "Profile",
    icon: <AccountCircle />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Productivity",
  },
  {
    segment: "productivity/voice-dictation",
    title: "Voice Dictation",
    icon: <RecordVoiceOver />,
  },
  {
    segment: "productivity/task-reminder",
    title: "Task Reminder",
    icon: <Event />,
  },
  {
    segment: "productivity/translation",
    title: "Translation",
    icon: <Translate />,
  },
  {
    segment: "productivity/ai-writer",
    title: "AI Writer",
    icon: <Notes />,
  },
];


const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
});

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const router = React.useMemo(
    () => ({
      pathname: location.pathname.replace("/app", ""), // Extracting path from "/app/*"
      searchParams: new URLSearchParams(),
      navigate: (path) => navigate(`/app${path}`), // Ensure navigation stays within "/app"
    }),
    [navigate, location]
  );

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{
        title: (
          <Typography variant="h6" className="!font-bold font-sans">
            LegixAI
          </Typography>
        ),
        logo: "",
      }}
    >
      <DashboardLayout>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}

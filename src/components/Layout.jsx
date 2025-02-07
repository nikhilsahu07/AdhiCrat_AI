import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AccountCircle, Event, Notes, RecordVoiceOver, Translate } from "@mui/icons-material";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Outlet, useLocation, useNavigate } from "react-router";
import Footer from "./Footer/Footer";
import { BottomNavigation } from '@mui/material';

const NAVIGATION = [
  //  comming soon
  // {
  //   kind: "header",
  //   title: "My Account",
  // },
  // {
  //   segment: "dashboard",
  //   title: "Dashboard",
  //   icon: <DashboardIcon />,
  // },
  // {
  //   segment: "profile",
  //   title: "Profile",
  //   icon: <AccountCircle />,
  // },
  // {
  //   kind: "divider",
  // },
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
            <span className="samarkan">Adhicrat</span>
        ),
        logo: "",
      }}
    >
      <DashboardLayout>
        <PageContainer>
          <Outlet demoTheme={demoTheme}/>
        </PageContainer>
      <Footer />
      </DashboardLayout>
    </AppProvider>
  );
}

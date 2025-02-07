import { GoogleOAuthProvider } from '@react-oauth/google';
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import VoiceDictation from "./pages/Productivity/VoiceDetection/VoiceDictation";
import TaskReminder from "./pages/Productivity/TaskReminder/TaskReminder";
import Translation from "./pages/Productivity/Translation/Translation";
import AIWriter from "./pages/Productivity/AIWriter/AIWriter";
import FileOrganizer from "./pages/InformationManagement/FileOrganizer";
import NewsApp from "./pages/InformationManagement/NewsApp";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import { BrowserRouter, Route, Routes } from "react-router";
import AppLayoutPlaceholder from "./components/AppLayoutPlaceholder";
import TermsOfServices from './pages/TermsOfServices';
import PrivacyPolicy from './pages/PrivacyPolicy';

function AppRouter() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />

        {/* App Layout with Sidebar & Outlet */}
        
        <Route path="/app" element={<Layout />}>
          <Route index element={<AppLayoutPlaceholder />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          
          {/* Productivity Routes */}
          <Route path="productivity/voice-dictation" element={<VoiceDictation />} />
          <Route path="productivity/task-reminder" element={<TaskReminder />} />
          <Route path="productivity/translation" element={<Translation />} />
          <Route path="productivity/ai-writer" element={<AIWriter />} />

          {/* Info Management Routes */}
          <Route path="info-management/file-organizer" element={<FileOrganizer />} />
          <Route path="info-management/news" element={<NewsApp />} />
        </Route>

        <Route path='terms-of-services' element={<TermsOfServices />}/>
        <Route path='privacy-policy' element={<PrivacyPolicy />}/>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default AppRouter;

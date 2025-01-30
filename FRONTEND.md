# Frontend Directory Structure & Routing Plan

## Directory Structure
```plaintext
/src
├── components  # Reusable UI components (buttons, modals, etc.)
├── layouts     # Page layouts (Navbar, Sidebar, etc.)
├── pages       # All main application pages
│   ├── LandingPage.jsx
│   ├── Auth
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   ├── Dashboard.jsx
│   ├── Profile.jsx
│   ├── Productivity
│   │   ├── VoiceDictation.jsx
│   │   ├── TaskReminder.jsx
│   │   ├── Translation.jsx
│   │   ├── AIWriter.jsx
│   ├── InformationManagement  # Future scalability
│   │   ├── FileOrganizer.jsx
│   │   ├── NewsApp.jsx
│   ├── NotFound.jsx
├── hooks       # Custom React hooks
├── services    # API calls and AI integrations
├── store.js    # Redux store setup
├── utils       # Helper functions
├── assets      # Static assets (icons, images, fonts)
├── App.jsx      # Main entry point
├── AppRouter.jsx # Handles routing
└── main.jsx    # ReactDOM rendering
```

## Page Routes
| Path | Component | Description |
|------|------------|-------------|
| `/` | `LandingPage.jsx` | Introduction to the app |
| `/auth/login` | `Login.jsx` | User login page |
| `/auth/register` | `Register.jsx` | User registration page |
| `/auth/forgot-password` | `ForgotPassword.jsx` | Password recovery |
| `/dashboard` | `Dashboard.jsx` | Main hub for user actions |
| `/profile` | `Profile.jsx` | User profile and settings |
| `/productivity/voice-dictation` | `VoiceDictation.jsx` | AI-powered transcription |
| `/productivity/task-reminder` | `TaskReminder.jsx` | Task & reminder management |
| `/productivity/translation` | `Translation.jsx` | Hindi-English AI translation |
| `/productivity/ai-writer` | `AIWriter.jsx` | AI-generated speech/lecture content |
| `/info-management/file-organizer` | `FileOrganizer.jsx` | Auto categorization & extraction (Future) |
| `/info-management/news` | `NewsApp.jsx` | AI-based news recommendations (Future) |
| `*` | `NotFound.jsx` | 404 Page |

## Scalability Considerations
- **Modular Architecture**: Allows easy addition of new AI features.
- **API Services**: AI integrations (voice, NLP, translation, news filtering) handled via services.
- **MUI Theming**: Ensures formal & accessible UI for bureaucrats.
- **State Management**: Context API or Redux for managing global state.
- **Auth & Security**: JWT-based authentication & role-based access control.

This setup ensures a **scalable, maintainable, and AI-integrated** React SPA.


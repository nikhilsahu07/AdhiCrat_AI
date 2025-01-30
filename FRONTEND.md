# Frontend Directory Structure & Routing Plan

## Directory Structure
```plaintext
/src
├── components  # Reusable UI components (buttons, modals, etc.)
├── layouts     # Page layouts (Navbar, Sidebar, etc.)
├── pages       # All main application pages
│   ├── LandingPage.js
│   ├── Auth
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── ForgotPassword.js
│   ├── Dashboard.js
│   ├── Profile.js
│   ├── Productivity
│   │   ├── VoiceDictation.js
│   │   ├── TaskReminder.js
│   │   ├── Translation.js
│   │   ├── AIWriter.js
│   ├── InformationManagement  # Future scalability
│   │   ├── FileOrganizer.js
│   │   ├── NewsApp.js
│   ├── NotFound.js
├── hooks       # Custom React hooks
├── services    # API calls and AI integrations
├── utils       # Helper functions
├── assets      # Static assets (icons, images, fonts)
├── App.js      # Main entry point
└── index.js    # ReactDOM rendering
```

## Page Routes
| Path | Component | Description |
|------|------------|-------------|
| `/` | `LandingPage.js` | Introduction to the app |
| `/auth/login` | `Login.js` | User login page |
| `/auth/register` | `Register.js` | User registration page |
| `/auth/forgot-password` | `ForgotPassword.js` | Password recovery |
| `/dashboard` | `Dashboard.js` | Main hub for user actions |
| `/profile` | `Profile.js` | User profile and settings |
| `/productivity/voice-dictation` | `VoiceDictation.js` | AI-powered transcription |
| `/productivity/task-reminder` | `TaskReminder.js` | Task & reminder management |
| `/productivity/translation` | `Translation.js` | Hindi-English AI translation |
| `/productivity/ai-writer` | `AIWriter.js` | AI-generated speech/lecture content |
| `/info-management/file-organizer` | `FileOrganizer.js` | Auto categorization & extraction (Future) |
| `/info-management/news` | `NewsApp.js` | AI-based news recommendations (Future) |
| `*` | `NotFound.js` | 404 Page |

## Scalability Considerations
- **Modular Architecture**: Allows easy addition of new AI features.
- **API Services**: AI integrations (voice, NLP, translation, news filtering) handled via services.
- **MUI Theming**: Ensures formal & accessible UI for bureaucrats.
- **State Management**: Context API or Redux for managing global state.
- **Auth & Security**: JWT-based authentication & role-based access control.

This setup ensures a **scalable, maintainable, and AI-integrated** React SPA.


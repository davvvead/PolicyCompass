# PolicyCompass: Government Policy Simplification Platform

<div align="center">

**Simplifying complex government policies into actionable guidance**

A web application and Chrome extension that explains government policies in plain language, with step-by-step guidance and interactive reasoning.

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [Architecture](#architecture) • [Technologies](#technologies)

</div>

---

## 📋 Overview

**PolicyCompass** is a dual-interface platform designed to make government policies accessible to all citizens:

1. **Web Application** - A comprehensive chat-based interface for exploring policies with transparency controls
2. **Browser Extension** - A lightweight floating widget for on-site government website assistance

The system uses **mock data** to demonstrate how policy guidance works. The current scenario showcases Employment Insurance (EI) in Canada, with realistic step-by-step workflows and machine-generated explanations.

### ⚠️ Important: Mock Data

This project **uses simulated mock data** for demonstration purposes:
- Scenario: Employment Insurance (EI) application process
- Responses are machine-generated and not from official sources
- All mock answers include clear disclaimers in yellow boxes
- Perfect for testing UI/UX and workflow logic
- Ready for integration with real policy databases or AI models

---

## ✨ Features

### Web Application
- 🌍 **Multi-language Support** - 25+ languages (EN, FR, ES, DE, IT, JA, and more)
- 💬 **Chat-Based Interface** - Conversational policy exploration
- 🔍 **Trust Panel** - Color-coded transparency showing:
  - Confidence scores
  - Information sources
  - Limitations and edge cases
  - Human review notes
  - Potential biases
- 📋 **Action Pathways** - Step-by-step guidance with:
  - Deadline tracking
  - Required documents
  - Decision logic explanation
  - Risk flagging for conflicts
- ♿ **Accessibility Features**
  - Clear, simple language explanations
  - High contrast modes
  - Voice output support
  - Readable font sizes (14px base, scaling to 18px+)

### Browser Extension
- ⚡ **Floating Widget** - Non-intrusive chatbot interface
- 🎯 **Context-Aware Guidance** - Responds to government website content
- 🔗 **Deep Integration** - Injects on government sites (Canada, Ontario, Toronto)
- ⚙️ **Smart Responses** - 5 specialized response types:
  - General guidance (default)
  - Document requirements
  - Payment methods (direct deposit)
  - Postal disruptions
  - Eligibility criteria
- 🌐 **CORS-Enabled** - Secure cross-origin communication

---

## 🏗️ Architecture

### System Overview
```
┌─────────────────────────────────────────────────────────┐
│                  PolicyCompass System                    │
└─────────────────────────────────────────────────────────┘
           │                          │
           ▼                          ▼
    ┌──────────────┐        ┌──────────────────┐
    │ Web App      │        │ Chrome Extension │
    │ (Next.js)    │        │ (Manifest v3)    │
    └──────────────┘        └──────────────────┘
           │                          │
           └──────────┬───────────────┘
                      ▼
          ┌────────────────────────┐
          │   Shared API Endpoint   │
          │ /api/extension/process  │
          └────────────────────────┘
                      │
                      ▼
          ┌────────────────────────┐
          │  Mock Policy Database   │
          │  (EI Employment Ins.)   │
          └────────────────────────┘
```

### Frontend Architecture
```
frontend/
├── app/
│   ├── [locale]/              # Internationalization routing
│   ├── api/extension/process/ # API endpoint for extension queries
│   ├── layout.js              # Root layout
│   └── page.js                # Home page
├── components/
│   └── policy-engine/         # Core policy components
│       ├── ChatWindow.jsx      # Main chat interface
│       ├── PolicyEngineContext # State management & reasoning
│       ├── UnifiedPathwayView  # Step-by-step action guidance
│       ├── TrustPanel.jsx      # Transparency & trust controls
│       ├── InsightStack.jsx    # Reasoning & policy details
│       └── [12+ supporting components]
├── data/
│   └── mockPolicyData.js      # EI employment insurance scenario
├── lib/                       # Utility functions
├── messages/                  # i18n translations (25+ languages)
└── public/                    # Static assets

extension/
├── manifest.json              # Chrome extension config (v3)
├── background.js              # Service worker (API communication)
├── content.js                 # Content script (widget injection)
├── popup.js                   # Settings popup logic
├── popup.html                 # Settings UI
├── content.css                # Widget styling & animations
├── icons/                     # Extension icons (16x16, 48x48, 128x128)
└── [testing & debug guides]
```

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ and npm
- Chrome/Chromium browser (for extension)
- macOS/Linux/Windows

### Web Application Setup

1. **Clone and navigate:**
```bash
git clone <repository-url>
cd govai/frontend
npm install
```

2. **Development server:**
```bash
npm run dev
# Opens http://localhost:3000
```

3. **Build for production:**
```bash
npm run build
npm start
```

### Browser Extension Setup

1. **Build the extension** (already in `/extension` folder)

2. **Load in Chrome:**
   - Open `chrome://extensions/`
   - Enable "Developer mode" (top right)
   - Click "Load unpacked"
   - Select `/govai/extension` folder

3. **Access settings:**
   - Click extension icon in Chrome toolbar
   - Configure language & accessibility options

4. **Test on government sites:**
   - Visit: canada.ca, ontario.ca, or toronto.ca
   - Extension auto-injects floating widget
   - Click toggle button to show/hide chat

---

## 💻 Usage

### Web Application

**Chat Interface:**
1. Ask questions about government policies
2. Receive simplified explanations
3. View action pathways with step-by-step guidance
4. Click "Open Official Guidance" to visit the real government website

**Example Questions:**
- "How do I apply for Employment Insurance?"
- "What documents do I need?"
- "How will I receive payments?"
- "What are the eligibility requirements?"

**Trust Panel:**
- Click shield icon to view transparency information
- See confidence scores (color-coded)
- Review information sources
- Understand limitations and edge cases

### Browser Extension

**On Government Websites:**
1. Navigate to a supported government website
2. Click floating **GovAI** button (bottom right)
3. Ask your policy question
4. Receive simplified guidance with disclaimer
5. Click "Open Official Guidance" to access real resources

**Settings:**
- Toggle language (English/French/Spanish)
- Enable high contrast mode
- Enable voice output for accessibility

---

## 🔧 Technologies

### Frontend Stack
- **Framework:** Next.js 16.0.5 with React 19.2.0 (App Router)
- **Styling:** Tailwind CSS 4.0 + shadcn/ui component library
- **Internationalization:** next-intl (25+ languages)
- **Animations:** framer-motion 12.23.24
- **Icons:** lucide-react 0.555.0
- **UI Components:** Radix UI (dialog, progress, scroll-area, tooltip, toggle-group)

### Extension Stack
- **Format:** Chrome Manifest v3
- **Scripts:** Content script (DOM injection) + Background worker (API communication)
- **Styling:** Pure CSS with animations
- **Storage:** chrome.storage.local (settings persistence)

### Internationalization
**Supported Languages (25+):**
Bulgarian, Czech, Danish, German, Greek, English, Spanish, Estonian, Finnish, French, Irish, Croatian, Hungarian, Italian, Japanese, Lithuanian, Latvian, Maltese, Dutch, Polish, Portuguese, Romanian, Slovak, Slovenian, Swedish

### API & Mock Data
- **Backend:** Next.js API Route handler
- **Data:** Mock policy database (JSON-based scenarios)
- **CORS:** Enabled for cross-origin extension requests

---

## 📊 Mock Data Details

### Employment Insurance Scenario
Located in `frontend/data/mockPolicyData.js`

**Structure:**
```javascript
{
  scenario: {
    title: "Apply for Employment Insurance",
    pathway: [
      {
        title: "Apply for Employment Insurance",
        actionUrl: "https://www.canada.ca/en/services/benefits/ei.html",
        deadline: "Within 4 weeks of last day worked",
        description: "Submit application via Service Canada..."
      },
      // ... more steps
    ]
  }
}
```

**Mock Response Types** (from `/api/extension/process`):
1. **Default** - General EI application guidance (5 steps)
2. **Documents** - Required documents list (11 items, triggers on "document", "need", "gather")
3. **Direct Deposit** - Bank account setup (8 steps, triggers on "direct deposit", "bank", "payment")
4. **Canada Post** - Disruption impact (10 items, triggers on "canada post", "mail", "disruption")
5. **Eligibility** - Qualifying criteria (10 items, triggers on "qualif", "eligible", "requirements")

**Disclaimer:** All mock responses include a yellow box with italicized text:
> *Disclaimer: This response was generated by AI and may contain inaccuracies. Please verify with official sources.*

---

## 🔌 API Documentation

### Extension API Endpoint
**URL:** `http://localhost:3000/api/extension/process`
**Method:** POST
**CORS:** Enabled for all origins

**Request:**
```json
{
  "query": "what documents do I need?"
}
```

**Response:**
```json
{
  "guidance": "Detailed response based on query...",
  "actionUrl": "https://www.canada.ca/...",
  "disclaimer": "Machine-generated response with disclaimer",
  "steps": [
    { "number": 1, "description": "..." },
    // ... more steps
  ],
  "highlights": [
    { "number": 1, "text": "..." },
    // ... more highlights
  ]
}
```

---

## 📂 Folder Structure

```
govai/
├── frontend/                           # Next.js web application
│   ├── app/
│   │   ├── [locale]/                  # i18n routing
│   │   ├── api/extension/process/     # Extension API endpoint
│   │   └── layout.js, page.js          # Root pages
│   ├── components/
│   │   └── policy-engine/             # 23+ core components
│   ├── data/
│   │   ├── mockPolicyData.js          # EI scenario
│   │   └── scenarios.json             # Scenario config
│   ├── lib/                           # Utilities & helpers
│   ├── messages/                      # i18n translations (25 languages)
│   ├── public/                        # Static assets
│   ├── i18n/                          # Routing config
│   ├── package.json                   # Dependencies
│   ├── tailwind.config.js             # Styling config
│   ├── next.config.mjs                # Next.js config
│   └── middleware.js                  # i18n middleware
│
├── extension/                          # Chrome extension
│   ├── manifest.json                  # v3 configuration
│   ├── background.js                  # Service worker
│   ├── content.js                     # Content script
│   ├── popup.html                     # Settings UI
│   ├── popup.js                       # Settings logic
│   ├── content.css                    # Widget styling
│   ├── icons/                         # 3 icon sizes
│   └── [guides & testing docs]
│
└── netlify.toml                       # Deployment config
```

---

## 🧪 Testing & Development

### Web Application
- Development: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`

### Extension Development
Guides included in `/extension`:
- `DEBUG_GUIDE.md` - Debugging techniques and chrome.devtools
- `DEMO_GUIDE.md` - How to demonstrate extension features
- `RELOAD_STEPS.md` - How to reload extension during development
- `TESTING_CHECKLIST.md` - QA and testing procedures

**Quick Test:**
1. Visit canada.ca in Chrome
2. Click extension icon
3. Ask: "what documents do I need?"
4. Verify mock response with disclaimer appears

---

## 🌐 Deployment

### Netlify Deployment (Web App)
```bash
# Configured in netlify.toml
netlify deploy
```

### Chrome Web Store (Extension)
1. Package extension: `chrome://extensions > Pack extension`
2. Submit to [Chrome Web Store](https://chrome.google.com/webstore)
3. Requires:
   - Developer account ($5)
   - Privacy policy
   - Description & screenshots
   - Icon (128x128)

---

## 📝 Core Components Explained

### ChatWindow.jsx
Main chat interface where users ask policy questions. Manages conversation history and displays AI responses with timestamps.

### UnifiedPathwayView.jsx
Displays action pathways with step-by-step guidance, deadlines, and "Open Official Guidance" buttons linking to real government resources.

### TrustPanel.jsx
Transparency modal showing:
- Confidence scores (green indicator)
- Information sources (indigo)
- Limitations (amber)
- Human review notes (purple)
- Potential biases (slate)

### InsightStack.jsx
Accordion component showing policy details, action plans, and reasoning chains with expandable sections.

### PolicyEngineContext
React context providing:
- Conversation messages
- Current scenario & step
- Policy reasoning
- Accessibility settings

---

## 🎯 Future Enhancements

- [ ] Integration with real policy databases
- [ ] AI model backend (replace mock data)
- [ ] Multi-scenario support beyond EI
- [ ] Voice input/output for accessibility
- [ ] Real-time policy updates
- [ ] User feedback & rating system
- [ ] Analytics dashboard for policy inquiries
- [ ] Email guidance summaries
- [ ] Mobile app companion

---

##  Support

For issues and questions:
- Create an issue on GitHub
- Check existing documentation in `/extension` guides
- Review mock data structure in `frontend/data/mockPolicyData.js`

---

## ⚠️ Disclaimer

**PolicyCompass is a demonstration project using mock data.** 

- All policy guidance is machine-generated and simulated
- Not affiliated with official government agencies
- For official information, always visit government websites
- See "Open Official Guidance" buttons for official resources

---

<div align="center">

**Made with ❤️ for accessible government policy information**

</div>

# Performance Analyzer - Complete Folder Structure & Organization

## 📂 Project Root Structure

```
Performance-Analyzer-main/
│
├── Documentation/                          # NEW: Comprehensive project documentation
│   ├── PROJECT_OVERVIEW.md                # Project description, scope, and architecture
│   ├── FRONTEND_DOCUMENTATION.md          # Frontend code, components, and features
│   ├── BACKEND_DOCUMENTATION.md           # Backend API, models, and endpoints
│   ├── FEATURES.md                        # Complete features list by role
│   └── FOLDER_STRUCTURE.md                # This file - Complete folder organization
│
├── Performance-Analyzer/                   # Frontend React Application
│   ├── src/                               # Source code directory
│   │   ├── components/                    # Reusable React components
│   │   ├── pages/                         # Page-level components and routes
│   │   ├── hooks/                         # Custom React hooks
│   │   ├── data/                          # Mock data and constants
│   │   ├── lib/                           # Utility functions
│   │   ├── App.tsx                        # Root application component
│   │   ├── App.css                        # Global application styles
│   │   ├── main.tsx                       # React DOM entry point
│   │   ├── index.css                      # Global CSS variables
│   │   ├── config.ts                      # Configuration (API URLs, etc.)
│   │   └── vite-env.d.ts                  # Vite environment type definitions
│   │
│   ├── public/                            # Static resources
│   │   ├── robots.txt                     # SEO robots configuration
│   │   └── uploads/                       # Directory for user-uploaded files
│   │
│   ├── package.json                       # Node dependencies and scripts
│   ├── tsconfig.json                      # TypeScript configuration
│   ├── tsconfig.app.json                  # TypeScript app-specific config
│   ├── tsconfig.node.json                 # TypeScript Node config
│   ├── eslint.config.js                   # ESLint linting rules
│   ├── vite.config.ts                     # Vite build configuration
│   ├── tailwind.config.ts                 # Tailwind CSS configuration
│   ├── postcss.config.js                  # PostCSS processing config
│   ├── components.json                    # shadcn/ui components config
│   ├── index.html                         # HTML entry point
│   ├── README.md                          # Frontend setup instructions
│   └── node_modules/                      # Installed npm packages (auto-generated)
│
└── backend/                               # FastAPI Backend Application
    ├── main.py                            # Main FastAPI application
    ├── requirements.txt                   # Python dependencies
    ├── .env.example                       # Example environment variables
    ├── database.sqlite                    # SQLite database (auto-generated)
    ├── clear_db.py                        # Database cleanup utility
    ├── migrate_marks.py                   # Data migration script
    ├── patch_db.py                        # Database patch utility
    └── __pycache__/                       # Python cache (auto-generated)
```

---

## 📁 Detailed Folder Structure Breakdown

### 1. 📖 Documentation Folder (`/Documentation/`)

**Purpose**: Centralized documentation for the entire project

```
Documentation/
├── PROJECT_OVERVIEW.md
│   └── Content: Project description, problem statement, scope, architecture
│
├── FRONTEND_DOCUMENTATION.md
│   └── Content: React components, pages, hooks, data flow, styling
│
├── BACKEND_DOCUMENTATION.md
│   └── Content: API endpoints, database models, authentication, AI integration
│
├── FEATURES.md
│   └── Content: Feature descriptions organized by user role
│
└── FOLDER_STRUCTURE.md
    └── Content: Complete folder organization (this file)
```

**Key Files**:
- `PROJECT_OVERVIEW.md`: Start here for high-level understanding
- `FEATURES.md`: Detailed walkthrough of all system features
- `FRONTEND_DOCUMENTATION.md`: For frontend developers
- `BACKEND_DOCUMENTATION.md`: For backend developers and API reference
- `FOLDER_STRUCTURE.md`: For project navigation and file locations

---

### 2. 🎨 Frontend Folder (`/Performance-Analyzer/`)

Root of React/TypeScript frontend application built with Vite

#### **2.1 Source Directory (`/Performance-Analyzer/src/`)**

Contains all application source code.

##### **2.1.1 Components Folder (`src/components/`)**

Reusable React components organized by feature and functionality.

```
components/
│
├── Core Components (Shared across app)
│   ├── AdminLoginModal.tsx         # Modal for admin login
│   ├── CSVEditor.tsx               # Component for editing CSV/Excel data
│   ├── CSVTable.tsx                # Component for displaying CSV data in table
│   ├── FeatureCard.tsx             # Card component for feature showcase
│   ├── FilterBar.tsx               # Filter controls for data filtering
│   ├── Hero.tsx                    # Landing page hero section
│   ├── LoginForm.tsx               # Generic login form component
│   ├── Navbar.tsx                  # Global navigation bar
│   ├── ProtectedRoute.tsx          # Route guard for role-based access
│   ├── ThemeProvider.tsx           # Light/Dark theme provider (Context)
│   └── ThemeToggle.tsx             # Theme switcher button
│
├── admin/                          # Admin-specific components
│   ├── AdminDashboard.tsx          # Main admin dashboard layout
│   ├── FacultyManagement.tsx       # Faculty CRUD operations
│   ├── HODManagement.tsx           # HOD account management
│   ├── ManageSections.tsx          # Section/class configuration
│   ├── StudentData.tsx             # Student data viewing
│   ├── StudentDataImport.tsx       # Student bulk import from Excel
│   └── TpoManagement.tsx           # TPO account management
│
├── student/                        # Student-specific components
│   ├── StudentAnalyticsView.tsx    # Personal performance analytics
│   ├── StudentInsightsDashboard.tsx # AI-generated insights page
│   ├── StudentTestView.tsx         # Online test-taking interface
│   └── TakeTestView.tsx            # Alternative test view component
│
├── training/                       # Faculty/Training-specific components
│   ├── AIInsightsTab.tsx           # AI analysis tab
│   ├── ClassGraph.tsx              # Class performance graph
│   ├── ClassInsightsDashboard.tsx  # Class insights and analytics
│   ├── CreateTestForm.tsx          # Test creation form
│   ├── CreateTestTab.tsx           # Test creation tab interface
│   ├── FacultyDashboard.tsx        # Main faculty dashboard
│   ├── HODDashboard.tsx            # HOD-specific dashboard
│   ├── PerformanceFilter.tsx       # Performance data filtering
│   ├── PlacementManagement.tsx     # Placement operations
│   ├── StudentGraph.tsx            # Individual student performance graph
│   ├── SubjectManagementForm.tsx   # Subject configuration form
│   ├── TestList.tsx                # List of available tests
│   ├── trainingTypes.ts            # TypeScript types for training module
│   ├── UploadMarksTab.tsx          # Marks upload interface
│   ├── UserManagementForm.tsx      # User management form
│   └── ViewPerformanceTab.tsx      # Performance viewing tab
│
└── ui/                             # shadcn/ui component library (50+ components)
    ├── Common Components
    │   ├── button.tsx              # Button component
    │   ├── card.tsx                # Card container component
    │   ├── badge.tsx               # Badge/tag component
    │   ├── avatar.tsx              # User avatar component
    │   ├── alert.tsx               # Alert notification component
    │   └── separator.tsx           # Divider/separator component
    │
    ├── Form Components
    │   ├── input.tsx               # Text input field
    │   ├── checkbox.tsx            # Checkbox input
    │   ├── radio-group.tsx         # Radio button group
    │   ├── select.tsx              # Dropdown select
    │   ├── textarea.tsx            # Multi-line text input
    │   ├── form.tsx                # Form controller
    │   ├── label.tsx               # Form label
    │   └── toggle.tsx              # Toggle switch
    │
    ├── Dialog & Overlay Components
    │   ├── dialog.tsx              # Modal dialog
    │   ├── alert-dialog.tsx        # Alert dialog with confirmation
    │   ├── drawer.tsx              # Side drawer/sidebar
    │   ├── popover.tsx             # Popover tooltip
    │   ├── context-menu.tsx        # Right-click context menu
    │   └── hover-card.tsx          # Hover information card
    │
    ├── Navigation Components
    │   ├── tabs.tsx                # Tabbed interface
    │   ├── breadcrumb.tsx          # Breadcrumb navigation
    │   ├── navigation-menu.tsx     # Navigation menu
    │   ├── dropdown-menu.tsx       # Dropdown menu
    │   └── menubar.tsx             # Application menu bar
    │
    ├── Data Display Components
    │   ├── table.tsx               # Data table
    │   ├── pagination.tsx          # Pagination controls
    │   ├── accordion.tsx           # Collapsible accordion
    │   ├── carousel.tsx            # Image/content carousel
    │   ├── collapsible.tsx         # Collapsible section
    │   ├── scroll-area.tsx         # Scrollable area
    │   ├── aspect-ratio.tsx        # Aspect ratio container
    │   └── slider.tsx              # Slider input
    │
    ├── Feedback Components
    │   ├── toast.tsx               # Toast notification system
    │   ├── sonner.tsx              # Alternative toast library
    │   ├── progress.tsx            # Progress bar
    │   ├── skeleton.tsx            # Loading skeleton
    │   └── command.tsx             # Command palette
    │
    ├── Media Components
    │   ├── chart.tsx               # Chart component wrapper
    │   └── calendar.tsx            # Date calendar picker
    │
    └── Additional Components (20+ more)
        ├── sheet.tsx
        ├── switch.tsx
        ├── tooltip.tsx
        ├── toggle-group.tsx
        ├── progress-circle.tsx
        └── ... (other shadcn/ui components)
```

**Component Organization Principles**:
- **Shared**: Used across multiple roles and pages
- **admin/**: Exclusively for admin functionality
- **student/**: Only for student users
- **training/**: For faculty, HOD, and TPO users
- **ui/**: Pre-built, styled UI components from shadcn

---

##### **2.1.2 Pages Folder (`src/pages/`)**

Page-level components that map to routes in the application.

```
pages/
├── Index.tsx                       # Landing/home page
├── AdminLoginPage.tsx              # Admin login page
├── FacultyLoginPage.tsx            # Faculty/HOD/TPO login page
├── StudentLoginPage.tsx            # Student login page
├── StudentRegistrationPage.tsx     # Student sign-up page
├── AdminDashboard.tsx              # Admin dashboard page layout
├── TrainingAnalyzer.tsx            # Faculty/Training dashboard page layout
├── PlacementHub.tsx                # Student dashboard page layout
├── AcademicAnalyzer.tsx            # Academic analytics page
└── NotFound.tsx                    # 404 page for invalid routes
```

**Page Responsibilities**:
- Map to specific URL routes
- Handle page-level logic and layout
- Integrate multiple components
- Manage page-level authentication
- Handle navigation and redirects

---

##### **2.1.3 Hooks Folder (`src/hooks/`)**

Custom React hooks for reusable stateful logic.

```
hooks/
├── use-mobile.tsx                  # Detect if device is mobile
└── use-toast.ts                    # Trigger toast notifications
```

**Hook Examples**:

###### **use-mobile.tsx**
- Detects viewport width
- Returns true if mobile (<640px)
- Used to conditionally render mobile-specific UI

###### **use-toast.ts**
- Provides toast notification function
- Returns `{ toast }` hook
- Used throughout app for feedback: `toast({ message: "Success!" })`

---

##### **2.1.4 Data Folder (`src/data/`)**

Mock data and type definitions for testing and development.

```
data/
├── mockPerformanceData.ts          # Sample student performance records
├── mockSectionsData.ts             # Sample class sections
└── mockTestData.ts                 # Sample test data
```

**Usage**:
- Development without real backend
- UI testing and prototyping
- Demo purposes
- Type reference for real data

---

##### **2.1.5 Lib Folder (`src/lib/`)**

Utility functions and helper code.

```
lib/
└── utils.ts                        # General utility functions
```

**Common Utilities**:
- Date formatting
- String manipulation
- Number formatting
- Array operations
- Object utilities
- Validation helpers

---

##### **2.1.6 Root Source Files (`src/`)**

Core application files at source root.

```
src/
├── App.tsx                         # Root application component
│   └── Defines routes and main layout
│
├── App.css                         # Global application styles
│   └── Custom CSS variables, animations, gradients
│
├── main.tsx                        # React DOM bootstrap
│   └── ReactDOM.createRoot() entry point
│
├── index.css                       # Global CSS variables
│   └── Tailwind imports, CSS variables
│
├── config.ts                       # Application configuration
│   ├── API_BASE_URL = "http://localhost:8000/api"
│   ├── App version
│   ├── Feature flags
│   └── Other constants
│
└── vite-env.d.ts                   # Vite type definitions
    └── Ambient module declarations
```

---

#### **2.2 Public Directory (`/Performance-Analyzer/public/`)**

Static assets served directly by the web server.

```
public/
├── robots.txt                      # SEO instructions for search engines
│   └── Allow/disallow crawling paths
│
└── uploads/                        # Directory for user-uploaded files
    ├── Student profiles (if any)
    ├── Documents
    └── Temporary files
```

---

#### **2.3 Configuration Files (`/Performance-Analyzer/`)**

Build and tool configuration files at project root.

```
Performance-Analyzer/
├── package.json
│   ├── Project metadata
│   ├── Scripts (dev, build, lint, preview)
│   ├── Dependencies (React, TypeScript, etc.)
│   └── DevDependencies (Vite, ESLint, etc.)
│
├── tsconfig.json
│   └── Main TypeScript configuration
│       ├── Compiler options
│       ├── Include patterns
│       ├── Exclude patterns
│       └── Root directory setup
│
├── tsconfig.app.json
│   └── App-specific TypeScript config
│       ├── extends: tsconfig.json
│       └── App-specific rules
│
├── tsconfig.node.json
│   └── Config files TypeScript settings
│       ├── For vite.config.ts
│       ├── For eslint.config.js
│       └── For other config files
│
├── vite.config.ts
│   ├── Vite build configuration
│   ├── Plugin configuration
│   ├── Custom resolvers
│   ├── Dev server settings
│   └── Build optimization
│
├── tailwind.config.ts
│   ├── Color palette customization
│   ├── Theme extensions
│   ├── Custom utility definitions
│   ├── Responsive breakpoints
│   └── Plugin configuration
│
├── postcss.config.js
│   ├── Loads Tailwind CSS
│   ├── Other PostCSS plugins
│   └── CSS processing pipeline
│
├── eslint.config.js
│   ├── Linting rules
│   ├── Code style enforcement
│   ├── Type checking integration
│   └── React/TypeScript plugins
│
├── components.json
│   └── shadcn/ui configuration
│       ├── Component paths
│       ├── Import aliases
│       ├── CSS framework
│       └── Theme settings
│
├── index.html
│   └── HTML entry point
│       ├── Links to favicon
│       ├── Meta tags
│       ├── Root div for React
│       └── Script reference to main.tsx
│
├── README.md
│   └── Frontend setup and development instructions
│
└── node_modules/ (not committed to git)
    └── All installed npm packages (~1000+ packages)
```

---

### 3. 🖥️ Backend Folder (`/backend/`)

Python FastAPI backend application.

```
backend/
│
├── main.py
│   ├── FastAPI application initialization
│   ├── Database models (9 SQLAlchemy models)
│   ├── API route handlers (endpoints)
│   ├── Pydantic request/response models
│   ├── CORS middleware configuration
│   ├── Authentication logic
│   ├── Google Gemini AI integration
│   └── ~1000+ lines of application code
│
├── requirements.txt
│   ├── fastapi==0.103.1
│   ├── uvicorn==0.23.2
│   ├── sqlalchemy==2.0.20
│   ├── pandas==2.1.0
│   ├── openpyxl==3.1.2
│   ├── google-generativeai==0.3.2
│   ├── pydantic==2.4.2
│   ├── python-multipart==0.0.6
│   ├── python-dotenv==1.0.0
│   └── (9 total dependencies)
│
├── .env.example
│   ├── GEMINI_API_KEY=your_api_key
│   ├── ADMIN_USERNAME=superadmin
│   ├── ADMIN_PASSWORD=superadmin123
│   └── DATABASE_URL=sqlite:///./database.sqlite
│
├── database.sqlite
│   └── SQLite database file (auto-created on first run)
│       ├── 9 tables for data persistence
│       ├── Indexed columns for performance
│       └── Schema defined by SQLAlchemy models
│
├── clear_db.py
│   └── Utility script to:
│       ├── Drop all tables
│       ├── Recreate schema
│       ├── Reset database to clean state
│       └── Useful for testing/demo resets
│
├── migrate_marks.py
│   └── Data migration script for:
│       ├── Updating existing marks
│       ├── Schema changes
│       ├── Bulk data operations
│       └── Data transformation
│
├── patch_db.py
│   └── Database patch utility for:
│       ├── Fixing data inconsistencies
│       ├── Correcting corrupted entries
│       ├── Applying manual fixes
│       └── One-off data corrections
│
└── __pycache__/ (auto-generated)
    └── Python bytecode cache
```

---

## 📊 Technology Stack - Folder-Based Organization

### Frontend Technology Stack

```
Performance-Analyzer/
│
├── Core Framework
│   ├── React (UI library)
│   ├── TypeScript (Static typing)
│   └── Vite (Build tool)
│
├── Styling
│   ├── Tailwind CSS (Utility CSS)
│   ├── PostCSS (CSS processing)
│   ├── shadcn/ui (Component library)
│   └── src/App.css, src/index.css
│
├── Routing & Navigation
│   ├── React Router v6 (SPA routing)
│   └── src/pages/ (Page definitions)
│
├── State Management
│   ├── React Context API (Theme, Authentication)
│   └── React Query (Server state)
│
├── Components
│   ├── src/components/ (All components)
│   ├── ui/ (shadcn/ui)
│   ├── admin/ (Admin UI)
│   ├── student/ (Student UI)
│   └── training/ (Faculty UI)
│
└── Development Tools
    ├── ESLint (Code linting)
    ├── TypeScript compiler (Type checking)
    └── Vite dev server (Hot reload)
```

### Backend Technology Stack

```
backend/
│
├── Web Framework
│   └── FastAPI (main.py)
│       ├── Route definitions
│       └── Request/response handlers
│
├── Database
│   ├── SQLAlchemy ORM (main.py models)
│   ├── SQLite (database.sqlite file)
│   └── Database utilities (clear_db.py, patch_db.py)
│
├── Data Processing
│   ├── Pandas (Excel parsing)
│   └── openpyxl (Excel files)
│
├── AI Integration
│   └── Google Generative AI (Gemini in main.py)
│
├── Data Validation
│   └── Pydantic (main.py models)
│
├── Server
│   └── Uvicorn (ASGI server)
│
└── Configuration
    └── .env file management
        ├── API keys
        ├── Admin credentials
        └── Database URL
```

---

## 🔄 Data Flow Across Folders

### File Upload Flow (Marks)

```
Frontend Upload
    ↓
Performance-Analyzer/src/components/training/UploadMarksTab.tsx
    ↓
CSVEditor.tsx (Edit/preview data)
    ↓
API Call to backend
    ↓
backend/main.py - POST /api/performance/upload
    ↓
Pandas parsing (requirements.txt: pandas)
    ↓
StudentPerformance model (database creation)
    ↓
database.sqlite (Data persisted)
```

### Test Taking Flow

```
Frontend Test Component
    ↓
Performance-Analyzer/src/components/student/StudentTestView.tsx
    ↓
Fetch questions: GET /api/tests/{testId}
    ↓
backend/main.py - Question model
    ↓
Display questions from database.sqlite
    ↓
Student submits answers
    ↓
POST /api/tests/{testId}/submit
    ↓
backend/main.py - Score calculation
    ↓
StudentTestResult model saved
    ↓
Return score to StudentTestView.tsx
```

### AI Insights Flow

```
Performance-Analyzer/src/components/student/StudentInsightsDashboard.tsx
    ↓
GET /api/insights/analyze
    ↓
backend/main.py - Fetch student data
    ↓
Call Google Gemini API (requirements.txt: google-generativeai)
    ↓
Send performance data for analysis
    ↓
Receive AI-generated insights
    ↓
Return to frontend
    ↓
Display formatted insights
```

---

## 📈 Scalability & Module Organization

### Frontend Module Organization

**By Feature**:
- `components/admin/` - Admin feature module
- `components/student/` - Student feature module
- `components/training/` - Training feature module

**By Functionality**:
- `pages/` - Page-level routing
- `hooks/` - Reusable logic
- `lib/` - Utilities
- `data/` - Static data

**By Technology**:
- `components/ui/` - UI library components
- `config.ts` - Configuration

### Backend Module Organization

**Single File Structure (main.py)**:
- Scalable via logical sections:
  1. Imports and configuration (lines 1-40)
  2. Database setup (lines 41-120)
  3. Models definition (lines 121-250)
  4. Pydantic schemas (lines 251-350)
  5. Route handlers (lines 351+)

**Future Modularization**:
Could be split into:
- `models.py` - Database models
- `schemas.py` - Pydantic models
- `routes/` - Separate route files
- `services/` - Business logic

---

## 🗂️ Key Directory & File Patterns

| Location | Pattern | Purpose |
|----------|---------|---------|
| `src/components/` | `.tsx` | React components |
| `src/pages/` | `.tsx` | Page routes |
| `src/hooks/` | `.tsx` or `.ts` | Custom hooks |
| `src/lib/` | `.ts` | Utility functions |
| `src/data/` | `.ts` | Mock data, constants |
| `src/*.{tsx,ts}` | Root files | App bootstrap, config |
| `public/` | Static files | Non-code assets |
| `*.config.ts/js` | Config files | Tool configuration |
| `backend/main.py` | Python | All backend code |
| `backend/requirements.txt` | Text | Package list |
| `backend/*.py` | Python scripts | Utilities |
| `Documentation/` | `.md` | Project documentation |

---

## 🚀 Setup Folder Navigation

### First-Time Setup

1. **Start Here**: `Documentation/PROJECT_OVERVIEW.md`
   - Understand project scope

2. **Frontend**: `Performance-Analyzer/README.md`
   - Setup instructions
   - Run with `npm install && npm run dev`

3. **Backend**: `backend/` folder
   - Setup with `pip install -r requirements.txt`
   - Create `.env` from `.env.example`
   - Run with `uvicorn main:app --reload`

4. **Reference**: `Documentation/` folder
   - Feature details from `FEATURES.md`
   - API reference from `BACKEND_DOCUMENTATION.md`
   - Component guide from `FRONTEND_DOCUMENTATION.md`

---

## 📱 Mobile & Responsive Folder Patterns

Responsive design handled in:
- `src/hooks/use-mobile.tsx` - Mobile detection
- `src/App.css` - Media queries
- Tailwind responsive classes (throughout components)
- `tailwind.config.ts` - Breakpoint definitions

---

## 🔒 Security-Related File Locations

- `.env` file (not in git) - Sensitive credentials
- `.env.example` - Safe template reference
- `src/components/ProtectedRoute.tsx` - Route protection logic
- `backend/main.py` - Password hashing and auth logic

---

## 🧪 Development & Testing Folders

### For Development
- `backend/` - Local backend development
- `Performance-Analyzer/src/data/` - Mock data for testing
- `backend/database.sqlite` - Local database

### For Testing
- `backend/clear_db.py` - Reset database
- `backend/patch_db.py` - Test data fixes
- `Performance-Analyzer/node_modules/` - Dependencies

---

## 📊 Folder Size & Complexity

| Folder | Files | Complexity | Purpose |
|--------|-------|-----------|---------|
| `src/components/` | ~70 | High | All UI components |
| `src/components/ui/` | 50+ | High | shadcn library |
| `src/pages/` | 10 | Medium | Page routes |
| `backend/` | 4-7 | High | All business logic |
| `Documentation/` | 5 | Low | Documentation only |
| `public/` | 2 | Very Low | Static assets |

---

## 🔗 Cross-Folder Dependencies

**Example: Marks Upload**

```
UploadMarksTab.tsx
    ↓ imports
CSVEditor.tsx, CSVTable.tsx
    ↓ calls API in config.ts
config.ts (API_BASE_URL)
    ↓ sends to
backend/main.py (/api/performance/upload)
    ↓ uses
pandas, openpyxl (from requirements.txt)
    ↓ saves to
database.sqlite
```

---

## 📝 File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| React Components | PascalCase + `.tsx` | `AdminDashboard.tsx` |
| Config Files | camelCase + `.ts` | `vite.config.ts` |
| Data Files | camelCase + `.ts` | `mockPerformanceData.ts` |
| CSS Classes | lowercase + `.css` | `index.css` |
| API Routes | kebab-case | `/api/students/login` |
| Database Models | PascalCase | `StudentPerformance` |
| Python Scripts | snake_case + `.py` | `clear_db.py` |

---

## 🎯 Navigation Guide by Role

### For Frontend Developers
```
1. Start: Performance-Analyzer/src/App.tsx
2. Study: src/pages/ (routing)
3. Build: src/components/ (UI components)
4. Style: App.css, index.css, tailwind.config.ts
5. Test: src/data/ (mock data)
```

### For Backend Developers
```
1. Start: backend/main.py
2. Models: Lines 50-150 (Database models)
3. Routes: Lines 300+ (API endpoints)
4. Database: database.sqlite (Data inspection)
5. Utilities: clear_db.py, patch_db.py
```

### For DevOps/System Admins
```
1. Frontend: Performance-Analyzer/package.json (dependencies)
2. Backend: backend/requirements.txt (dependencies)
3. Config: .env.example (secrets template)
4. Database: database.sqlite (backup location)
5. Docs: Documentation/ (all guides)
```

### For Project Managers
```
1. Overview: Documentation/PROJECT_OVERVIEW.md
2. Features: Documentation/FEATURES.md
3. Structure: Documentation/FOLDER_STRUCTURE.md (this file)
4. Progress: Check completed components
5. Tests: Run with npm run dev && uvicorn...
```

---

## 🔄 Future Expansion Folders (Recommended)

When project grows, consider adding:

```
frontend-app/
├── ...existing folders...
├── utils/                  # Extracted utilities
│   ├── api/               # API client helpers
│   ├── validation/        # Form validators
│   └── formatting/        # Data formatters
│
├── services/              # Business logic
│   ├── studentService.ts
│   ├── facultyService.ts
│   └── authService.ts
│
├── types/                 # Shared TypeScript types
│   ├── student.ts
│   ├── performance.ts
│   └── common.ts
│
├── store/                 # State management (if needed)
│   ├── slices/
│   └── store.ts
│
└── __tests__/             # Unit tests
    ├── components/
    ├── hooks/
    └── utils/

backend/
├── app/
│   ├── models/           # Database models
│   ├── schemas/          # Pydantic schemas
│   ├── routes/           # API route files
│   ├── services/         # Business logic
│   └── utils/            # Helper functions
│
├── tests/                # Test files
│   ├── test_models.py
│   ├── test_routes.py
│   └── test_services.py
│
└── config/              # Configuration
    ├── settings.py
    └── database.py
```

---

## ✅ File Organization Best Practices

1. **Group by Feature**: Related files in same folder
2. **Consistent Naming**: Follow conventions (see above)
3. **Clear Hierarchy**: Shallow 3-4 levels deep
4. **Reusable Components**: Keep in UI folders
5. **Type Safety**: All TypeScript files have types
6. **Comments**: Document complex logic
7. **README**: Each major folder has docs
8. **Version Control**: Don't commit node_modules, venv, .env

---

## 📞 Quick Reference: Where to Find...

| What | Where |
|------|-------|
| Student login | `Performance-Analyzer/src/pages/StudentLoginPage.tsx` |
| Admin dashboard | `Performance-Analyzer/src/components/admin/AdminDashboard.tsx` |
| API endpoints | `backend/main.py` (lines 300+) |
| Database models | `backend/main.py` (lines 50-150) |
| Custom hooks | `Performance-Analyzer/src/hooks/` |
| UI components | `Performance-Analyzer/src/components/ui/` |
| Styling | `Performance-Analyzer/src/App.css` |
| Configuration | `Performance-Analyzer/src/config.ts` |
| Types/schemas | `backend/main.py` (Pydantic models) |
| Project info | `Documentation/PROJECT_OVERVIEW.md` |

---

**Version**: 1.0  
**Last Updated**: March 2026  
**Total Files**: 200+  
**Directory Depth**: 5 levels max  
**Project Type**: Full-stack MERN + Python FastAPI

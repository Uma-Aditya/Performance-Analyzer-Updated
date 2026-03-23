# Frontend Documentation - Performance Analyzer

## 📱 Frontend Overview

The frontend of the Performance Analyzer is a modern, responsive React application built with TypeScript, Vite, and Tailwind CSS. It provides an intuitive user interface for different user roles to access and manage educational performance data.

---

## 🛠️ Technology Stack

### Core Framework & Build Tools
- **React 18+**: Component-based UI library
- **TypeScript**: Static typing for better code quality
- **Vite**: Modern, fast build tool and development server
- **Node.js & npm**: Package management

### Styling & UI Components
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality, accessible React components
- **Framer Motion**: Animation library for smooth transitions
- **Lucide Icons**: Beautiful, consistent icon library

### Data Management & API
- **React Query (@tanstack/react-query)**: Server state management
- **Axios**: HTTP client for API requests (implied by fetch patterns)

### Routing & Navigation
- **React Router v6+**: Client-side routing
- **React Router DOM**: DOM-specific routing components

### Utilities & Helpers
- **date-fns**: Date formatting and manipulation
- **class-variance-authority**: CSS class management
- **clsx**: Conditional class names
- **cmdk**: Command palette/menu component

### Form Handling
- **@hookform/resolvers**: Form validation resolver
- **React Hook Form**: Form state management

### Advanced Features
- **@tensorflow/tfjs** & **@tensorflow-models/coco-ssd**: AI/ML capabilities
- **Embla Carousel**: Carousel component
- **React Hot Toast & Sonner**: Toast notifications

---

## 📁 Project Structure

```
Performance-Analyzer/
├── src/
│   ├── components/
│   │   ├── AdminLoginModal.tsx       # Admin login modal
│   │   ├── CSVEditor.tsx             # CSV/Excel data editor
│   │   ├── CSVTable.tsx              # Data table for CSV display
│   │   ├── FeatureCard.tsx           # Feature showcase card
│   │   ├── FilterBar.tsx             # Filter controls
│   │   ├── Hero.tsx                  # Landing page hero section
│   │   ├── LoginForm.tsx             # Generic login form
│   │   ├── Navbar.tsx                # Navigation bar
│   │   ├── ProtectedRoute.tsx        # Route protection with role checking
│   │   ├── ThemeProvider.tsx         # Dark/Light theme provider
│   │   ├── ThemeToggle.tsx           # Theme switcher button
│   │   ├── admin/                    # Admin-specific components
│   │   │   ├── AdminDashboard.tsx    # Main admin dashboard
│   │   │   ├── FacultyManagement.tsx # Faculty CRUD operations
│   │   │   ├── HODManagement.tsx     # HOD management
│   │   │   ├── ManageSections.tsx    # Section configuration
│   │   │   ├── StudentData.tsx       # Student data view
│   │   │   ├── StudentDataImport.tsx # Student data import
│   │   │   └── TpoManagement.tsx     # TPO management
│   │   ├── student/                  # Student-specific components
│   │   │   ├── StudentAnalyticsView.tsx    # Analytics dashboard
│   │   │   ├── StudentInsightsDashboard.tsx # AI insights page
│   │   │   └── StudentTestView.tsx   # Test taking interface
│   │   ├── training/                 # Training/Faculty components
│   │   │   ├── AIInsightsTab.tsx     # AI-powered insights
│   │   │   ├── ClassGraph.tsx        # Class performance graph
│   │   │   ├── ClassInsightsDashboard.tsx # Class insights
│   │   │   ├── CreateTestForm.tsx    # Test creation form
│   │   │   ├── CreateTestTab.tsx     # Test creation tab
│   │   │   ├── FacultyDashboard.tsx  # Faculty dashboard
│   │   │   ├── HODDashboard.tsx      # HOD dashboard
│   │   │   ├── PerformanceFilter.tsx # Performance filtering
│   │   │   ├── PlacementManagement.tsx # Placement management
│   │   │   ├── StudentGraph.tsx      # Individual student graph
│   │   │   ├── SubjectManagementForm.tsx # Subject configuration
│   │   │   ├── TestList.tsx          # Test listing
│   │   │   ├── UploadMarksTab.tsx    # Excel marks upload
│   │   │   ├── UserManagementForm.tsx # User management
│   │   │   └── ViewPerformanceTab.tsx # Performance view
│   │   └── ui/                       # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       └── ... (50+ UI components)
│   ├── pages/
│   │   ├── Index.tsx                 # Landing page
│   │   ├── AdminLoginPage.tsx        # Admin login
│   │   ├── FacultyLoginPage.tsx      # Faculty/HOD/TPO login
│   │   ├── StudentLoginPage.tsx      # Student login
│   │   ├── StudentRegistrationPage.tsx # Student sign-up
│   │   ├── AdminDashboard.tsx        # Admin dashboard page
│   │   ├── TrainingAnalyzer.tsx      # Faculty dashboard page
│   │   ├── PlacementHub.tsx          # Student hub page
│   │   ├── AcademicAnalyzer.tsx      # Academic analytics page
│   │   └── NotFound.tsx              # 404 page
│   ├── hooks/
│   │   ├── use-mobile.tsx            # Mobile detection hook
│   │   └── use-toast.ts              # Toast notification hook
│   ├── data/
│   │   ├── mockPerformanceData.ts    # Mock performance data
│   │   ├── mockSectionsData.ts       # Mock sections data
│   │   └── mockTestData.ts           # Mock test data
│   ├── lib/
│   │   └── utils.ts                  # Utility functions
│   ├── App.tsx                       # Root app component
│   ├── App.css                       # Global styles
│   ├── main.tsx                      # React DOM entry point
│   ├── index.css                     # Global CSS
│   ├── config.ts                     # Configuration (API base URL, etc.)
│   └── vite-env.d.ts                 # Vite environment types
├── public/
│   ├── robots.txt
│   └── uploads/                      # User-uploaded files
├── package.json
├── tsconfig.json                     # TypeScript configuration
├── vite.config.ts                    # Vite configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── postcss.config.js                 # PostCSS configuration
└── eslint.config.js                  # ESLint configuration
```

---

## 🎯 Key Features by Component

### Authentication Components

#### **LoginForm.tsx**
- Generic login form component
- Email/username and password fields
- Form validation
- Loading state handling
- Error message display
- Used by all login pages

#### **AdminLoginModal.tsx**
- Modal-based admin login
- Special authentication for administrators
- Secure credential validation

### Page Routes & Flows

#### **Index.tsx** (Landing Page)
- Hero section with project description
- Feature showcase cards
- Call-to-action buttons
- Login options for different user types
- Responsive design

#### **StudentLoginPage.tsx**
- Student login form
- Link to registration page
- Roll number and password input
- Navigation to student dashboard on success

#### **StudentRegistrationPage.tsx**
- New student registration form
- Fields: Name, Roll Number, Password, Section, Branch, Year
- Data validation
- Storage management

#### **AdminLoginPage.tsx**
- Super admin login
- Credentials: ADMIN_USERNAME and ADMIN_PASSWORD (from env)
- Access to complete system management

#### **FacultyLoginPage.tsx**
- Login for Faculty, HOD, and TPO
- Username and password authentication
- Role-based dashboard redirection

### Dashboard Components

#### **AdminDashboard.tsx** (Admin Page)
- HOD Administration Panel
- User management interfaces
- System configuration tools
- Faculty, HOD, TPO, and Student management

#### **TrainingAnalyzer.tsx** (Faculty/HOD/TPO Page)
- Training Performance Analyzer
- Performance tracking and evaluation
- Subject-wise analytics
- Class and individual performance views

#### **PlacementHub.tsx** (Student Page)
- Student placement dashboard
- Job listings display
- Personal profile and statistics
- Test taking interface
- AI insights access

### Admin Components

#### **AdminDashboard.tsx** (Component)
Areas of control:
- Faculty management (Create, Edit, Delete)
- HOD management
- TPO management
- Section creation and management
- Student data viewing and importing
- System settings

#### **FacultyManagement.tsx**
- Add new faculty members
- Edit faculty information
- Delete faculty records
- Assign subjects and roles
- Search and filter capabilities

#### **StudentDataImport.tsx**
- Excel file upload interface
- CSV/Excel data parsing
- Batch student creation
- Data validation before import

#### **ManageSections.tsx**
- Create and manage academic sections
- Link sections to branches and years
- View section-wise student distribution

### Student Components

#### **StudentTestView.tsx**
- Online test taking interface
- Question display with options
- Timer and progress tracking
- Answer submission
- Real-time scoring

#### **StudentInsightsDashboard.tsx**
- AI-powered performance insights
- Personalized improvement recommendations
- Strength and weakness analysis
- Peer comparison data

#### **StudentAnalyticsView.tsx**
- Personal performance metrics
- Subject-wise scores
- Performance trends
- Historical data visualization

### Training/Faculty Components

#### **FacultyDashboard.tsx**
- Central hub for faculty activities
- Class performance overview
- Quick access to key features
- Navigation to subdashboards

#### **CreateTestForm.tsx** / **CreateTestTab.tsx**
- Test creation interface
- Question builder with multiple-choice questions
- Test scheduling (start/end times)
- Upload test to system

#### **UploadMarksTab.tsx**
- Excel file upload for student marks
- Subject selection
- Data validation
- Batch mark entry
- Integration with performance tracking

#### **ClassInsightsDashboard.tsx**
- Class-wide performance analytics
- Average scores and distributions
- Student ranking
- Subject-wise performance comparison
- Trend analysis

#### **StudentGraph.tsx**
- Individual student performance visualization
- Subject-wise score display
- Performance trend line
- Comparative metrics

#### **PerformanceFilter.tsx**
- Filter students by:
  - Section
  - Branch
  - Year
  - Performance category
  - Subject

#### **AIInsightsTab.tsx**
- AI-generated analysis powered by Google Gemini
- Natural language summaries
- Pattern identification
- Recommendations for improvement
- Class and individual insights

### UI Components (shadcn/ui)

Over 50+ customized shadcn components available:
- **Basic**: Button, Badge, Separator, Avatar
- **Forms**: Input, Checkbox, Radio, Select, Textarea
- **Dialogs**: Dialog, AlertDialog, Drawer
- **Navigation**: Tabs, Breadcrumb, NavigationMenu
- **Data**: Table, DataTable, Pagination
- **Feedback**: Toast, Alert, Progress
- **Surfaces**: Card, Sheet, Popover
- **And many more...**

---

## 🔄 Data Flow & API Integration

### API Configuration
- **Base URL**: Configured in `src/config.ts`
- **Typical base**: `http://localhost:8000/api`

### Key API Endpoints Called:

#### Authentication
```
POST /api/students/login
POST /api/students/register
POST /api/teachers/login
POST /api/admin/login
```

#### Student Performance
```
GET /api/performance/{rollNumber}
POST /api/performance/upload
GET /api/performance/class/{section}
```

#### Test Management
```
POST /api/tests/create
GET /api/tests/{testId}
POST /api/tests/{testId}/submit
GET /api/tests/student/{rollNumber}
```

#### User Management (Admin)
```
GET /api/teachers
POST /api/teachers/add
PUT /api/teachers/{id}
DELETE /api/teachers/{id}
```

### Data Fetching Pattern
- Uses React Query for server state management
- Automatic caching and refetching
- Error handling with toast notifications
- Loading states for better UX

---

## 🎨 Styling & Theme

### Tailwind CSS Integration
- Utility-first CSS approach
- Custom color palette
- Responsive breakpoints
- Custom gradient classes (e.g., `bg-space-gradient`)
- Animation utilities

### Theme System
- **Light Theme**: Clean, bright colors
- **Dark Theme**: Dark background with light text
- Theme persistence in localStorage
- Real-time theme switching without page reload

### Custom Styles
- Custom animations: `animate-fade-in`, `animate-slide-up`
- Custom gradients: `bg-space-gradient`
- Glass morphism effect: `glass-card`
- Responsive container patterns

---

## ⚙️ Configuration

### Environment Variables (if needed)
Create a `.env` file in the frontend root:
```
VITE_API_BASE_URL=http://localhost:8000/api
```

### TypeScript Configuration
- Strict mode enabled
- Target: ES2020
- Lib: ES2020 + DOM
- Module resolution: ESM

---

## 🚀 Running the Frontend

### Prerequisites
- Node.js 16+ and npm installed

### Setup & Running
```bash
# Navigate to frontend directory
cd Performance-Analyzer

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm lint
```

---

## 🔐 Security Features

1. **Protected Routes**: `ProtectedRoute.tsx` checks user authentication and role
2. **Local Storage**: User info stored securely (better with JWT in production)
3. **CORS Protection**: Frontend restricted to authorized backend origin
4. **Input Validation**: Forms validate user input before submission
5. **Password Security**: Never exposed in logs or network traces

---

## 📊 Advanced Features

### Chart & Data Visualization
- Interactive charts (likely using recharts or similar)
- Performance distribution graphs
- Trend analysis visualizations
- Comparative analytics

### CSV/Excel Integration
- Parse and display Excel data
- Edit and validate before import
- Visual table representation
- Error handling for invalid formats

### AI Integration (Google Gemini)
- Performance analysis via Gemini API
- Natural language insights
- Recommendation generation
- Integration likely in backend with UI display

---

## 🎯 Best Practices Implemented

1. **Component Organization**: Clear separation by feature
2. **Type Safety**: Full TypeScript coverage
3. **Performance**: React Query for efficient data fetching
4. **Accessibility**: shadcn/ui components are ARIA compliant
5. **Responsive Design**: Works on mobile, tablet, desktop
6. **Error Handling**: User-friendly error messages
7. **State Management**: Local state + server state separation
8. **Code Splitting**: Built-in with Vite

---

## 🐛 Debugging & Development

### Development Tools
- React DevTools browser extension
- TypeScript strict mode for better type checking
- ESLint for code quality
- Vite's fast HMR (Hot Module Replacement)

### Common Development Tasks
1. Adding new component: Create in appropriate folder under `components/`
2. Adding new page: Create in `pages/` and add route in `App.tsx`
3. Styling: Use Tailwind classes or add to `App.css`
4. API calls: Use React Query in component with `useQuery`

---

## 📈 Performance Optimization

1. **Lazy Loading**: Routes can be lazy loaded with React.lazy()
2. **Code Splitting**: Vite automatically splits code by route
3. **Caching**: React Query handles intelligent server-side caching
4. **Image Optimization**: Avatar and image components optimized
5. **Bundle Analysis**: Can be analyzed with Vite plugins

---

## 🔗 Related Documentation

- See `BACKEND_DOCUMENTATION.md` for API specifications
- See `FEATURES.md` for detailed feature descriptions
- See `PROJECT_OVERVIEW.md` for overall system architecture

---

**Version**: 1.0  
**Last Updated**: March 2026  
**Framework Version**: React 18+, Vite 4+

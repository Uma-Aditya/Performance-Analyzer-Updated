# Backend Documentation - Performance Analyzer

## 🖥️ Backend Overview

The backend of the Performance Analyzer is a robust REST API built with FastAPI and Python. It handles all business logic, data persistence, AI-powered insights, and integrations with external services. The backend follows a layered architecture with clear separation of concerns between API routes, database models, and business logic.

---

## 🛠️ Technology Stack

### Core Framework & Server
- **FastAPI**: Modern, fast Python web framework
- **Uvicorn**: ASGI server for running FastAPI
- **Python 3.9+**: Programming language

### Database & ORM
- **SQLAlchemy**: SQL toolkit and ORM for database operations
- **SQLite**: Lightweight, file-based database engine
- **SQLAlchemy ORM**: Object-Relational Mapping for Python classes

### Data Processing & File Handling
- **Pandas**: Data manipulation and analysis
- **openpyxl**: Reading and writing Excel files
- **python-multipart**: Handling multipart form data (file uploads)

### External Services & AI
- **Google Generative AI (genai)**: Gemini API for AI-powered insights
- **Pydantic**: Data validation using Python type annotations
- **python-dotenv**: Environment variable management

### Security & Utilities
- **hashlib**: Password hashing (SHA-256)
- **CORS Middleware**: Cross-Origin Resource Sharing support

---

## 📁 Project Structure

```
backend/
├── main.py                    # Main FastAPI application
├── requirements.txt           # Python package dependencies
├── .env.example              # Example environment variables
├── database.sqlite           # SQLite database (auto-created)
├── clear_db.py              # Database cleanup utility
├── migrate_marks.py          # Data migration script
└── patch_db.py              # Database patch utility
```

### Key Files Explained:

#### **main.py** - Core Backend Application
The heart of the system containing:
- FastAPI application initialization
- Database models using SQLAlchemy
- API route handlers
- Authentication logic
- Data validation schemas
- CORS configuration

#### **requirements.txt**
Contains all Python package dependencies for easy setup and reproduction.

---

## 🗄️ Database Architecture

### Database Models (SQLAlchemy ORM)

#### 1. **StudentPerformance** Model
Stores comprehensive student performance records.

```
Fields:
- id (Integer): Primary key
- rollNumber (String): Student identifier
- name (String): Student full name
- totalMarks (Float): Score obtained
- subject (String): Subject name
- year (String): Academic year
- branch (String): Department/Branch
- section (String): Class section
- uploadedBy (String): Faculty member who uploaded
- uploadedAt (DateTime): Timestamp of upload
- normalized_score (Float): Score normalized against class average
- assessment_score (Float): Computed assessment score
- final_combined_score (Float): Combined performance metric
- performance_category (String): Category (Excellent/Good/Average/Below Average)
```

**Purpose**: Central repository for all academic performance data from various subjects and assessments.

#### 2. **Student** Model
User account information for students.

```
Fields:
- id (Integer): Primary key
- name (String): Full name
- rollNumber (String): Unique roll number
- password (String): Hashed password
- section (String): Class section
- branch (String): Department
- year (String): Academic year
```

**Purpose**: Authentication and profile management for student users.

#### 3. **Teacher** Model
Faculty member accounts with role differentiation.

```
Fields:
- id (Integer): Primary key
- name (String): Full name
- username (String): Unique username
- password (String): Hashed password
- role (String): User role (faculty/hod/tpo)
- subject (String): Primary subject
```

**Purpose**: Faculty, HOD, and TPO user management and authentication.

#### 4. **Section** Model
Academic sections/classes configuration.

```
Fields:
- id (Integer): Primary key
- name (String): Section name (e.g., "A", "B", "CSE-A")
- branch (String): Department/Branch
- year (String): Academic year
```

**Purpose**: Organize students into sections for better grouping and analytics.

#### 5. **Test** Model
Online test configuration and metadata.

```
Fields:
- id (Integer): Primary key
- testName (String): Name of the test
- subject (String): Subject being tested
- year (String): Academic year
- branch (String): Applicable branch
- section (String): Applicable section
- numberOfQuestions (Integer): Total questions
- startTime (String): Test start time (ISO format)
- endTime (String): Test end time (ISO format)
- createdBy (String): Faculty who created
```

**Purpose**: Stores test configurations and metadata for test management.

#### 6. **Question** Model
Individual test questions with options.

```
Fields:
- id (Integer): Primary key
- test_id (Integer): Reference to Test
- question (Text): Question text
- option_a (String): Option A
- option_b (String): Option B
- option_c (String): Option C
- option_d (String): Option D
- correct_answer (String): Correct option (A/B/C/D)
```

**Purpose**: Stores question bank for online tests.

#### 7. **StudentTestResult** Model
Aggregate test results for students.

```
Fields:
- id (Integer): Primary key
- student_roll (String): Student roll number
- test_id (Integer): Reference to Test
- score (Integer): Score obtained
- total_questions (Integer): Total questions in test
- submitted_at (DateTime): Submission timestamp
```

**Purpose**: Records final test scores and results.

#### 8. **StudentAnswer** Model
Detailed student answers for audit and analysis.

```
Fields:
- id (Integer): Primary key
- student_roll (String): Student roll number
- test_id (Integer): Reference to Test
- question_id (Integer): Reference to Question
- selected_answer (String): Answer selected (A/B/C/D)
- submitted_at (DateTime): Timestamp
```

**Purpose**: Records individual question answers for detailed analysis.

#### 9. **Job** Model (Implied)
Job postings for placements.

```
Fields:
- title (String): Job title
- description (Text): Job description
- company (String): Company name
- year (String): Eligible academic year
- branch (String): Eligible branch
- section (String): Eligible section
- posted_by (String): Posted by (TPO username)
```

**Purpose**: Manage job postings and placement opportunities.

---

## 🔌 API Endpoints

### Authentication Endpoints

#### **POST /api/admin/login**
Admin login endpoint for system administrators.

**Request:**
```json
{
  "username": "superadmin",
  "password": "superadmin123"
}
```

**Response:**
```json
{
  "message": "Admin login successful",
  "admin": {
    "role": "admin",
    "username": "superadmin"
  }
}
```

**Implementation**: Validates credentials against environment variables `ADMIN_USERNAME` and `ADMIN_PASSWORD`.

---

#### **POST /api/students/login**
Student login with roll number authentication.

**Request:**
```json
{
  "rollNumber": "CSE001",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "student": {
    "name": "John Doe",
    "rollNumber": "CSE001",
    "section": "A",
    "branch": "CSE",
    "year": "3"
  }
}
```

**Error**: 401 Unauthorized if credentials invalid.

---

#### **POST /api/students/register**
New student registration.

**Request:**
```json
{
  "name": "Jane Doe",
  "rollNumber": "CSE002",
  "password": "password123",
  "section": "A",
  "branch": "CSE",
  "year": "2"
}
```

**Response:**
```json
{
  "message": "Student registered successfully"
}
```

**Error**: 400 Bad Request if student already exists.

---

#### **POST /api/teachers/login**
Faculty/HOD/TPO login.

**Request:**
```json
{
  "username": "faculty1",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "teacher": {
    "id": 1,
    "name": "Dr. Smith",
    "username": "faculty1",
    "role": "faculty",
    "subject": "Mathematics"
  }
}
```

---

### Teacher/Faculty Management Endpoints

#### **POST /api/teachers/add**
Add new faculty, HOD, or TPO.

**Request:**
```json
{
  "name": "Dr. Johnson",
  "username": "johnson",
  "password": "securepass",
  "role": "faculty",
  "subject": "Physics"
}
```

**Response:**
```json
{
  "message": "Teacher added successfully",
  "teacher": { /* teacher details */ }
}
```

**Validation**: Ensures username uniqueness.

---

#### **GET /api/teachers**
Retrieve all teachers.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Dr. Smith",
    "username": "smith",
    "role": "faculty",
    "subject": "Mathematics"
  },
  /* more teachers */
]
```

---

#### **PUT /api/teachers/{teacher_id}**
Update teacher information.

**Request:**
```json
{
  "name": "Dr. Smith Updated",
  "subject": "Applied Mathematics"
}
```

---

#### **DELETE /api/teachers/{teacher_id}**
Delete a teacher account.

---

### Student Management Endpoints

#### **GET /api/students**
List all students.

**Query Parameters**:
- `section`: Filter by section
- `branch`: Filter by branch
- `year`: Filter by year

**Response**: Array of student objects.

---

#### **PUT /api/students/{student_id}**
Update student profile.

---

#### **DELETE /api/students/{student_id}**
Remove student account.

---

### Performance Data Endpoints

#### **POST /api/performance/upload**
Upload marks from Excel file.

**Form Data:**
- `file`: Excel file (.xlsx, .xls)
- `subject`: Subject name
- `year`: Academic year
- `branch`: Branch/Department
- `section`: Section
- `uploadedBy`: Faculty username

**Processing:**
1. Parses Excel file using openpyxl/pandas
2. Validates data format
3. Creates StudentPerformance records
4. Computes: normalized_score, assessment_score, final_combined_score
5. Auto-generates performance_category based on scores

**Response:**
```json
{
  "message": "Marks uploaded successfully",
  "records_created": 45,
  "records_with_errors": 0
}
```

---

#### **GET /api/performance/{rollNumber}**
Get individual student performance.

**Response:**
```json
{
  "rollNumber": "CSE001",
  "name": "John Doe",
  "records": [
    {
      "subject": "Mathematics",
      "totalMarks": 85,
      "normalized_score": 0.92,
      "performance_category": "Excellent"
    },
    /* more subjects */
  ],
  "overall_performance": { /* summary */ }
}
```

---

#### **GET /api/performance/class/{section}**
Get class-wide performance analytics.

**Response:**
```json
{
  "section": "A",
  "totalStudents": 45,
  "averageScore": 72.5,
  "distribution": {
    "Excellent": 12,
    "Good": 18,
    "Average": 10,
    "Below Average": 5
  },
  "topPerformers": [ /* top 5 */ ],
  "subjectBreakdown": { /* subject-wise stats */ }
}
```

---

#### **GET /api/performance/analytics**
Advanced performance analytics.

**Query Parameters**:
- `section`: Section filter
- `year`: Year filter
- `subject`: Subject filter

**Response**: Detailed analytics with trends, comparisons, insights.

---

### Test Management Endpoints

#### **POST /api/tests/create**
Create new test with questions.

**Request:**
```json
{
  "testName": "Mid-Term Exam",
  "subject": "Database Systems",
  "year": "3",
  "branch": "CSE",
  "section": "A",
  "numberOfQuestions": 20,
  "startTime": "2024-03-25T10:00:00",
  "endTime": "2024-03-25T11:30:00",
  "createdBy": "faculty1",
  "questions": [
    {
      "question": "What is a database?",
      "option_a": "...",
      "option_b": "...",
      "option_c": "...",
      "option_d": "...",
      "correct_answer": "a"
    },
    /* more questions */
  ]
}
```

---

#### **GET /api/tests/{testId}**
Get test details with questions.

**Response:**
```json
{
  "id": 1,
  "testName": "Mid-Term Exam",
  "subject": "Database Systems",
  "numberOfQuestions": 20,
  "startTime": "2024-03-25T10:00:00",
  "endTime": "2024-03-25T11:30:00",
  "questions": [
    {
      "id": 1,
      "question": "What is a database?",
      "options": ["Option A", "Option B", "Option C", "Option D"]
    },
    /* questions without showing correct answer */
  ]
}
```

---

#### **POST /api/tests/{testId}/submit**
Submit test answers.

**Request:**
```json
{
  "student_roll": "CSE001",
  "answers": {
    "1": "a",
    "2": "b",
    "3": "c",
    /* more answers */
  }
}
```

**Processing:**
1. Validates all answers submitted
2. Compares with correct answers
3. Calculates score
4. Creates StudentTestResult record
5. Stores individual StudentAnswer records

**Response:**
```json
{
  "message": "Test submitted successfully",
  "score": 18,
  "total_questions": 20,
  "percentage": 90.0,
  "passed": true
}
```

---

#### **GET /api/tests/student/{rollNumber}**
Get all test results for a student.

**Response:**
```json
{
  "student_roll": "CSE001",
  "tests": [
    {
      "testName": "Mid-Term Exam",
      "subject": "Database Systems",
      "score": 18,
      "total_questions": 20,
      "percentage": 90.0,
      "submitted_at": "2024-03-25T11:30:00"
    },
    /* more tests */
  ]
}
```

---

### Section Management Endpoints

#### **POST /api/sections/create**
Create new academic section.

**Request:**
```json
{
  "name": "CSE-A",
  "branch": "Computer Science",
  "year": "3"
}
```

---

#### **GET /api/sections**
List all sections.

**Response**: Array of sections with details.

---

### Placement Management Endpoints

#### **POST /api/jobs/create**
Post new job opportunity.

**Request:**
```json
{
  "title": "Software Engineer",
  "description": "...",
  "company": "Tech Corp",
  "year": "3",
  "branch": "CSE",
  "section": "A",
  "posted_by": "tpo1"
}
```

---

#### **GET /api/jobs**
List all job postings.

**Query Parameters**:
- `eligible_for_roll`: Filter jobs for specific student
- `year`: Filter by year
- `branch`: Filter by branch

---

### AI Insights Endpoint

#### **POST /api/insights/analyze**
Get AI-powered performance insights using Google Gemini.

**Request:**
```json
{
  "student_roll": "CSE001",
  "type": "performance",
  "scope": "individual" /* or "class" */
}
```

**Processing**:
1. Retrieves student performance data
2. Formats data for Gemini API
3. Sends to Google Generative AI
4. Receives natural language insights
5. Returns formatted response

**Response:**
```json
{
  "analysis": "Student John Doe shows excellent performance in...",
  "strengths": ["Strong in mathematics", "Quick learner"],
  "weaknesses": ["Needs improvement in practical skills"],
  "recommendations": ["Practice more coding problems", "...]
}
```

---

## 🔐 Security Implementation

### Password Security
- **Hashing**: SHA-256 hashing using `hashlib`
- **Backward Compatibility**: Supports both hashed and plain-text passwords (for migration)
- **Function**: `hash_password(password: str) -> str`

### Authentication Pattern
- Validates credentials from database
- Returns role and user info on success
- Raises HTTPException(401) on failure
- Frontend stores in localStorage (consider JWT for production)

### CORS Protection
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Should be restricted in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Environment Variables
Sensitive data stored in `.env`:
- `GEMINI_API_KEY`: API key for Google Generative AI
- `ADMIN_USERNAME`: Super admin username
- `ADMIN_PASSWORD`: Super admin password
- Never commit `.env` file to version control

---

## 🤖 AI Integration (Google Gemini)

### Setup
1. Set `GEMINI_API_KEY` in environment variables
2. Initialize with: `genai.configure(api_key=GEMINI_API_KEY)`
3. Use in analyze endpoints

### Typical Usage Pattern
```python
import google.generativeai as genai

# Setup
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-pro")

# Generate insights
response = model.generate_content(f"Analyze this student data: {data}")
return {"analysis": response.text}
```

### Benefits
- Natural language analysis of performance data
- Automated insights and recommendations
- Pattern identification
- Personalized suggestions for students

---

## 📊 Data Flow Examples

### Mark Upload Flow
1. Faculty uploads Excel file via frontend
2. Server receives multipart form data
3. `main.py` parses Excel with pandas
4. Creates StudentPerformance records
5. Computes normalized and combined scores
6. Auto-categorizes performance
7. Returns success with record count

### Test Taking Flow
1. Student retrieves test questions (without answers)
2. Student selects answers on frontend
3. Submits all answers to `/submit` endpoint
4. Server validates submission time
5. Compares answers with correct answers
6. Calculates score
7. Stores result and individual answers
8. Returns score and feedback

### Performance Analytics Flow
1. Request class performance for section "A"
2. Server queries all StudentPerformance records for section
3. Calculates: average, distribution, top performers
4. Groups by subject
5. Returns comprehensive analytics JSON

---

## 🚀 Backend Setup & Running

### Prerequisites
- Python 3.9 or higher
- pip package manager

### Installation
```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your configuration

# Set your Gemini API key
# GEMINI_API_KEY=your_api_key_here
```

### Running the Server
```bash
# Run with Uvicorn
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# The API will be available at http://localhost:8000
# Swagger docs: http://localhost:8000/docs
# ReDoc docs: http://localhost:8000/redoc
```

### Database Management
```bash
# Clear database
python clear_db.py

# Migrate marks data
python migrate_marks.py

# Apply patches
python patch_db.py
```

---

## 📈 Performance Scoring Algorithm

### Normalized Score Calculation
```
normalized_score = (student_marks / class_average) * 100
- Scales student score relative to class performance
- Values > 100 indicate above-average performance
- Allows fair comparison across different subjects/years
```

### Assessment Score
```
assessment_score = (totalMarks / 100) * weighted_factor
- Weights performance based on subject difficulty
- Ranges from 0-100
```

### Final Combined Score
```
final_combined_score = (normalized_score + assessment_score) / 2
- Balances both metrics
- Final metric for comparison and ranking
```

### Performance Categorization
```
- Excellent: score >= 85
- Good: score >= 70 and < 85
- Average: score >= 55 and < 70
- Below Average: score < 55
```

---

## 🐛 Error Handling

### HTTP Exceptions
- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Authentication failed
- **404 Not Found**: Resource doesn't exist
- **500 Internal Server Error**: Server-side issue

### Logging
```python
import logging
logger = logging.getLogger(__name__)
logger.info("Message")
logger.warning("Warning")
logger.error("Error")
```

---

## 📞 Testing API Endpoints

### Using cURL
```bash
curl -X POST http://localhost:8000/api/students/login \
  -H "Content-Type: application/json" \
  -d '{"rollNumber": "CSE001", "password": "password"}'
```

### Using Swagger UI
- Navigate to: `http://localhost:8000/docs`
- All endpoints documented with try-it feature

### Using ReDoc
- Navigate to: `http://localhost:8000/redoc`
- Read-only API documentation

---

## 🔗 Related Documentation

- See `FRONTEND_DOCUMENTATION.md` for API client implementation
- See `FEATURES.md` for detailed feature descriptions
- See `PROJECT_OVERVIEW.md` for architecture overview

---

**Version**: 1.0  
**Last Updated**: March 2026  
**FastAPI Version**: 0.103.1+  
**Python Version**: 3.9+

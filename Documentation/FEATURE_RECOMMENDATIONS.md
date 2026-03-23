# Performance Analyzer — New Feature Recommendations

**Project Version**: 1.0  
**Analysis Date**: March 2026  
**Total Proposed Features**: 24  

---

## How to Read This Document

Each feature entry includes:
- **Description** — What the feature does
- **Value** — Why it matters for users or the system
- **Affects** — Frontend, Backend, or Both

Features are grouped into six strategic categories.

---

## Category 1 — Student Experience Enhancements

---

### F-01 · Personal Goal Setting & Milestone Tracker

**Description**  
Allow students to set academic targets per subject (e.g., "I want to score above 75 in Data Structures") and track progress toward those goals over time. Goals are stored per student, and a progress indicator shows how close they are to each milestone.

**Value**  
Students currently have passive visibility into their performance. Adding goal-setting transforms the dashboard from a read-only report into an actionable planning tool, increasing engagement and self-directed improvement.

**Affects**: Both  
Backend: New `StudentGoal` model (rollNumber, subject, targetScore, deadline, status). Frontend: Goal creation modal in `StudentAnalyticsView.tsx`, progress ring component per goal.

---

### F-02 · Test History & Retake Analytics

**Description**  
Show students a detailed test history page listing all past attempts with score, time taken, date, and performance category. For tests with multiple attempts allowed, display an improvement trend chart comparing attempt scores side by side.

**Value**  
Currently students can view individual test results, but there is no consolidated history view or trend visualization. This feature makes growth visible and encourages students to identify patterns in their test-taking performance.

**Affects**: Both  
Backend: Query endpoint `GET /api/students/{rollNumber}/test-history` aggregating `StudentTestResult` records. Frontend: New `TestHistoryView.tsx` component inside the Tests tab of `PlacementHub.tsx`.

---

### F-03 · Downloadable Personal Performance Report (PDF)

**Description**  
Allow students to generate and download a one-page PDF summary of their academic performance — including subject-wise scores, test results, performance category, and AI insights summary — formatted as an institutional report card.

**Value**  
Students frequently need performance evidence for scholarship applications, internship applications, and parent meetings. Automating this eliminates manual data collection and produces a professional, shareable document.

**Affects**: Both  
Backend: New endpoint `GET /api/students/{rollNumber}/report/pdf` using a library like `reportlab` or `weasyprint`. Frontend: Download button in `StudentAnalyticsView.tsx`.

---

### F-04 · Subject-Wise Study Resource Links

**Description**  
Enable faculty to attach curated resource links (YouTube videos, articles, documentation) to a subject. Students viewing their performance in that subject see a "Resources" section alongside their score with links directly relevant to their weak areas.

**Value**  
The AI insights feature already identifies weak areas, but provides no direct remediation path. Resource links bridge the gap between diagnosis and action without requiring a full LMS integration.

**Affects**: Both  
Backend: New `SubjectResource` model (subject, title, url, addedBy). CRUD endpoints for faculty. Frontend: Resource cards in `StudentAnalyticsView.tsx` rendered conditionally when the student's score is below a threshold.

---

### F-05 · Test Countdown & Schedule Reminder Banner

**Description**  
Display a persistent banner or notification card on the student dashboard when a test is scheduled within the next 24 hours, showing the test name, subject, and time remaining as a live countdown.

**Value**  
Students currently have to manually check the Tests tab to discover upcoming tests. A proactive countdown reduces missed attempts and the administrative burden on faculty who have to remind students manually.

**Affects**: Frontend only  
New `UpcomingTestBanner.tsx` component in `PlacementHub.tsx`, using the existing test data already fetched from `GET /api/tests`. Countdown computed client-side with a `setInterval` hook.

---

## Category 2 — Faculty & HOD Workflow Improvements

---

### F-06 · Bulk Test Question Import via Excel/CSV

**Description**  
Allow faculty to create a test by uploading an Excel file containing questions, options, and correct answers — instead of entering each question manually through the form. Provide a downloadable template file to guide formatting.

**Value**  
Faculty with large question banks (50–100 questions) find manual entry through `CreateTestForm.tsx` extremely time-consuming. This mirrors the existing Excel-based marks upload workflow that the system already supports, so it is architecturally consistent.

**Affects**: Both  
Backend: New endpoint `POST /api/tests/import-questions` using pandas to parse the uploaded file. Frontend: File upload section added to `CreateTestTab.tsx` with a template download button.

---

### F-07 · Class Performance Snapshot Email Digest (Weekly Summary)

**Description**  
Introduce a scheduled backend job that compiles a weekly class performance summary — average scores, top performers, students below threshold — and makes it available as a downloadable digest report that faculty can access from their dashboard.

**Value**  
Faculty currently need to manually navigate to the performance tab to check on their class. A digest report reduces the effort required for routine monitoring and supports HODs who oversee multiple sections.

**Affects**: Both  
Backend: A scheduled Python task (using APScheduler) generating summary statistics and saving them as `ClassDigest` records. Frontend: New "Weekly Digest" card in `FacultyDashboard.tsx` with a download option.

---

### F-08 · At-Risk Student Automatic Flagging

**Description**  
Automatically flag students whose performance drops below a configurable threshold (e.g., normalized score < 40 or two consecutive declining test scores) and surface them in a dedicated "Needs Attention" section of the faculty and HOD dashboards.

**Value**  
Identifying at-risk students early is one of the stated goals of the system, but currently this requires manual inspection of data. Automated flagging converts the system from reactive to proactive, enabling timely academic intervention.

**Affects**: Both  
Backend: Logic in the marks upload endpoint and a new `GET /api/performance/at-risk` endpoint that queries for flagged students. Frontend: Alert card in `FacultyDashboard.tsx` and `HODDashboard.tsx`.

---

### F-09 · Subject-Level Performance Comparison Across Sections

**Description**  
Allow HODs to view a side-by-side comparison of the same subject's average performance across all sections within a branch and year (e.g., CSE Section A vs. Section B vs. Section C for Data Structures).

**Value**  
HODs currently see department-wide data but cannot easily compare section-level outcomes for the same subject. This comparison is essential for identifying teaching effectiveness differences and balancing curriculum delivery.

**Affects**: Both  
Backend: New aggregation endpoint `GET /api/performance/cross-section-comparison?subject=&year=&branch=`. Frontend: New grouped bar chart in `HODDashboard.tsx` using the existing Recharts setup.

---

### F-10 · Test Result Release Control

**Description**  
Allow faculty to control exactly when test results become visible to students — either immediately after submission, after all students have attempted, or on a manually set date. A "Release Results" toggle in the test management UI triggers visibility.

**Value**  
Currently results visibility is binary. Allowing faculty to delay result release is standard in academic settings where fairness requires all students to complete the test before anyone sees the answers or scores.

**Affects**: Both  
Backend: Add `resultsReleasedAt` (DateTime, nullable) field to the `Test` model. Student result query checks this field before returning data. Frontend: Release control UI in `TestList.tsx` for the faculty view.

---

## Category 3 — Placement & TPO Module Improvements

---

### F-11 · Student Eligibility Auto-Filter for Job Postings

**Description**  
When a TPO posts a job with eligibility criteria (year, branch, minimum CGPA/score), automatically compute and display the count of eligible students. Additionally, show TPO a pre-filtered list of eligible students directly on the job posting detail page.

**Value**  
TPOs currently manage eligibility manually. Automating this saves significant time during high-volume placement seasons and eliminates eligibility errors that could cause student complaints.

**Affects**: Both  
Backend: New endpoint `GET /api/jobs/{jobId}/eligible-students` cross-referencing job criteria with `StudentPerformance` aggregates. Frontend: Eligible count badge and expandable student list in `PlacementManagement.tsx`.

---

### F-12 · Placement Statistics Dashboard for HOD/Admin

**Description**  
Add a dedicated Placements Summary view accessible to HODs and Admins showing: total placed students, placement rate by branch and year, top recruiting companies, average package offered, and year-over-year placement trend.

**Value**  
Placement outcomes are a key institutional metric. Currently placement data is managed by TPO but has no summary view for leadership. This gives HODs and Admins actionable insight without requiring access to individual application records.

**Affects**: Both  
Backend: New aggregation endpoints for placement statistics. Frontend: New `PlacementStatsDashboard.tsx` component accessible from `HODDashboard.tsx` and `AdminDashboard.tsx`.

---

### F-13 · Job Application Status Timeline

**Description**  
Replace the current static application status with a visual timeline showing application stages — Applied → Shortlisted → Interview Scheduled → Offer Extended → Placed / Rejected. Students see their stage per company, and TPO can update stages from their dashboard.

**Value**  
The current application status is a single status field. A timeline makes the process transparent to students, reduces status-inquiry messages to the TPO, and creates a clear audit trail of placement progress.

**Affects**: Both  
Backend: New `ApplicationStageHistory` model storing stage changes with timestamps. Frontend: Timeline component in the Jobs tab of `PlacementHub.tsx` and stage update controls in `PlacementManagement.tsx`.

---

## Category 4 — Analytics & AI Enhancements

---

### F-14 · Predictive Performance Score

**Description**  
Using a student's historical performance trend and current test scores, generate a predicted end-of-semester score per subject. Display this as a "Predicted Final Score" alongside current performance with a confidence indicator.

**Value**  
Predictive analytics is listed as a future enhancement in the project overview. The existing data model (normalized scores, assessment scores, historical records) provides sufficient input for a trend-based projection without requiring external ML infrastructure.

**Affects**: Both  
Backend: New computation function using linear regression (scipy/numpy) applied to historical `StudentPerformance` records, exposed via `GET /api/students/{rollNumber}/predictions`. Frontend: Prediction card in `StudentAnalyticsView.tsx`.

---

### F-15 · AI Insights Caching with Freshness Indicator

**Description**  
Cache AI-generated insights per student with a timestamp. Show the date the insights were last generated and a "Refresh" button. Serve cached insights instantly on load; only call the Gemini API when explicitly refreshed or when data has changed since the last generation.

**Value**  
Currently every insights page load may trigger a Gemini API call, incurring latency and cost. Caching reduces API costs significantly for institutions with hundreds of students and eliminates the wait time on subsequent dashboard visits.

**Affects**: Both  
Backend: Add `InsightCache` model (rollNumber/entityId, insightText, generatedAt, dataHash). Frontend: Freshness badge and explicit Refresh button in `StudentInsightsDashboard.tsx` and `AIInsightsTab.tsx`.

---

### F-16 · Branch & Year-Level Analytics for Admin

**Description**  
Add a system-wide analytics view for Admins showing aggregated performance metrics across all branches and years: performance category distribution (Excellent / Good / Average / Below Average) as stacked bar charts, with drill-down to branch → year → section level.

**Value**  
Admins currently manage users and system settings but lack a high-level academic analytics view. Institution leadership needs this type of aggregated overview for reporting, accreditation, and strategic decisions.

**Affects**: Both  
Backend: New aggregation endpoints grouped by branch and year. Frontend: New `SystemAnalyticsDashboard.tsx` component in `AdminDashboard.tsx` using nested Recharts bar charts.

---

### F-17 · Custom Date Range Filtering for Performance Data

**Description**  
Allow faculty, HOD, and Admin users to filter all performance charts and tables by a custom date range — selecting start and end dates to view marks uploaded within that period. Complements the existing branch/year/section filters.

**Value**  
The current filters (branch, year, section) are structural. Time-based filtering is critical for mid-semester reviews, exam period analysis, and comparing pre/post-intervention performance — none of which are possible today.

**Affects**: Both  
Backend: Add optional `from_date` and `to_date` query parameters to performance endpoints, filtering on `uploadedAt`. Frontend: Date range picker (using the existing shadcn/ui `calendar.tsx` and `popover.tsx`) added to `PerformanceFilter.tsx`.

---

## Category 5 — Administrator & Developer Experience

---

### F-18 · Audit Log Viewer

**Description**  
Record key system actions — user creation, marks uploads, test creation, job postings, and role changes — in an `AuditLog` table. Expose a paginated, searchable Audit Log viewer in the Admin dashboard.

**Value**  
With multiple faculty members uploading marks and managing tests, there is currently no way for admins to trace who changed what data and when. An audit log is essential for accountability and debugging data discrepancies.

**Affects**: Both  
Backend: New `AuditLog` model (actorUsername, actorRole, action, entityType, entityId, timestamp, details). Log writes added to key endpoints. New `GET /api/admin/audit-log` endpoint with pagination. Frontend: New `AuditLogViewer.tsx` tab in `AdminDashboard.tsx`.

---

### F-19 · System Health & Statistics Panel

**Description**  
Add a system statistics panel in the Admin dashboard displaying live counts: total students, total faculty, tests created, marks uploaded, average system performance score, and database size. Include a simple API response time indicator.

**Value**  
Admins currently have no at-a-glance view of the system's operational state. This panel makes it immediately clear if the system is growing as expected and surfaces anomalies (e.g., unexpectedly few uploads) without querying the database directly.

**Affects**: Both  
Backend: New lightweight `GET /api/admin/stats` endpoint performing fast `COUNT` queries across all major tables. Frontend: Stats card grid at the top of `AdminDashboard.tsx` using skeleton loaders while data loads.

---

### F-20 · Backend Modularization (Code Structure)

**Description**  
Refactor `backend/main.py` — which currently holds all models, routes, schemas, and business logic in a single file — into a structured package with separate modules: `models/`, `routes/`, `schemas/`, and `services/`.

**Value**  
The folder structure documentation already recommends this expansion. With 900+ lines in a single file, onboarding new developers and isolating bugs is increasingly difficult. Modularization does not change any functionality but dramatically improves maintainability and testability.

**Affects**: Backend only  
Create `backend/app/` package with submodules. Update imports in `main.py` (which becomes the entry point only). No API changes required.

---

### F-21 · Frontend API Service Layer

**Description**  
Extract all raw `fetch`/`axios` calls currently embedded inside React components into a dedicated `src/services/` directory with typed service functions (e.g., `studentService.ts`, `testService.ts`, `performanceService.ts`).

**Value**  
The folder structure documentation already calls this out as a recommended expansion. Currently, API logic is tightly coupled to UI components, making it hard to test, reuse, or update when endpoints change. A service layer enables clean separation of concerns.

**Affects**: Frontend only  
Create `src/services/` with one file per domain. Components call service functions instead of raw fetch. No new features added, but enables faster development of all future features.

---

### F-22 · Automated Backend Test Suite

**Description**  
Create a `backend/tests/` directory with pytest-based tests covering critical API endpoints: student registration, login, marks upload, test creation, and result submission. Include a GitHub Actions workflow file to run tests on every push.

**Value**  
The backend has no test coverage. Given that marks data and test results are academically critical, regressions in these endpoints could have real consequences. A basic test suite provides a safety net for all future development.

**Affects**: Backend only  
New `backend/tests/` directory with `test_students.py`, `test_performance.py`, `test_tests.py`. Uses `pytest` and `httpx` for async FastAPI testing. Add `pytest` and `httpx` to `requirements.txt`.

---

## Category 6 — Data Management & Scalability

---

### F-23 · Database Migration to PostgreSQL (Upgrade Path)

**Description**  
Add configuration support for connecting to a PostgreSQL database as an alternative to SQLite, controlled via an environment variable (`DATABASE_URL`). SQLAlchemy already abstracts the database layer, making this a configuration-level change.

**Value**  
SQLite is suitable for development and small deployments but does not support concurrent writes well, which becomes a bottleneck when multiple faculty upload marks simultaneously. Providing a PostgreSQL path future-proofs the system for institutional-scale deployment with no model changes required.

**Affects**: Backend only  
Update `database.py` (or the DB init section of `main.py`) to read `DATABASE_URL` from `.env`. Add `psycopg2-binary` to `requirements.txt`. Update `.env.example` with the new variable.

---

### F-24 · Data Backup & Restore Utility

**Description**  
Create a `backup.py` script that exports the entire SQLite database to a timestamped JSON file (or compressed archive), and a corresponding `restore.py` that re-imports it. Add documentation for scheduling regular backups.

**Value**  
Currently, the only data protection scripts are `clear_db.py` and `patch_db.py`. There is no backup mechanism, meaning a corrupted or accidentally cleared database would result in permanent data loss. This is especially critical for marks and test result data.

**Affects**: Backend only  
New `backend/backup.py` and `backend/restore.py` scripts. Uses SQLAlchemy reflection to export all tables to JSON. Outputs to a `backups/` directory with ISO timestamp filenames.

---

## Summary Table

| ID | Feature | Category | Affects | Effort |
|----|---------|----------|---------|--------|
| F-01 | Personal Goal Setting & Milestone Tracker | Student UX | Both | Medium |
| F-02 | Test History & Retake Analytics | Student UX | Both | Low |
| F-03 | Downloadable Personal Performance Report (PDF) | Student UX | Both | Medium |
| F-04 | Subject-Wise Study Resource Links | Student UX | Both | Low |
| F-05 | Test Countdown & Schedule Reminder Banner | Student UX | Frontend | Low |
| F-06 | Bulk Test Question Import via Excel/CSV | Faculty Workflow | Both | Medium |
| F-07 | Class Performance Snapshot Weekly Digest | Faculty Workflow | Both | Medium |
| F-08 | At-Risk Student Automatic Flagging | Faculty Workflow | Both | Medium |
| F-09 | Subject Performance Comparison Across Sections | Faculty Workflow | Both | Low |
| F-10 | Test Result Release Control | Faculty Workflow | Both | Low |
| F-11 | Student Eligibility Auto-Filter for Job Postings | Placement | Both | Low |
| F-12 | Placement Statistics Dashboard for HOD/Admin | Placement | Both | Medium |
| F-13 | Job Application Status Timeline | Placement | Both | Medium |
| F-14 | Predictive Performance Score | Analytics & AI | Both | High |
| F-15 | AI Insights Caching with Freshness Indicator | Analytics & AI | Both | Low |
| F-16 | Branch & Year-Level Analytics for Admin | Analytics & AI | Both | Medium |
| F-17 | Custom Date Range Filtering for Performance Data | Analytics & AI | Both | Low |
| F-18 | Audit Log Viewer | Admin & DevEx | Both | Medium |
| F-19 | System Health & Statistics Panel | Admin & DevEx | Both | Low |
| F-20 | Backend Modularization | Admin & DevEx | Backend | Medium |
| F-21 | Frontend API Service Layer | Admin & DevEx | Frontend | Medium |
| F-22 | Automated Backend Test Suite | Admin & DevEx | Backend | Medium |
| F-23 | Database Migration to PostgreSQL (Upgrade Path) | Scalability | Backend | Low |
| F-24 | Data Backup & Restore Utility | Scalability | Backend | Low |

**Effort scale**: Low = 1–2 days · Medium = 3–5 days · High = 1–2 weeks

---

*Document prepared based on analysis of PROJECT_OVERVIEW.md, FEATURES.md, FOLDER_STRUCTURE.md, BACKEND_DOCUMENTATION.md, and FRONTEND_DOCUMENTATION.md.*

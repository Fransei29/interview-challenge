# 🚀 Oxyera Medication Tracker

A full-stack mini-app to manage patients, medications, and their treatment assignments for a digital health workflow.

## 🚀 Implementation Summary

### ✅ **Backend Implementation (NestJS)**

**Database & Models:**
- ✅ SQLite database with proper schema for `patients`, `medications`, and `assignments` tables
- ✅ TypeORM entities with proper relationships (Patient has many Assignments, Medication has many Assignments)
- ✅ Environment configuration for database path and port

**CRUD APIs:**
- ✅ **Patient Controller**: Full CRUD operations with validation
  - `GET /patients` - List all patients
  - `GET /patients/:id` - Get patient by ID
  - `POST /patients` - Create new patient
  - `PUT /patients/:id` - Update patient
  - `DELETE /patients/:id` - Delete patient
- ✅ **Medication Controller**: Full CRUD operations with validation
  - `GET /medications` - List all medications
  - `GET /medications/:id` - Get medication by ID
  - `POST /medications` - Create new medication
  - `PUT /medications/:id` - Update medication
  - `DELETE /medications/:id` - Delete medication
- ✅ **Assignment Controller**: Full CRUD operations with validation
  - `GET /assignments` - List all assignments with patient and medication details
  - `GET /assignments/:id` - Get assignment by ID
  - `POST /assignments` - Create new assignment
  - `PUT /assignments/:id` - Update assignment
  - `DELETE /assignments/:id` - Delete assignment

**Core Features:**
- ✅ **Remaining Days Calculation**: Utility function that calculates remaining treatment days based on start date + duration - current date
- ✅ **Input Validation**: Comprehensive validation using class-validator decorators
- ✅ **Error Handling**: Proper HTTP status codes and error messages
- ✅ **TypeScript**: Full type safety throughout the application

**Testing:**
- ✅ **Unit Tests**: Comprehensive test coverage for all services
  - PatientService tests (CRUD operations)
  - MedicationService tests (CRUD operations)
  - AssignmentService tests (CRUD operations)
  - Remaining days calculation utility tests
- ✅ **Integration Tests**: Controller tests with proper mocking
- ✅ **Edge Cases**: Tests for date calculations, not found scenarios, and validation errors

### ✅ **Frontend Implementation (Next.js)**

**Pages & Navigation:**
- ✅ **Dashboard** (`/`): Shows all assignments with remaining treatment days
- ✅ **Create Patient** (`/patients/create`): Form to create new patients
- ✅ **Create Medication** (`/medications/create`): Form to create new medications
- ✅ **Create Assignment** (`/assignments/create`): Form to assign medications to patients
- ✅ **Navigation**: Clean navigation between pages with back buttons

**UI/UX Features:**
- ✅ **Modern Design**: Minimalistic and clean UI with max-width of 1250px
- ✅ **Tailwind CSS**: Responsive design with proper styling
- ✅ **Form Validation**: Client-side validation with proper error messages
- ✅ **Loading States**: Loading indicators during API calls
- ✅ **Error Handling**: User-friendly error messages
- ✅ **Responsive Design**: Works on different screen sizes

**API Integration:**
- ✅ **API Utilities**: Centralized API functions for all CRUD operations
- ✅ **Global Configuration**: Backend URL configuration
- ✅ **Type Safety**: TypeScript interfaces for all API responses
- ✅ **Error Handling**: Proper error handling for API calls

**Key Features:**
- ✅ **Assignment Dashboard**: Displays all assignments with:
  - Patient name and date of birth
  - Medication name, dosage, and frequency
  - Start date and duration
  - **Remaining treatment days** (highlighted)
- ✅ **Form Components**: Reusable form components with validation
- ✅ **Back Button**: Reusable navigation component

### ✅ **Technical Excellence**

**Code Quality:**
- ✅ **Clean Architecture**: Proper separation of concerns
- ✅ **TypeScript**: Full type safety in both frontend and backend
- ✅ **Error Handling**: Comprehensive error handling throughout
- ✅ **Validation**: Both client-side and server-side validation
- ✅ **Testing**: High test coverage with unit and integration tests

**Database:**
- ✅ **SQLite**: Properly configured with TypeORM
- ✅ **Schema**: Correct table relationships and constraints
- ✅ **Environment**: Configurable database path and port

**Development Experience:**
- ✅ **Hot Reload**: Both frontend and backend support hot reloading
- ✅ **Clear Structure**: Well-organized folder structure
- ✅ **Documentation**: Comprehensive README and code comments

---

## 🚀 Running the Project

### ⚙️ Environment Setup

**Backend Environment Variables:**

Create a `.env` file in the `backend/` directory with the following variables:

```env
DATABASE_PATH=database.sqlite
PORT=8080
```

**Frontend:**

The frontend is configured to connect to the backend at `http://localhost:8080`.

### 🚀 Start the Application

**Backend:**

```bash
cd backend
npm install
npm run start:dev
```

Access on `http://localhost:8080`.

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

Access on `http://localhost:3000`.

The SQLite database is located at `backend/database.sqlite`.

---

## 🧪 Testing

**Backend Tests:**
```bash
cd backend
npm run test          # Run unit tests
npm run test:e2e      # Run integration tests
npm run test:cov      # Run tests with coverage
```

**Frontend Tests:**
```bash
cd frontend
npm run test          # Run tests
npm run test:watch    # Run tests in watch mode
```

---

## 📩 Submission

✅ Complete by one week after you recieved the assignment. 

✅ Push to your your personal forked repo. 

✅ Email your repo link to [dev@oxyera.com](mailto\:dev@oxyera.com).

Thank you for your interest in Oxyera. We look forward to reviewing your structured, clear, and working solution!


@echo off
REM Doctor's Appointment System - Quick Start Script
REM This script opens the project directory and displays quick start commands

color 0A
title Doctor's Appointment System - Quick Start

echo.
echo ============================================
echo   Doctor's Appointment System
echo   Quick Start Guide
echo ============================================
echo.
echo Prerequisites:
echo - Node.js v16+ installed
echo - npm v8+ installed  
echo - MongoDB Atlas configured
echo.
echo ============================================
echo   STEP 1: Install Dependencies
echo ============================================
echo.
echo Run these commands in separate directories:
echo.
echo Backend Dependencies (doctors-backend):
echo   cd e:\upgrad\WebDev\capstonProject\doctorsAppoitnment\doctors-backend
echo   npm install
echo.
echo Patient/Doctor Frontend (doctorsFrontend):
echo   cd e:\upgrad\WebDev\capstonProject\doctorsAppoitnment\doctors-frontend\doctorsFrontend
echo   npm install
echo.
echo Admin Frontend (doctorsAdmin):
echo   cd e:\upgrad\WebDev\capstonProject\doctorsAppoitnment\doctors-frontend\doctorsAdmin
echo   npm install
echo.
echo ============================================
echo   STEP 2: Start Services (in 3 Terminals)
echo ============================================
echo.
echo Terminal 1 - Backend (Port 3000):
echo   cd e:\upgrad\WebDev\capstonProject\doctorsAppoitnment\doctors-backend
echo   npm run dev
echo.
echo Terminal 2 - Patient/Doctor Frontend (Port 5173):
echo   cd e:\upgrad\WebDev\capstonProject\doctorsAppoitnment\doctors-frontend\doctorsFrontend
echo   npm run dev
echo.
echo Terminal 3 - Admin Frontend (Port 5174):
echo   cd e:\upgrad\WebDev\capstonProject\doctorsAppoitnment\doctors-frontend\doctorsAdmin
echo   npm run dev
echo.
echo ============================================
echo   STEP 3: Access Applications
echo ============================================
echo.
echo Admin Panel:      http://localhost:5174
echo Patient/Doctor:   http://localhost:5173
echo Backend API:      http://localhost:3000
echo.
echo ============================================
echo   User Flow
echo ============================================
echo.
echo 1. Admin:
echo    - Register at http://localhost:5174/register
echo    - Login and view dashboard
echo.
echo 2. Doctor:
echo    - Register at http://localhost:5173/register (select Doctor role)
echo    - Login and go to Profile
echo    - Add time slots under "Manage Availability"
echo.
echo 3. Patient:
echo    - Register at http://localhost:5173/register (select Patient role)
echo    - Login and view doctors at /patient/doctors
echo    - Click "Book Appointment" on a doctor
echo    - Select date and available time slot
echo    - Confirm booking
echo.
echo ============================================
echo   Important Notes
echo ============================================
echo.
echo - All 3 services must run simultaneously
echo - Use separate terminal windows for each service
echo - Check .env files are properly configured
echo - MongoDB URI should be in backend/.env
echo - Frontend needs backend running to work
echo.
echo ============================================
echo   Documentation
echo ============================================
echo.
echo For detailed setup: See SETUP_GUIDE.md
echo For testing guide: See TESTING_GUIDE.md
echo For configuration: See CONFIGURATION_SUMMARY.md
echo.
echo ============================================
echo   Troubleshooting
echo ============================================
echo.
echo Backend won't start?
echo   - Check MongoDB connection in .env
echo   - Verify port 3000 is available
echo   - npm install might be needed
echo.
echo Frontend won't connect to backend?
echo   - Ensure backend is running on :3000
echo   - Check .env file has correct API URL
echo   - Frontend needs http://localhost:3000/api
echo.
echo Time slots not showing?
echo   - Doctor must add slots in Profile
echo   - Slots must be added before patients can book
echo   - Refresh page after adding slots
echo.
echo ============================================
echo.
echo Press any key to continue...
pause >nul

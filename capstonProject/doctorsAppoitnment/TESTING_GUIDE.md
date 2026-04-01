# Doctor's Appointment System - Testing Guide

## 🧪 Complete Testing Workflow

### Test Scenario 1: Admin Panel Setup

#### Step 1: Admin Registration
```bash
URL: http://localhost:5174/signup
```

**Action:**
1. Click "Create one here"
2. Fill form:
   - Name: Admin User
   - Email: admin@test.com
   - Password: Admin@123
   - Confirm Password: Admin@123
3. Click "Create Admin Account"

**Expected Result:** ✅
- Success message appears
- Redirects to login page
- Message: "Admin account created successfully. Redirecting to login..."

#### Step 2: Admin Login
```bash
URL: http://localhost:5174/login
```

**Action:**
1. Enter email: admin@test.com
2. Enter password: Admin@123
3. Click "Login as Admin"

**Expected Result:** ✅
- Token stored in localStorage
- Redirects to `/dashboard`
- Dashboard shows:
  - Total Doctors: 0
  - Total Patients: 0
  - Total Appointments: 0

---

### Test Scenario 2: Doctor Setup & Availability

#### Step 1: Doctor Registration
```bash
URL: http://localhost:5173/register
```

**Action:**
1. Fill form:
   - Name: Dr. Sharma
   - Email: doctor1@test.com
   - Password: Doctor@123
   - Confirm Password: Doctor@123
   - Age: 45
   - Contact: 9876543210
   - Specialization: Cardiology
   - Experience: 8
   - Address: Apollo Hospital, Delhi
2. Select **Doctor** role
3. Click "Sign Up"

**Expected Result:** ✅
- Success message
- Redirects to login
- Account created in database

#### Step 2: Doctor Login
```bash
URL: http://localhost:5173/login
```

**Action:**
1. Enter email: doctor1@test.com
2. Enter password: Doctor@123
3. Select **Doctor** role
4. Click "Sign In"

**Expected Result:** ✅
- Token stored in localStorage
- Redirects to `/doctor/appointments`
- Shows appointment dashboard with 0 appointments

#### Step 3: Doctor Adds Time Slots
```bash
URL: http://localhost:5173/doctor/profile
```

**Action:**
1. Click "My Profile"
2. Scroll to "Manage Availability" section
3. Add multiple slots:

   **Slot 1:**
   - Start Time: 09:00
   - End Time: 10:00
   - Click "+ Add Slot"

   **Slot 2:**
   - Start Time: 10:00
   - End Time: 11:00
   - Click "+ Add Slot"

   **Slot 3:**
   - Start Time: 14:00
   - End Time: 15:00
   - Click "+ Add Slot"

**Expected Result:** ✅
- Each slot shows in "Your Slots" section
- Counter shows "Your Slots (3)"
- Slots format: "HH:MM - HH:MM"
- Success message after each addition

---

### Test Scenario 3: Patient Setup & Booking

#### Step 1: Patient Registration
```bash
URL: http://localhost:5173/register
```

**Action:**
1. Fill form:
   - Name: Raj Kumar
   - Email: patient1@test.com
   - Password: Patient@123
   - Confirm Password: Patient@123
   - Age: 32
2. Select **Patient** role
3. Click "Sign Up"

**Expected Result:** ✅
- Success message
- Redirects to login
- Account created in database

#### Step 2: Patient Login
```bash
URL: http://localhost:5173/login
```

**Action:**
1. Enter email: patient1@test.com
2. Enter password: Patient@123
3. Select **Patient** role
4. Click "Sign In"

**Expected Result:** ✅
- Token stored in localStorage
- Redirects to patient dashboard

#### Step 3: View Available Doctors
```bash
URL: http://localhost:5173/patient/doctors
```

**Action:**
1. Page loads with doctor list
2. Should see "Dr. Sharma" (Cardiology, 8 years experience)

**Expected Result:** ✅
- Doctor card shows:
  - Name: Dr. Sharma
  - Specialization: Cardiology
  - Experience: 8 years
- "Book Appointment" button visible

#### Step 4: Book Appointment
```bash
URL: http://localhost:5173/patient/appointment
```

**Action (Auto-navigates after clicking doctor):**
1. Click "Book Appointment" on doctor card
2. Should see appointment form
3. Select date: Tomorrow (or any future date)
4. Select time slot: 09:00 - 10:00
5. Reason (optional): Routine checkup
6. Click "Book Appointment"

**Expected Result:** ✅
- Shows confirmation page with:
  - Doctor: Dr. Sharma
  - Date: Selected date
  - Slot: Selected time
  - Reason: Routine checkup
- Appointment created in database

#### Step 5: Verify Appointment (Doctor)
```bash
URL: http://localhost:5173/doctor/appointments
```

**Action (Doctor logs back in):**
1. Doctor should see appointment in dashboard
2. Check appointment details

**Expected Result:** ✅
- Appointment shows with:
  - Patient Name: Raj Kumar
  - Appointment Date
  - Slot: 09:00 - 10:00
  - Status: Scheduled

---

### Test Scenario 4: Time Slot Management

#### Scenario 4a: Slot Moves from Available to Booked

**Before Booking:**
```
Doctor's Profile → Manage Availability
Available Slots: 3
- 09:00 - 10:00
- 10:00 - 11:00
- 14:00 - 15:00
```

**After Patient Books 09:00 Slot:**
```
Available Slots: 2
- 10:00 - 11:00
- 14:00 - 15:00

Booked Slots: 1
- 09:00 - 10:00
```

**Expected Result:** ✅
- Slot automatically removed from available
- Slot appears in booked slots
- Only 2 available slots shown in patient booking

#### Scenario 4b: Patient Books Another Slot

**Action:**
1. Another patient logins
2. Books 10:00 - 11:00 slot

**Expected Result:** ✅
- Doctor now has:
  - Available: 1 (14:00 - 15:00)
  - Booked: 2 (09:00 and 10:00)
- Patient can only see 14:00 - 15:00 slot

---

### Test Scenario 5: Error Handling

#### Test 5a: Duplicate Time Slot
**Action:**
1. Doctor tries to add: 09:00 - 10:00 again

**Expected Result:** ✅
- Error: "This time slot already exists."

#### Test 5b: Invalid Time Range
**Action:**
1. Start Time: 15:00
2. End Time: 14:00

**Expected Result:** ✅
- Error: "Start time must be before end time."

#### Test 5c: Missing Doctor Session
**Action:**
1. Patient opens appointment page directly (without doctor)

**Expected Result:** ✅
- Error: "No Doctor Selected"
- Shows "Back to Doctors" button

#### Test 5d: Expired Token
**Action:**
1. Clear localStorage manually
2. Try accessing protected route

**Expected Result:** ✅
- Redirects to login
- Error: "Doctor session not found. Please login again."

---

### Test Scenario 6: Multiple Users Concurrency

#### Action:
1. Doctor 1 adds 3 time slots
2. Patient 1 books slot 1
3. Patient 2 opens booking page simultaneously
4. Patient 2 tries to book same slot

**Expected Result:** ✅
- Slot only appears once in available
- First come, first served
- Backend prevents double booking

---

## 📊 Data Validation Tests

### Authentication Tests

| Test Case | Input | Expected | Result |
|-----------|-------|----------|--------|
| Valid Login | Correct email/password | Token returned | ✅ |
| Invalid Email | Wrong email | "User not found" | ✅ |
| Invalid Password | Wrong password | "Invalid credentials" | ✅ |
| Missing Password | Email only | "Email and password required" | ✅ |
| Role Validation | Valid email + role mismatch | "User not found" | ✅ |

### Time Slot Tests

| Test Case | Input | Expected | Result |
|-----------|-------|----------|--------|
| Valid Slot | 09:00 - 10:00 | Slot added | ✅ |
| Same Slot Twice | 09:00 - 10:00 (duplicate) | "Already exists" | ✅ |
| End ≤ Start | 14:00 - 10:00 | "Start < End" | ✅ |
| Missing Times | Start or End blank | "Both required" | ✅ |

### Appointment Tests

| Test Case | Input | Expected | Result |
|-----------|-------|----------|--------|
| Valid Booking | Future date + available slot | Appointment created | ✅ |
| No Doctor Selected | Navigate directly | "No Doctor Selected" | ✅ |
| Past Date | Yesterday's date | Date picker blocks it | ✅ |
| No Slots | Doctor has 0 slots | "No available slots" message | ✅ |

---

## 🔍 Browser Console Checks

### Network Requests (F12 → Network tab)

**Successful Endpoints:**
```
✅ POST /api/auth/login (200)
✅ POST /api/auth/register (201)
✅ GET /api/doctors (200)
✅ GET /api/doctors/:id (200)
✅ PUT /api/doctors/:id/timeSlots (200)
✅ POST /api/appointments (201)
✅ GET /api/appointments/doctor/:id (200)
```

### LocalStorage Check (F12 → Application → LocalStorage)

**After Patient Login:**
```
userRole: "patient"
token: "eyJ0eX..."
patientToken: "eyJ0eX..."
patientId: "507f1f77..."
userEmail: "patient1@test.com"
```

**After Doctor Login:**
```
userRole: "doctor"
token: "eyJ0eX..."
doctorToken: "eyJ0eX..."
doctorId: "507f1f77..."
userEmail: "doctor1@test.com"
```

---

## ⚠️ Common Issues & Solutions

### Issue: Time slots not appearing

**Diagnosis:**
1. Open browser console (F12)
2. Check Network tab for GET doctor endpoint
3. Look for `timeSlots` in response

**Solution:**
- Doctor must add slots via Profile
- Refresh page after adding slots
- Verify slots appear in LocalStorage doctor object

### Issue: Appointment not booking

**Diagnosis:**
1. Check if doctor has available slots
2. Verify selected date is future
3. Check browser console for errors

**Solution:**
- Doctor adds more time slots
- Select different date
- Check backend logs for errors

### Issue: Redirects to login from dashboard

**Diagnosis:**
1. Check localStorage for token
2. Verify token is valid JWT

**Solution:**
- Token may have expired (1 hour)
- Login again
- Clear localStorage and re-register

---

## ✅ Final Verification Checklist

- [ ] Backend running on port 3000
- [ ] Patient app running on port 5173
- [ ] Admin app running on port 5174
- [ ] Can register admin account
- [ ] Can login as admin
- [ ] Can view admin dashboard
- [ ] Can register doctor account
- [ ] Can login as doctor
- [ ] Can add time slots as doctor
- [ ] Can register patient account
- [ ] Can login as patient
- [ ] Can view doctor list
- [ ] Can book appointment (with available slots)
- [ ] Appointment appears in doctor's dashboard
- [ ] Time slot moves to booked after booking
- [ ] Can remove time slots as doctor
- [ ] Error messages show appropriately
- [ ] Re-login works correctly
- [ ] Multiple patients can book different slots

---

**All tests passing? Your application is ready! 🎉**

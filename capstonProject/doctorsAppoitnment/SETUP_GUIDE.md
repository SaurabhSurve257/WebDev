# Doctor's Appointment System - Setup Guide

## 📋 Project Structure

```
doctorsAppoitnment/
├── doctors-backend/          # Express.js REST API
├── doctors-frontend/
│   ├── doctorsFrontend/     # React app for Doctors & Patients
│   └── doctorsAdmin/        # React app for Admin Panel
└── SETUP_GUIDE.md           # This file
```

---

## 🛠️ Prerequisites

Ensure you have installed:
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)  
- **MongoDB Atlas** account (Database configured)

---

## 📦 Installation Steps

### Step 1: Install Backend Dependencies

```bash
cd e:\upgrad\WebDev\capstonProject\doctorsAppoitnment\doctors-backend
npm install
```

### Step 2: Configure Backend Environment

Edit `.env` file in `doctors-backend/`:

```env
PORT=3000
VITE_API_BASE_URL=http://localhost:3000

# MongoDB Atlas Configuration
MONGO_URI=mongodb://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/?ssl=true&replicaSet=YOUR_REPLICA_SET&authSource=admin&appName=doctors-appointment

# JWT Secret (Change in production)
JWT_SECRET=your-secret-key-here
jwtSecretKey=your-secret-key-here

# Environment
NODE_ENV=development
```

**Current Configuration:**
- Database: MongoDB Atlas ✅
- Authentication: JWT ✅
- CORS: Enabled ✅

### Step 3: Install Frontend Dependencies (Doctors & Patients)

```bash
cd doctors-frontend\doctorsFrontend
npm install
```

### Step 4: Configure Frontend Environment

Edit `.env` file in `doctors-frontend/doctorsFrontend/`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### Step 5: Install Admin Panel Dependencies

```bash
cd doctors-frontend\doctorsAdmin
npm install
```

### Step 6: Configure Admin Panel Environment

Edit `.env` file in `doctors-frontend/doctorsAdmin/`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## ▶️ Running the Application

### Terminal 1: Start Backend Server

```bash
cd e:\upgrad\WebDev\capstonProject\doctorsAppoitnment\doctors-backend
npm run dev
```

Expected output:
```
Server is running on port 3000
Database connected successfully
```

### Terminal 2: Start Patient & Doctor Frontend

```bash
cd e:\upgrad\WebDev\capstonProject\doctorsAppoitnment\doctors-frontend\doctorsFrontend
npm run dev
```

Expected output:
```
VITE v8.0.0 ready in 500 ms

➜  Local:   http://localhost:5173/
```

### Terminal 3: Start Admin Frontend

```bash
cd e:\upgrad\WebDev\capstonProject\doctorsAppoitnment\doctors-frontend\doctorsAdmin
npm run dev
```

Expected output:
```
VITE v8.0.0 ready in 500 ms

➜  Local:   http://localhost:5174/
```

---

## 🌐 Access URLs

| Application | URL | Purpose |
|-------------|-----|---------|
| Backend API | `http://localhost:3000` | REST API Server |
| Patient/Doctor App | `http://localhost:5173` | Patient login, Doctor appointments |
| Admin Panel | `http://localhost:5174` | Admin operations |

---

## 👥 User Registration & Login

### Admin Registration
1. Open `http://localhost:5174` (Admin Panel)
2. Click "Create one here" → Signup
3. Fill details:
   - Name: Admin Name
   - Email: admin@example.com
   - Password: admin123 (min 6 chars)
4. Click "Create Admin Account"

### Admin Login
1. Use registered email and password
2. Access Dashboard with admin statistics

### Doctor Registration
1. Open `http://localhost:5173` (Patient/Doctor App)
2. Click "Sign Up"
3. Select **Doctor** role
4. Fill details:
   - Name: Dr. John
   - Email: doctor@example.com
   - Password: doctor123
   - Specialization: Cardiology
   - Experience: 5
   - Contact: 9876543210
   - Address: Hospital Address

### Doctor Login & Setup Availability
1. Login as doctor
2. Go to "My Profile"
3. Scroll to "Manage Availability" section
4. Add time slots (e.g., 9:00 AM - 10:00 AM)
5. Click "+ Add Slot"

### Patient Registration
1. Click "Sign Up"
2. Select **Patient** role
3. Fill details:
   - Name: John Doe
   - Email: patient@example.com
   - Password: patient123
   - Age: 35

### Patient Login & Book Appointment
1. Login as patient
2. Go to "Book Appointment"
3. Select a doctor
4. Choose date and available time slot
5. Enter reason (optional)
6. Click "Confirm Appointment"

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor details
- `PUT /api/doctors/:id` - Update doctor profile
- `PUT /api/doctors/:id/timeSlots` - Update doctor's available slots

### Patients
- `GET /api/patients` - Get all patients  
- `GET /api/patients/:id` - Get patient details
- `PUT /api/patients/:id` - Update patient profile

### Appointments
- `GET /api/appointments` - Get all appointments (admin)
- `GET /api/appointments/doctor/:doctorId` - Get doctor's appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment status
- `GET /api/appointments/:id` - Get appointment details

---

## 🧪 Testing the Flow

### Complete Workflow:
1. **Admin** creates admin account and logs in
2. **Doctor** registers and sets up availability (time slots)
3. **Patient** registers and views available doctors
4. **Patient** books appointment with available time slot
5. **Doctor** views appointments dashboard
6. **Admin** can view all system statistics

---

## 🐛 Troubleshooting

### Issue: Backend won't start
- **Check**: MongoDB Atlas connection string is correct
- **Solution**: Verify `MONGO_URI` in `.env` and JWT_SECRET is set

### Issue: Frontend can't connect to backend
- **Check**: Backend is running on port 3000
- **Solution**: Ensure `VITE_API_BASE_URL` points to `http://localhost:3000/api`

### Issue: Time slots not showing
- **Solution**: Doctor must add slots first via Profile → Manage Availability
- **Slots** are moved from `availableTimeSlots` to `bookedTimeSlots` when appointment is created

### Issue: Cannot book appointment
- **Check**: 
  - You're logged in as patient
  - Doctor has available time slots
  - Selected date is in future
- **Solution**: Ask doctor to add more time slots

### Issue: CORS errors
- **Solution**: Backend CORS is enabled. If issues persist, check browser console

---

## 📝 Important Notes

### Session Management
- Authentication tokens are stored in `localStorage`
- Each role has separate token: `adminToken`, `doctorToken`, `patientToken`
- Clear localStorage to logout

### Database Structure
- **Users**: Patient, Doctor, Admin collections
- **Appointments**: Links patients, doctors, and time slots
- **Time Slots**: Doctor's `availableTimeSlots` and `bookedTimeSlots`

### Security
- Passwords are hashed with bcrypt
- JWT tokens expire after 1 hour
- Role-based authorization on all endpoints

---

## ⚡ Quick Commands

**Start All Services (Run in separate terminals):**

```bash
# Terminal 1 - Backend
cd doctors-backend && npm run dev

# Terminal 2 - Patient/Doctor Frontend  
cd doctors-frontend\doctorsFrontend && npm run dev

# Terminal 3 - Admin Frontend
cd doctors-frontend\doctorsAdmin && npm run dev
```

---

## 📞 Support

If you encounter issues:
1. Check error messages in browser console (F12)
2. Verify `.env` files have correct configuration
3. Ensure all ports (3000, 5173, 5174) are available
4. Check MongoDB Atlas connection status

---

## ✅ Checklist

- [ ] Node.js and npm installed
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Admin frontend dependencies installed
- [ ] `.env` files configured
- [ ] MongoDB URI verified
- [ ] JWT Secret set
- [ ] Backend running on port 3000
- [ ] Patient/Doctor app running on port 5173
- [ ] Admin app running on port 5174
- [ ] Can access all three URLs

---

**Setup Complete! Happy coding! 🎉**

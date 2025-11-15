 # 🚖 Ride Booking System(SwiftGo) – Frontend (React + TypeScript)

A fully responsive, scalable, production-ready Ride Booking Platform frontend built with **React**, **Redux Toolkit**, **RTK Query**, and **TypeScript**.  
The system provides tailored experiences for **Riders**, **Drivers**, and **Admins**, similar to Uber, Pathao, or Lyft.

---

## 🔗 Live Links
- **Frontend:** (https://ride-booking-iota.vercel.app)
- **Backend API:** (https://ride-booking-api-lyart.vercel.app)

---


## 📌 Project Overview
This frontend serves as the client-side interface for a full-stack Ride Booking Application.  
It communicates with the backend using **RTK Query** and manages global state using **Redux Toolkit**.

### Includes:
- Role-based dashboards  
- Ride booking + tracking  
- Driver analytics  
- Admin user management  
- Fully validated forms  
- Global floating SOS system  
- UI built with shadcn, Tailwind, and Lucide icons  
- Strong error handling & UX polish  

---

## 🧠 Tech Stack

### **Frontend**
- React (TypeScript)  
- Redux Toolkit  
- RTK Query  
- React Router  
- Tailwind CSS  
- shadcn/ui  
- Lucide-react  
- Sooner Toast  

### **Backend (Integrated)**
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- Bcrypt Password Hashing  

---

## 🎯 Features

### 🟦 Public Pages
Accessible without login:
- Home  
- About  
- Contact  
- Feature Overview  
- FAQ  
- Login & Register  

---

## 🚕 Rider Features
- Request Ride  
- Pickup/Destination input  
- Fare estimation  
- Ride history (pagination + filters)  
- Ride details  
- Profile update (name, phone only — no email/password)  
- SOS / Emergency button  
- Optional real-time tracking  

---

## 🚗 Driver Features
- Online/Offline toggle  
- Incoming ride request system  
- Accept/Reject ride  
- Ride status updates  
- Earnings dashboard (charts)  
- Ride history  
- Vehicle info + profile update  
- SOS button  

---

## 🛡️ Admin Features
- User management (search, filter, block/unblock)  
- Driver approval  
- Global ride tracking  
- Analytics dashboard  
- Profile updates  

---

## 🆘 SOS / Emergency System
A global emergency system appears during active rides.

### **Includes:**
- 📞 Call Police (999)  
- 🔔 Notify Emergency Contact  
- 📍 Share Live Location  

### **Technologies:**
- Geolocation API  
- tel: protocol  
- SMS/WhatsApp API (optional)  

### **Rules:**
- Visible only during active ride  
- Uses shadcn Dialog for UI  

---

## 🛠️ Installation

### 1️⃣ Clone repo
```bash
git clone 
cd ride-booking-client
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Start development
```bash
npm run dev
```

---

## 🔧 Environment Variables

Create a `.env` file:

```
VITE_API_URL=https://your-backend-domain.com
```

---

## 📜 Scripts

| Command          | Description              |
|------------------|--------------------------|
| npm run dev      | Start dev server         |
| npm run build    | Build for production     |
| npm run preview  | Preview production       |

---

## 📁 Folder Structure
```
src/
 ├── assets/
 ├── components/
 ├── hooks/
 ├── layout/
 ├── pages/
 ├── redux/
 │   ├── features/
 │   └── store.ts
 ├── routes/
 ├── types/
 ├── utils/
 └── main.tsx
```

---

## ▲ Deployment (Vercel)

### Step 1: Login
```bash
vercel login
```

### Step 2: Deploy
```bash
vercel
vercel --prod
```

Ensure output folder = `dist`.

---

 

## 🔑 Test Credentials (Example)

### Rider
email: rider@gmail.com  
password: 123456  

### Driver
email: driver@gmail.com  
password: 123456  

### Admin
email: admin@gmail.com  
password: 123456  

---

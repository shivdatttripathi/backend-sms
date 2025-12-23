# 🏫 School Management System (Backend API)

![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green)
![Express.js](https://img.shields.io/badge/Express.js-4.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-forestgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)

> A robust, scalable, and secure REST API for a multi-school ERP system. Built to handle complex academic operations including bulk data ingestion, role-based access control, and dynamic timetable scheduling.

---

## 📖 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Folder Structure](#-folder-structure)
- [Contributing](#-contributing)

---

## 🚀 Features

### 🔐 Security & Auth
- **JWT Authentication:** Secure stateless authentication with HttpOnly cookies.
- **RBAC (Role-Based Access Control):** Granular permissions for Super Admin, School Admin, Teachers, and Students.
- **Data Security:** Password hashing using `bcryptjs` and input validation.

### 👑 Super Admin Module
- **Multi-Tenancy:** Register and manage multiple schools within a single system.
- **Subscription Management:** Track school plan expiry and status.

### 🏫 School Administration
- **Bulk Student Registration:** Upload Excel (`.xlsx`) files to register hundreds of students instantly with duplicate detection.
- **Staff Management:** Manage Teacher profiles and subject assignments.
- **Academic Setup:** Configure Classes, Sections, and Academic Years.

### 📅 Timetable Management
- **Conflict-Free Scheduling:** Create weekly schedules with validation for time overlaps.
- **Flexible Formats:** Supports Lectures, Labs, Breaks, and Assemblies.

---

## 🛠 Tech Stack

| Component | Technology |
| :--- | :--- |
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB Atlas (via Mongoose) |
| **Auth** | JSON Web Tokens (JWT) |
| **File Uploads** | Multer (Memory Storage) |
| **Data Processing** | XLSX (Excel Parsing) |
| **Validation** | Joi / Mongoose Validators |

---

## 📋 Prerequisites
Before running the project, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v16 or higher)
* [MongoDB](https://www.mongodb.com/) (Local or Atlas connection string)
* [Postman](https://www.postman.com/) (For API testing)

---

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/shivdatttripathi/backend-sms.git](https://github.com/shivdatttripathi/backend-sms.git)
    cd backend-sms
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory (see [Environment Variables](#-environment-variables) below).

4.  **Start the server**
    ```bash
    # Run in development mode (with Nodemon)
    npm run dev

    # Run in production mode
    npm start
    ```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory and add the following keys:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/school_erp_db

# Security
JWT_SECRET=your_super_strong_secret_key_here
JWT_EXPIRE=30d

# Optional (If using Cloudinary for images)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

```
```bash

📂 Folder Structure
backend-sms/
├── config/             # Database connection (db.js)
├── controllers/        # Logic for requests (studentController.js, etc.)
├── middleware/         # Auth, Error Handling, Multer config
├── models/             # Mongoose Schemas (Admin , SuperAdmin, School, Timetable)
├── routes/             # API Route definitions
├── utils/              # Helper functions (AsyncHandler, ExcelParser)
├── uploads/            # Temp storage for uploaded files
├── .env                # Environment variables (not committed)
└── server.js           # App entry point

```
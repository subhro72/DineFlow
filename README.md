# DineFlow — Restaurant Management System

A full-stack **MERN-based Restaurant Management System** that allows administrators to manage menu items and users through a secure dashboard, while registered users and public visitors can browse the restaurant menu.

---

## 📌 Project Overview

**DineFlow** is a Restaurant Management System built using the **MERN Stack**:

- MongoDB
- Express.js
- React.js
- Node.js

The application provides separate functionality for **Admins, Users, and Guests**.

The system demonstrates:

- User Authentication
- JWT-based Authorization
- Role-based Access Control
- CRUD Operations
- REST API Development
- Menu Management
- User Management
- Image Upload
- Protected Routes
- State Management
- Responsive Dashboard

---

## ✨ Features

### 🔐 Authentication

#### User

- User Registration
- User Login
- JWT Authentication
- Logout
- Automatic assignment of `User` role during registration

#### Admin

- Admin Login
- JWT Authentication
- Protected Admin Routes
- Logout

---

### 👨‍💼 Admin Dashboard

The Admin Dashboard provides an overview of the system.

It displays:

- Total Menu Items
- Total Users
- Total Orders

---

### 🍽️ Menu Management

Admins can manage restaurant menu items.

#### Add Menu Item

Admins can add a menu item with:

- Item Name
- Description
- Category
- Price
- Availability
- Item Image

#### Categories

Menu items can belong to:

- Starter
- Main Course
- Dessert
- Beverage

#### Manage Menu Items

Admins can:

- View all menu items
- Search menu items
- Edit menu item information
- Update item image
- Update price
- Update availability
- Delete menu items

---

### 👥 User Management

Admins can view and manage registered users.

The admin can view:

- Name
- Email
- Role
- Registration Date

Admins can also delete registered users.

---

### 🌐 Public & User Panel

Menu browsing does **not require authentication**.

Visitors and registered users can:

- Browse menu items
- View menu item details

Each menu card displays:

- Item Image
- Item Name
- Price
- Short Description
- View Button

The menu details page displays:

- Item Image
- Item Name
- Description
- Category
- Price
- Availability Status

---

## 👤 User Roles

| Role      | Capabilities                                              |
| --------- | --------------------------------------------------------- |
| **Admin** | Login, dashboard access, menu management, user management |
| **User**  | Register, login, browse menu, view menu details           |
| **Guest** | Browse menu and view menu details without authentication  |

---

## 🛠️ Technology Stack

### Frontend

- React.js
- React Router DOM
- JavaScript
- Axios
- Tailwind CSS
- React `useState`
- React `useEffect`

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt.js
- Multer
- Cloudinary

---

## 🏗️ Project Structure

```text
dineflow/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── common/
│       │   ├── auth/
│       │   ├── menu/
│       │   └── admin/
│       │
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── MenuDetails.jsx
│       │   ├── Register.jsx
│       │   ├── Login.jsx
│       │   ├── AdminLogin.jsx
│       │   └── admin/
│       │       ├── Dashboard.jsx
│       │       ├── MenuItems.jsx
│       │       ├── AddMenuItem.jsx
│       │       ├── EditMenuItem.jsx
│       │       └── Users.jsx
│       │
│       ├── context/
│       ├── hooks/
│       ├── services/
│       ├── routes/
│       ├── utils/
│       ├── App.jsx
│       └── main.jsx
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🗄️ Database Structure

### Users Collection

| Field      | Type            |
| ---------- | --------------- |
| Name       | String          |
| Email      | String          |
| Password   | String (Hashed) |
| Role       | Admin / User    |
| Created At | Date            |

### MenuItems Collection

| Field        | Type    |
| ------------ | ------- |
| Name         | String  |
| Description  | String  |
| Category     | String  |
| Price        | Number  |
| Availability | Boolean |
| Image        | String  |
| Created At   | Date    |
| Updated At   | Date    |

---

## 🔗 REST API

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user/admin    |

### Menu Items

#### Public APIs

| Method | Endpoint              | Description           |
| ------ | --------------------- | --------------------- |
| GET    | `/api/menu-items`     | Get all menu items    |
| GET    | `/api/menu-items/:id` | Get menu item details |

#### Admin APIs

| Method | Endpoint              | Description      |
| ------ | --------------------- | ---------------- |
| POST   | `/api/menu-items`     | Add menu item    |
| PUT    | `/api/menu-items/:id` | Update menu item |
| DELETE | `/api/menu-items/:id` | Delete menu item |

### Users — Admin

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| GET    | `/api/users`     | Get all users |
| DELETE | `/api/users/:id` | Delete a user |

---

## 🔐 Security

DineFlow uses:

- JWT for authentication
- Bcrypt.js for password hashing
- Protected routes for authenticated users
- Role-based access control for Admin routes

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd dineflow
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `backend` directory.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> Never commit your `.env` file to GitHub.

---

## ▶️ Running the Application

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The frontend and backend will run as separate development servers.

---

## 📱 Application Pages

### Public Pages

- Home
- Menu Item Details
- User Register
- User Login
- Admin Login

### Admin Pages

- Dashboard
- Menu Items
- Add Menu Item
- Edit Menu Item
- Users

---

## 🎯 Project Goals

The main goal of DineFlow is to demonstrate the development of a complete full-stack web application using the MERN stack.

The project focuses on practical implementation of:

- RESTful API architecture
- Authentication and authorization
- Role-based access control
- MongoDB database operations
- CRUD functionality
- Image upload
- React state management
- Protected routes
- Responsive admin dashboard

---

## 🚧 Future Improvements

Potential future additions include:

- Order Management
- Customer Order Tracking
- Payment Integration
- Restaurant Analytics
- Inventory Management
- Staff Management
- Notifications
- Advanced Search and Filtering

---

## 👨‍💻 Author

**Somsubhra Misra**

Built as a MERN Stack project for learning and portfolio development.

---

## 📄 License

This project is licensed under the **ISC License**.

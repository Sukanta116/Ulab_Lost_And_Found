# 🔎 ULAB Lost & Found

<p align="center">
  <strong>A REST API for managing lost and found items within the ULAB community.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-24.x-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge" alt="Mongoose">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT">
  <img src="https://img.shields.io/badge/Postman-API%20Testing-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Postman">
  <img src="https://img.shields.io/github/license/Sukanta116/Ulab_Lost_And_Found?style=for-the-badge" alt="License">
</p>

---

## 📖 About

**ULAB Lost & Found** is a backend REST API designed to help the ULAB community manage lost and found items.

Students can report lost items, submit claims for found items, and answer verification questions. Authorized staff can manage found items and review ownership claims, while administrators can manage users and their roles.

The project focuses on practical backend development concepts including **REST APIs, authentication, authorization, validation, MongoDB, and business logic**.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 👨‍🎓 Student

- 🔐 Register & Login
- 📦 Report lost items
- 🔍 Browse lost & found items
- 📝 Submit item claims
- ❓ Answer verification questions
- 📊 Track claim status

</td>

<td width="50%">

### 👨‍💼 Staff

- 📥 Register found items
- 🖼️ Add item information & photos
- ❓ Create verification questions
- 🔎 Review ownership claims
- ✅ Approve claims
- ❌ Reject claims
- 📦 Mark items as returned

</td>
</tr>

<tr>
<td>

### 🛡️ Security

- 🔑 JWT authentication
- 🔒 Password hashing with bcrypt
- 🍪 HTTP-only cookies
- 🚧 Protected routes
- 👥 Role-based authorization
- ✅ Request validation
- 🔐 Ownership checks

</td>

<td>

### 👑 Admin

- ➕ Add users
- ✏️ Update users
- 🗑️ Delete users
- 👥 Manage user roles
- 🔐 Control access to admin features

</td>
</tr>
</table>

---

## 🏗️ System Architecture

The following diagram shows how requests flow through the backend, from the ULAB community to the Express routes, middleware, controllers, models, and MongoDB.

<p align="center">
  <img src="./System%20Architecture.png" alt="ULAB Lost & Found System Architecture">
</p>

---

## 🔄 Claim Verification

<p align="center">
  <img src="./Claim Verification process.png" alt="Claim Verification Process">
</p>

---

## 🛠️ Tech Stack

| Technology               | Purpose            |
| ------------------------ | ------------------ |
| 🟢 **Node.js**           | JavaScript runtime |
| ⚡ **Express.js**        | REST API framework |
| 🍃 **MongoDB**           | Database           |
| 🦫 **Mongoose**          | MongoDB ODM        |
| 🔐 **JWT**               | Authentication     |
| 🔒 **bcrypt**            | Password hashing   |
| ✅ **Express Validator** | Request validation |
| 📮 **Postman**           | API testing        |
| 🐙 **Git & GitHub**      | Version control    |

---

## 📌 API Modules

### 🔐 Authentication

```http
POST /user/register
POST /user/login
POST /user/logout
```

### 🔎 Lost Items

```http
POST   /lost
GET    /lost
GET    /lost/:id
PUT    /lost/:id
DELETE /lost/:id
```

### 📦 Found Items

```http
POST   /found
GET    /found
GET    /found/:id
PUT    /found/:id
DELETE /found/:id
```

### 📝 Claims

```http
POST  /claim
GET   /claim/:id
PATCH /claim/:id/review
```

### 👑 Admin

```http
POST   /admin/user
PATCH  /admin/user/:id
DELETE /admin/user/:id
```

> **Note:** API routes may change as the project evolves.

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Sukanta116/Ulab_Lost_And_Found.git
```

### 2️⃣ Enter the project

```bash
cd Ulab_Lost_And_Found
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret
```

> ⚠️ Never commit the `.env` file to GitHub.

### 5️⃣ Start the server

```bash
nodemon app
```

---

## 🧪 Testing

The API can be tested using **Postman**.

### Tested Areas

- ✅ User registration
- ✅ Login & logout
- ✅ Authentication
- ✅ Role-based authorization
- ✅ Lost item CRUD
- ✅ Found item management
- ✅ Claim submission
- ✅ Claim verification
- ✅ Staff approval/rejection
- ✅ Admin user management
- ✅ Request validation
- ✅ Default Error Handling

---

## 🎯 What I Practiced

This project helped me work with real-world backend concepts:

```text
REST API
   │
   ├── Authentication
   ├── Authorization
   ├── Middleware
   ├── Validation
   ├── CRUD Operations
   ├── MongoDB & Mongoose
   ├── Business Logic
   └── Error Handling
```

---

## 📂 Project Highlights

- Clean REST API implementation
- Authentication & role-based authorization
- MongoDB data modeling with Mongoose
- Protected routes and middleware
- Claim verification workflow
- Admin user management
- API testing with Postman

---

## 👨‍💻 Author

### Sukanta Majumder

**CSE Student | Backend Development Enthusiast**

<p>
  <a href="https://github.com/Sukanta116">
    <img src="https://img.shields.io/badge/GitHub-Sukanta116-181717?style=for-the-badge&logo=github" alt="GitHub">
  </a>
</p>

---

<p align="center">
  ⭐ If you find this project interesting, consider giving it a star!
</p>

<p align="center">
  <sub>Built with Node.js, Express.js & MongoDB</sub>
</p>

# ULAB Lost and Found

A backend REST API for managing lost and found items within the **University of Liberal Arts Bangladesh (ULAB)** community.

The system allows students to report lost items, while authorized staff can register found items, create item-specific verification questions, and review ownership claims.

---

## 📌 Problem Statement

Students often lose personal belongings inside or around campus. A traditional lost-and-found process can make it difficult to:

- Report lost items properly
- Maintain records of found items
- Match lost and found items
- Verify whether a claimant is the actual owner
- Maintain a record of claim decisions

**ULAB Lost and Found** provides a centralized backend system to manage this process.

---

## 🚀 Main Features

### 👨‍🎓 Student

- Register and login
- Report lost items
- View lost and found items
- Submit a claim for a found item
- Answer verification questions
- Track claim status

### 👨‍💼 Staff

- Register found items
- Upload pictures of found items
- Create verification questions for each found item
- Review claims
- Review automatic verification results
- Approve or reject claims
- Mark items as returned

### 🔐 Authentication & Authorization

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- Role-based authorization
- Student and staff permissions

---

# 🧠 Claim Verification

The system uses a combination of **rule-based automatic verification** and **staff review**.

### Example

Staff registers a found wallet:

```text
Question: What color was the wallet?
Type: color
Expected Answer: black

Question: How many cards were inside?
Type: number
Expected Answer: 2
```

A student submits answers.

The backend normalizes and compares the answers instead of relying only on exact string matching.

For example:

```text
Expected: Black leather wallet
Answer:   black leather wallet
→ Match
```

For suitable text questions, equivalent/common words can also be handled using rule-based matching.

The system produces a verification score:

```text
2 / 3 answers matched
Verification Result: Passed
```

The **final decision remains with staff**.

```text
Student Answer
      ↓
Automatic Verification
      ↓
Verification Score
      ↓
Staff Review
      ↓
Approve / Reject
```

---

# 🗄️ Database Design

The project uses **MongoDB with Mongoose**.

The system intentionally uses **4 main collections**:

```text
┌──────────────────┐
│      Users       │
├──────────────────┤
│ _id              │
│ studentId        │
│ name             │
│ email            │
│ password         │
│ role             │
└────────┬─────────┘
         │
         │ 1 : N
         │
    ┌────┴───────────────┐
    ↓                    ↓
┌───────────┐      ┌────────────┐
│   Lost    │      │   Found    │
├───────────┤      ├────────────┤
│ _id       │      │ _id        │
│ reportedBy│      │ addedBy    │
│ title     │      │ title      │
│ category  │      │ category   │
│ photos[]  │      │ photos[]   │
│ location  │      │ questions[]│
│ lostDate  │      │ status     │
│ status    │      └─────┬──────┘
└─────┬─────┘            │
      │                   │
      └────────┬──────────┘
               ↓
        ┌──────────────┐
        │    Claims    │
        ├──────────────┤
        │ _id          │
        │ lostItem     │
        │ foundItem    │
        │ claimant     │
        │ score        │
        │ result       │
        │ status       │
        │ reason       │
        │ reviewedBy   │
        └──────────────┘
```

### Relationships

```text
User ──────< Lost
User ──────< Found
User ──────< Claims

Lost ──────< Claims
Found ─────< Claims
```

MongoDB references are implemented using Mongoose `ObjectId` and `ref`.

Example:

```js
reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
}
```

---

# 📦 Collections

## 1. Users

Stores students, staff, and administrators.

```text
_id
studentId
name
email
password
role
isActive
createdAt
updatedAt
```

Roles:

```text
user
staff
admin
```

---

## 2. Lost

Stores items reported as lost by students.

```text
_id
reportedBy → User
title
category
description
lostLocation
lostDate
status
createdAt
updatedAt
```

Possible status:

```text
active
matched
recovered
```

---

## 3. Found

Stores items registered by staff.

```text
_id
addedBy → User
title
category
description
foundLocation
foundDate
photos[]

verificationQuestions[]
    ├── question
    ├── questionType
    ├── expectedAnswer
    └── required

status
createdAt
updatedAt
```

### Question Types

```text
text
color
number
yes_no
multiple_choice
```

Example:

```js
verificationQuestions: [
  {
    question: "What color was the wallet?",
    questionType: "color",
    expectedAnswer: "black",
    required: true,
  },
  {
    question: "How many cards were inside?",
    questionType: "number",
    expectedAnswer: "2",
    required: true,
  },
];
```

The verification questions are embedded inside the `Found` document because they belong specifically to that found item.

---

## 4. Claims

Stores ownership claims and their verification results.

```text
_id
lostItem → Lost
foundItem → Found
claimant → User

verificationScore
verificationResult
status
reason

reviewedBy → User
reviewedAt

createdAt
updatedAt
```

Possible statuses:

```text
pending
approved
rejected
```

Possible verification results:

```text
passed
failed
```

---

# 🔄 System Workflow

```text
Student
   │
   ├── Register / Login
   │
   └── Report Lost Item
            │
            ↓
        Lost Collection
            │
            │
            ↓
       Possible Match
            │
            ↓
       Found Collection
            │
            ↓
       Submit Claim
            │
            ↓
   Automatic Verification
            │
            ↓
      Verification Score
            │
            ↓
       Staff Review
         /       \
        ↓         ↓
    Approved    Rejected
        │
        ↓
   Item Returned
```

---

# 🏗️ Project Architecture

The project follows the **MVC architecture**.

```text
ulab-lost-and-found/
│
├── controllers/
│   ├── authController.js
│   ├── lostController.js
│   ├── foundController.js
│   └── claimController.js
│
├── models/
│   ├── User.js
│   ├── Lost.js
│   ├── Found.js
│   └── Claim.js
│
├── routes/
│   ├── authRoutes.js
│   ├── lostRoutes.js
│   ├── foundRoutes.js
│   └── claimRoutes.js
│
├── middlewares/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   ├── validationMiddleware.js
│   └── errorMiddleware.js
│
├── utils/
│   └── ...
│
├── config/
│   └── db.js
│
├── app.js
├── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

# 🔌 Main API Endpoints

## Authentication

```http
POST /user/register
POST /user/login
POST /user/logout
```

## Lost Items

```http
POST   /lost
GET    /lost
GET    /lost/:id
PUT    /lost/:id
DELETE /lost/:id
```

## Found Items

```http
POST   /found
GET    /found
GET    /found/:id
PUT    /found/:id
DELETE /found/:id
```

Staff-only operations will be protected by role-based authorization.

## Claims

```http
POST  /claims
GET   /claims/:id
PATCH /claims/:id/review
```

## Admin funtionalities

POST /admin/user/
PATCH /admin/user/:id
DELETE /admin/user/:id

---

# 🛠️ Technology Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT**
- **bcrypt**
- **Express Validator**
- **Postman**
- **Git & GitHub**

---

# 🔐 Security

The API implements:

- Password hashing
- JWT authentication
- HTTP-only cookies
- Protected routes
- Role-based authorization
- Input validation
- Secure handling of verification information
- Ownership checks before modifying resources

---

# 🧪 Testing

All APIs will initially be tested using **Postman**.

Testing will cover:

- Registration
- Login/logout
- Authentication
- Authorization
- Lost item CRUD
- Found item management
- Image upload
- Claim submission
- Automatic verification
- Staff approval/rejection
- Invalid requests
- Unauthorized access

---

# 📈 Development Plan

### Phase 1 — Project Setup

- Express setup
- MongoDB connection
- Environment variables
- MVC structure

### Phase 2 — Authentication

- Registration
- Login
- Logout
- JWT
- Password hashing
- Authentication middleware
- Role-based authorization

### Phase 3 — Lost Items

- Lost item CRUD
- Image upload
- User ownership checks
- Validation

### Phase 4 — Found Items

- Staff-only management
- Image upload
- Verification question creation
- Question types

### Phase 5 — Claims

- Submit claims
- Match lost/found items
- Automatic answer verification
- Verification scoring
- Staff review
- Approve/reject

### Phase 6 — Testing & Documentation

- Postman testing
- Error handling
- Security improvements
- README documentation
- GitHub cleanup

---

# 🎯 Project Goal

The goal of **ULAB Lost and Found** is to create a practical backend system that demonstrates real-world backend development concepts including:

- REST API development
- MVC architecture
- MongoDB data modeling
- Mongoose relationships
- Authentication
- Authorization
- Validation
- File uploads
- Business logic
- Rule-based verification
- Role-based workflows
- API security

---

## 👨‍💻 Author

**Sukanta Majumder**

Backend Development Project
ULAB CSE
**login**
UserID and password

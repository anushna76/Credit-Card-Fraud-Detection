# Credit Card Fraud Detection System

## Overview

This project is a **full-stack Credit Card Fraud Detection System** that enables banks and users to securely manage accounts, request cards, perform transactions, and detect fraudulent activities in real-time using a machine learning model deployed on Google Cloud Platform (GCP). The system is built with a Node.js/Express backend, a React frontend, and MongoDB for data storage.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Backend API Routes](#backend-api-routes)
  - [User Routes](#user-routes)
  - [Admin Routes](#admin-routes)
  - [Prediction Route](#prediction-route)
- [Security & Authentication](#security--authentication)
- [Fraud Detection ML Model](#fraud-detection-ml-model)
- [Google Cloud Platform Integration](#google-cloud-platform-integration)
- [Frontend Overview](#frontend-overview)
- [Frontend Integration & Home Page Flow](#frontend-integration--home-page-flow)
- [Project Flow](#project-flow)
- [Contributing](#contributing)
- [Judges' Notes](#judges-notes)

---

## Project Structure

```
Credit_fraud_detection/
├── backend/
│   ├── Controllers/
│   ├── Utils/
│   ├── models/
│   ├── middleware/
│   ├── routes/
│   ├── secret/
│   ├── .env
│   └── index.js
├── frontend/
│   └── CardFraud/
│       └── src/
└── README.md
```

---

## Getting Started

### 1. **Clone the Repository**

```bash
git clone https://github.com/yourusername/Credit_fraud_detection.git
cd Credit_fraud_detection
```

### 2. **Backend Setup**

- Install dependencies:
  ```bash
  cd backend
  npm install
  ```
- Create a `.env` file in the `backend/` directory with the following variables:
  ```
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  OPENCAGE_API_KEY=your_opencage_api_key
  ENDPOINT_ID=your_gcp_vertex_ai_endpoint_id
  ```
- Place your GCP service account key in `backend/secret/frauddetection.json`.

- Start the backend server:
  ```bash
  npm start
  ```

### 3. **Frontend Setup**

- Install dependencies:
  ```bash
  cd frontend/CardFraud
  npm install
  ```
- Start the frontend:
  ```bash
  npm start
  ```

---

## Environment Variables

- **MONGODB_URI**: MongoDB connection string.
- **JWT_SECRET**: Secret key for JWT authentication.
- **OPENCAGE_API_KEY**: API key for geocoding merchant locations.
- **ENDPOINT_ID**: Vertex AI endpoint ID for fraud prediction.
- **GOOGLE_APPLICATION_CREDENTIALS**: Path to your GCP service account key (set in code).

---

## Backend API Routes

### User Routes

| Route                      | Method | Auth   | Description                                      |
|----------------------------|--------|--------|--------------------------------------------------|
| `/users/register`          | POST   | Public | Register a new user                              |
| `/users/login`             | POST   | Public | User login, returns JWT                          |
| `/users/profile`           | GET    | User   | Get user profile, accounts, and card requests    |
| `/users/request-card`      | POST   | User   | Request a new credit/debit card                  |
| `/users/deposit`           | POST   | User   | Request deposit to account                       |
| `/users/buy`               | POST   | User   | Make a purchase (runs fraud detection)           |
| `/users/logout`            | POST   | User   | Logout (client removes token)                    |

### Admin Routes

| Route                          | Method | Auth   | Description                                      |
|---------------------------------|--------|--------|--------------------------------------------------|
| `/admin/register`              | POST   | Public | Register a new bank admin                        |
| `/admin/login`                 | POST   | Public | Admin login, returns JWT                         |
| `/admin/profile`               | GET    | Admin  | Get admin profile and pending requests           |
| `/admin/approve-account/:id`   | PUT    | Admin  | Approve/reject user account                      |
| `/admin/approve-card/:id`      | PUT    | Admin  | Approve/reject card request                      |
| `/admin/approve-deposit/:id`   | PUT    | Admin  | Approve/reject deposit request                   |
| `/admin/transactions`          | GET    | Admin  | View all transactions and fraud results          |
| `/admin/logout`                | POST   | Admin  | Logout (client removes token)                    |

### Prediction Route

| Route         | Method | Auth   | Description                                      |
|---------------|--------|--------|--------------------------------------------------|
| `/predict`    | POST   | Internal| Predicts if a transaction is fraudulent using ML |

---

## Security & Authentication

- **JWT Authentication**:  
  - Users and admins receive a JWT token upon login.
  - Protected routes require the token in the `Authorization` header as `Bearer <token>`.
  - Middleware (`auth`, `adminAuth`) checks token validity and user/admin roles.

- **Password Hashing**:  
  - All passwords are hashed using bcrypt before storage.

- **Role-based Access**:  
  - User and admin routes are separated and protected accordingly.

- **Sensitive Data**:  
  - `.env` and `secret/` folders are git-ignored.
  - Never expose passwords or tokens in responses.

---

## Fraud Detection ML Model

- **Model**:  
  - A machine learning model is deployed on **Google Cloud Vertex AI**.
  - The model predicts the probability of a transaction being fraudulent based on transaction features.

- **Features Used**:  
  - Transaction amount, date/time, merchant info, user demographics, geolocation, etc.

- **Prediction Flow**:  
  - When a user makes a purchase (`/users/buy`), the backend collects all relevant features.
  - Sends a POST request to the `/predict` endpoint.
  - The `/predict` controller authenticates with GCP, sends data to Vertex AI, and receives a prediction.
  - If the transaction is flagged as fraud, it is not processed and is stored for review.

---

## Google Cloud Platform Integration

- **Vertex AI**:  
  - The fraud detection model is hosted on Vertex AI.
  - The backend uses the `google-auth-library` to obtain an access token using the service account key (`secret/frauddetection.json`).
  - All prediction requests are authorized and securely sent to the Vertex AI endpoint.

- **Geolocation**:  
  - Uses [OpenCage Geocoding API](https://opencagedata.com/) to convert merchant zip codes to latitude/longitude for additional fraud signals.

---

## Frontend Overview

- **React-based UI** for both users and admins.
- **Admin Dashboard**:  
  - View and approve/reject user registrations, card requests, and deposit requests.
  - Monitor all transactions and fraud alerts.
  - View analytics and manage customer accounts.
- **User Dashboard**:  
  - Register, login, and manage their account.
  - Request cards, deposit funds, and make purchases.
  - View transaction history and fraud alerts.

---

## Frontend Integration & Home Page Flow

- **Technology:**  
  The frontend is built using **ReactJS** and provides separate interfaces for both **bank admins** and **users**.

- **Unified Home Page:**  
  Both users and bank admins access the application through a **Main Home Page**. From here, they can choose to log in or register according to their role (user or admin).

- **Role-Based Dashboards:**  
  - **User Dashboard:**  
    After logging in, users are directed to their personalized dashboard where they can:
    - View and manage their bank accounts.
    - Request new credit/debit cards.
    - Make deposits and purchases.
    - View transaction history and fraud alerts.
  - **Bank Admin Dashboard:**  
    Admins, upon logging in, are redirected to the admin dashboard where they can:
    - Review and approve/reject user registrations, card requests, and deposit requests.
    - Monitor all transactions and fraud alerts.
    - Access analytics and manage customer accounts.

- **Protected Routes:**  
  The frontend uses **React Context** and **JWT tokens** to manage authentication and authorization.  
  - Users and admins are only able to access their respective dashboards and features after successful login.
  - Unauthorized access attempts are redirected to the login page.

- **Seamless Navigation:**  
  The navigation bar and sidebar dynamically adjust based on the logged-in user's role, ensuring a smooth and intuitive experience for both users and admins.

**This integration ensures that both users and bank admins have a secure, role-specific, and user-friendly experience, all managed from a single ReactJS-powered home page.**

---

## Project Flow

1. **User Registration**:  
   - User registers and awaits admin approval.
2. **Admin Approval**:  
   - Admin reviews and approves/rejects new users.
3. **Account Creation**:  
   - Upon approval, a bank account is created for the user.
4. **Card Request**:  
   - User requests a card; admin reviews and approves/rejects.
5. **Deposit Request**:  
   - User requests deposit; admin approves and funds are added.
6. **Purchase/Transaction**:  
   - User initiates a transaction.
   - Transaction details are sent to the ML model for fraud prediction.
   - If not fraud, transaction is completed and balance updated.
   - If fraud, transaction is flagged and stored for admin review.
7. **Admin Monitoring**:  
   - Admin can view all transactions, filter by fraud status, and take action.

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to your fork.
4. Submit a pull request with a clear description.

---

## Judges' Notes

- **Security**: All sensitive routes are protected by JWT and role-based middleware.
- **ML Integration**: Real-time fraud detection using a GCP-hosted model.
- **Scalability**: Modular codebase, easy to extend for new features or ML models.
- **Transparency**: All actions (approval, rejection, fraud detection) are logged and visible in the admin dashboard.
- **Cloud-Ready**: Designed for deployment on cloud platforms with secure key management.

---

**For any questions, please refer to the code comments or contact the project maintainers(developer).**

---

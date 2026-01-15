# 🍽️ CanteenSwiggy

*A Swiggy-inspired food ordering web app for college canteens*

CanteenSwiggy is a full-stack web application that replicates the **core functionality of Swiggy**, tailored specifically for a **college canteen ecosystem**.
Students can browse stalls, view menus, place orders, and track order status, while canteen staff can manage incoming orders in real time.

Built using **React, Tailwind CSS, Node.js, Express, and MongoDB**.

---

## ✨ Features

### 👨‍🎓 Student Features

* User authentication (Signup / Login)
* Browse canteen stalls
* View stall-specific menus
* Add items to cart
* Place orders (Pay on pickup)
* Track live order status
* View order history

### 👨‍🍳 Staff Features

* Staff login
* Select assigned stall
* View incoming orders
* Update order status:

  * Placed → Accepted → Preparing → Ready → Completed

### 🧠 System Features

* JWT-based authentication
* Role-based access control (Student / Staff)
* RESTful API architecture
* MongoDB data modeling
* Responsive UI (mobile-first)
* Polling-based real-time updates (easy to upgrade to WebSockets)

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

---

## 📁 Project Structure

```
canteen-swiggy/
├── client/        # React + Tailwind frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── store/
│   │   └── styles/
│   └── index.html
│
├── server/        # Node + Express backend
│   ├── src/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── config/
│   └── utils/
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+)
* MongoDB (local or MongoDB Atlas)
* Git

---

## 🔧 Backend Setup

```bash
cd server
cp .env.example .env
npm install
npm run seed
npm run dev
```

Backend runs on:
👉 `http://localhost:5000`

### Seeded Accounts

| Role    | Email                                             | Password   |
| ------- | ------------------------------------------------- | ---------- |
| Student | [student@college.edu](mailto:student@college.edu) | student123 |
| Staff   | [staff@college.edu](mailto:staff@college.edu)     | staff123   |

---

## 🎨 Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:
👉 `http://localhost:5173`

---

## 🔐 Environment Variables

### server/.env

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/canteen_swiggy
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

### client/.env (optional)

```env
VITE_API_URL=http://localhost:5000
```

---

## 🔁 Order Flow

1. Student logs in
2. Selects a stall
3. Adds items to cart
4. Places order
5. Staff receives order
6. Staff updates order status
7. Student sees live status updates

---

## 🧪 Testing Notes

* Manual testing for order lifecycle
* Polling used for live updates (every 3–5 seconds)
* MongoDB indexed on `userId`, `stallId`

---

## 🔮 Future Improvements

* WebSocket / Socket.io for real-time updates
* Online payments / campus wallet
* Admin dashboard
* Menu item images upload
* Ratings & reviews
* Notifications

---

## 📚 Learning Outcomes

* Full-stack application architecture
* Authentication & authorization
* REST API design
* React state management
* MongoDB schema design
* Industry-style project structure

---

## 🧑‍💻 Author

**Sonia Sharma**

---



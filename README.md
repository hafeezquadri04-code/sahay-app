# Sahay App

Sahay is a hackathon-ready social impact platform that helps people discover government schemes, scholarships, health programs, and skill development opportunities in one place.

## Problem Statement

Many people do not know which government schemes or welfare programs they are eligible for. Information is often scattered across multiple websites, written in complex language, and difficult to access for students, job seekers, women, farmers, and underserved communities.

Sahay solves this by providing a single platform where users can build a profile, check eligibility, and get personalized scheme recommendations.

## Features

- User registration and login
- Profile-based eligibility matching
- Scheme listing and scheme details page
- Personalized recommendations
- Chatbot support module
- Admin dashboard for managing schemes
- Clean frontend for hackathon demo and presentation

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js

### Database
- MongoDB

## Project Structure

```bash
sahay-app/
├── client/        # React frontend
├── server/        # Node.js + Express backend
├── docs/          # Project documentation
├── README.md
├── package.json
└── package-lock.json
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/hafeezquadri04-code/sahay-app.git
cd sahay-app
```

### 2. Setup frontend

```bash
cd client
npm install
npm run dev
```

### 3. Setup backend

Open a new terminal:

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

Create a `.env` file inside the `server` folder and add the required values.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_api_key_if_used
```

For the frontend, create a `.env` file inside the `client` folder if needed:

```env
VITE_API_URL=http://localhost:5000/api
```

## Use Case

Sahay is designed for:
- Students looking for scholarships
- Job seekers searching for skilling opportunities
- Citizens exploring welfare programs
- Underserved communities needing simple access to public schemes

## Future Improvements

- Multilingual support
- AI-powered chatbot guidance
- Smart document checklist
- State-wise and category-wise filtering
- Application tracking dashboard
- WhatsApp integration

## Hackathon Vision

This project is built as a real-world social impact solution aligned with hackathon themes like inclusive innovation, accessibility, ethical technology, and digital public service delivery.

## Contributors

- Hafeez Khadre
- Mohammed Adnan ul Haq
- Rahmath Ali
- Mohammed Sahil

## License

This project is created for learning and hackathon purposes.

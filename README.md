# 🧠 React Quiz App

A sleek, responsive quiz application built with **React**, **Tailwind CSS**, and **Framer Motion**. It features a dynamic question interface, smooth animated transitions, a fixed right-hand navigation sidebar for quick access, and tracks attempted and viewed questions.

---

## 🚀 Features

- ✅ 15-question interactive quiz
- ✅ Animated question transitions using Framer Motion
- ✅ Fixed right sidebar with question navigation
- ✅ Real-time answer tracking (attempted + viewed)
- ✅ Fully responsive layout with mobile toggle sidebar
- ✅ Clean UI with Tailwind CSS styling

---

## 🧩 Challenges Faced

### 1. Managing Fixed-Length Answer State
We needed to track user answers in a fixed array of size 15. Initially, direct state mutations (`push`, `splice`) caused bugs. We resolved this by using **immutable updates** with `setState` and shallow copies (`[...prev]`).

### 2. Triggering Animation on Question Change
Framer Motion animations didn’t replay because the component wasn’t unmounting. We solved this by assigning a **unique `key={currentIndex}`** to the `QuestionCard`, forcing remount and allowing smooth entrance animations.

### 3. Sidebar Interaction + Responsiveness
The sidebar had to:
- Show which questions were viewed or attempted.
- Be accessible on mobile via a toggle icon.
We used **Tailwind’s responsive classes** and state-driven UI to manage visibility and highlight question status.

---


## 🧭 Our Approach

We took a modular, user-first approach to building this quiz app:

### 1. Planning the Structure
We started by outlining the quiz flow:
- Load 15 questions from an API and start the timer
- Display one question at a time
- Track selected answers
- Show progress and allow navigation
- Display final results with summary

This helped us define component boundaries like `QuestionCard`, `Sidebar`, and `Result`

---

## 🛠️ Tech Stack

- **React** (Functional components + Hooks)
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation (optional)
- **JavaScript** (no TypeScript yet)

---

## 🧪 Folder Structure

src/
├── components/
│ └── QuestionCard.js
│ └── Sidebar.js
├── pages/
│ ├── Quiz.js
│ └── Result.js
├── App.js
├── index.js
└── styles/
└── index.css (Tailwind config)


## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/quiz-app.git
cd quiz-app

npm install

npm start

🌐 Live Demo
https://your-quiz-app-url.vercel.app
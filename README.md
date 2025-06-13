# 🧠 BrainiFi LMS — AI-Powered Learning Management System

BrainiFi LMS is a cutting-edge AI-powered Learning Management System designed to revolutionize personalized learning experiences. Built with **Next.js**, **Clerk**, **Inngest**, **Drizzle ORM**, and **Google Gemini AI**, it enables users to generate complete learning courses — including notes, flashcards, quizzes, and Q&A — in just seconds.

---

## 🚀 Key Features

| Feature                        | Description                                                                                  |
|---------------------------------|---------------------------------------------------------------------------------------------|
| 🎯 AI-Powered Course Generator  | Enter a topic, select a course type and difficulty level, and our Gemini-powered engine generates a structured course outline |
| 📚 Dynamic Study Materials      | Generate interactive notes, flashcards, quizzes, and Q&A dynamically from AI-curated content |
| 📈 Adaptive Learning Path       | Choose what material to generate — or generate all at once                                   |
| 🧮 MathAI Assistant             | Solve and explain math problems in real-time with step-by-step solutions                     |
| 📱 Multi-Device Responsive UI   | Clean, responsive design supporting both light and dark modes                                |
| 🔐 Clerk Authentication         | Seamless registration and login experience                                                   |
| 🗃️ Database Integration         | Drizzle ORM + Neon PostgreSQL for storing user data and generated content                    |
| 🔄 Inngest Background Tasks     | Orchestrates AI calls, DB operations, and study material generation asynchronously           |
| 🧪 Gamified Learning            | Swipeable flashcards, timed quizzes, and interactive Q&A for better engagement               |

---

## 🧑‍💻 Tech Stack

| Category        | Tech Used                                                                                  |
|-----------------|-------------------------------------------------------------------------------------------|
| Frontend        | Next.js 14 (App Router), React, Tailwind CSS 4, Ripple UI, Swiper.js, Styled Components, React Card Flip |
| Backend         | Node.js, Inngest (Serverless Functions), Google Gemini API                                 |
| Authentication  | Clerk                                                                                      |
| Database        | Neon Serverless PostgreSQL + Drizzle ORM                                                   |
| AI Integration  | Google Gemini (text generation, course content)                                            |

---

## 🌐 Live Demo

Try it out now 👉 [https://brainifi-lms.vercel.app](https://brainifi-lms.vercel.app)

---

## 📁 Project Structure
```
├── app/
│ ├── api/ # API Routes
│ ├── course/[courseId]/ # Dynamic Course Details Page
│ ├── create/ # Course Creation Page
│ ├── dashboard/ # User Dashboard
│ ├── components/ # Reusable Components
│ ├── layout.js # App Layout
│ ├── page.js # Landing Page
│ └── provider.js # Clerk Authentication Provider
├── configs/
│ ├── AiModel.js # Gemini Model Configuration
│ ├── db.js # DB Setup (Drizzle)
│ └── schema.js # DB Schema
├── inngest/
│ ├── client.js # Inngest Client Setup
│ └── functions.js # Background Task Functions
├── public/ # Static Assets
├── styles/ # Global Styles
```

---

## 🔧 Installation & Setup

**Clone the Repository**
```
git clone https://github.com/your-username/brainifi-lms.git
cd brainifi-lms
```

**Install Dependencies**
```
npm install
```

**Create `.env.local` File**
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_DATABASE_CONNECTION_STRING=your_neon_database_url
NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key
NEXT_PUBLIC_INNGEST_EVENT_KEY=your_inngest_key
```

**Run the App Locally**
```
npm run dev
```

---

## 📡 API Routes Summary

| Endpoint                    | Description                                                    |
|-----------------------------|----------------------------------------------------------------|
| `/api/courses`              | Get or create courses                                          |
| `/api/create-user`          | Called on first login to register new user in DB               |
| `/api/generate-course-outline` | Triggers AI to generate structured course outline           |
| `/api/study-type`           | Fetch study material by type or all types                      |
| `/api/study-type-content`    | Triggers Inngest to generate specific study materials         |

---

## ⚙️ Inngest Functions

| Function              | Purpose                                               |
|-----------------------|------------------------------------------------------|
| CreateNewUser         | Registers new user to DB after first login           |
| GenerateNotes         | Uses Gemini to generate topic-wise notes             |
| GenerateStudyTypeContent | Generates flashcards, quizzes, and Q&A           |
| helloWorld            | Test/demo function (optional)                        |

---

## 🛠️ Environment Variables (Required)

| Variable                             | Description                   |
|---------------------------------------|-------------------------------|
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY     | Clerk frontend key            |
| CLERK_SECRET_KEY                      | Clerk backend key             |
| NEXT_PUBLIC_GEMINI_API_KEY            | Google Gemini API key         |
| NEXT_PUBLIC_DATABASE_CONNECTION_STRING| Neon DB URL                   |
| NEXT_PUBLIC_INNGEST_EVENT_KEY         | Inngest function trigger key  |

> 💡 All must be added on Vercel for production deployment.

---

## 💡 Future Roadmap

- ✅ MathAI with step-by-step solver
- ✅ Swipeable Flashcards
- ✅ Gamified Quizzes
- 🔜 AI Audio Narration
- 🔜 Course Sharing/Export
- 🔜 Teacher Dashboard for LMS tracking
- 🔜 AI Voice Assistant integration

---

## 🤝 Contributing

We welcome contributions!  
Fork, branch, commit, push, and open a pull request 🚀

---

## 📜 License

This project is licensed under the MIT License.

[MIT](https://choosealicense.com/licenses/mit/)

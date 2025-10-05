# ADHD Awareness Web App

This is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) to raise awareness about ADHD. The application includes features such as user authentication, content management, a chatbot, and various functionalities to engage users.

## Features

- **User Authentication and Authorization**  
  Users can register, log in, and log out. Admin users have the ability to manage content.

- **Admin Controls**  
  - Create, read, update, and delete posts.  
  - Promote users to admin roles.  
  - Notify users who subscribed to the newsletter whenever a new post is created using Nodemailer.  

- **User Interactions**  
  - Users can comment on posts if they are logged in.  
  - Users can take an ADHD test.

- **Dark Mode and Light Mode**  
  Users can switch between dark and light themes for better accessibility.

- **Chatbot**  
  A chatbot is integrated to provide support and information related to ADHD and mental health.

- **Dashboard**  
  Admin and users have access to a dashboard to manage their activities.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm or yarn
- MongoDB

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   
2. **Installation
   ```bash
   npm install

2. **.env
   ```bash
   PORT=8000
   DB_URI=
   JWT_SECRET_KEY=
   GOOGLE_API_KEY=

   EMAIL_USER=
   EMAIL_PASS=
   
2. **start frontend
   ```bash
   npm run dev
   
2. **start backend
   ```bash
   npm run start:dev

 Feel free to submit issues or pull requests if you find any bugs or want to add new features!  

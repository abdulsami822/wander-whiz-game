# 🌍 WanderWhiz ✨

WanderWhiz is an interactive geography guessing game where players test their knowledge of world destinations through engaging clues and challenges.

## 🎮 Features

- **Geography Guessing Game**: Test your knowledge of cities and countries around the world.
- **Progressive Clues**: Reveal additional hints if you're stuck, but use fewer clues for higher scores.
- **Multiple Difficulty Levels**: Choose from Easy, Medium, or Hard challenges.
- **Challenge Friends**: Generate shareable challenge cards to compete with friends.
- **User Profiles**: Track your high scores and game statistics.
- **Responsive Design**: Play seamlessly on desktop or mobile devices.

---

## 🚀 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Backend/Database**: Supabase
- **Authentication**: Supabase Auth
- **State Management**: React Context API
- **Animation**: Framer Motion
- **Special Effects**: Canvas Confetti

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or bun package manager
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/abdulsami822/wander-whiz-game.git
   cd wander-whiz-game
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or if using bun
   bun install
   ```

3. **Set up environment variables**  
   Create a `.env` file in the root directory and add:

   ```plaintext
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at **[http://localhost:8080](http://localhost:8080)**.

---

### Setup Guide

To set up the project from scratch:

1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Start the development server

Refer to the **Getting Started** section above for detailed steps.

### Architecture Overview

The project follows a modular architecture:

- **Frontend** (React + Vite) for UI interactions
- **Backend** (Supabase) for authentication and database
- **State Management** via React Context API
- **Game Logic** is structured using React hooks

### Features Documentation

- **Single Player Mode**: Players guess locations based on clues.
- **Challenge Mode**: Players can challenge friends and share scores.
- **User Profiles**: Tracks user scores and statistics.
- **Game Scoring**: Scores are calculated based on correct guesses and hints used.

### Multiplayer Features

- **Username Registration**: Players register before inviting friends.
- **Challenge Link**: Players can share an invite link with a dynamic image.
- **Score Display**: Invited friends can see the sender’s score before playing.

### API Documentation

- **User Registration API**: Handles storing player profiles in Supabase.
- **Challenge API**: Generates and stores challenge links.
- **Leaderboard API**: Fetches top players' scores.

### Deployment Guide

1. Deploy the frontend using **Vercel, Netlify, or Cloudflare Pages**.
2. Configure Supabase database and authentication.
3. Ensure `.env` variables are set in production.
4. Use a CDN for static assets like challenge images.

### Troubleshooting

#### Issue: Environment variables not loading

**Solution**: Ensure `.env` file is present in the root and restart the server.

#### Issue: Supabase authentication failing

**Solution**: Check Supabase API keys and permissions.

---

## 🎯 Game Rules

1. You'll be presented with clues about a mystery destination.
2. Choose the correct city from multiple options.
3. Reveal additional clues if needed (but each clue reduces potential points).
4. Earn points for correct guesses.
5. Complete multiple rounds to get your final score.
6. Challenge friends to beat your score!

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new feature branch (`git checkout -b feature-branch`)
3. Commit changes (`git commit -m "Add new feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

---

## 👏 Acknowledgments

- Geography data sourced from various public APIs.
- Icons provided by **Lucide React**.
- UI components from **shadcn/ui**.

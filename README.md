# 🚀 Innovation Hub - Start Hack 2025

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.2.3-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6.5.0-blue?logo=prisma&logoColor=white)

</div>

## 🌟 About the Project

Welcome to Innovation Hub, our exciting submission for Start Hack 2025! This project represents our team's vision for making innovation accessible to everyone. We've built a comprehensive platform that combines cutting-edge technology with practical guidance to help businesses and individuals transform their innovative ideas into reality.

### 🎯 Key Features

- **🤖 AI-Powered Guidance**: Get instant, personalized answers to your innovation questions
- **📚 Structured Learning Paths**: Step-by-step guides tailored to your industry
- **📰 Industry-Specific News**: Stay updated with the latest developments in your sector
- **🎯 Personalized Experience**: Content and recommendations based on your profile and needs
- **📊 Progress Tracking**: Monitor your innovation journey with our intuitive tracking system

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.2.3, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: PostgreSQL with Prisma ORM
- **UI Components**: Radix UI
- **AI Integration**: OpenAI SDK
- **Authentication**: Next.js Auth

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ralf-boltshauser/gallovate-start-hack-2025
cd innovation-hub
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up your environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database:
```bash
pnpm prisma generate
pnpm prisma migrate dev
```

5. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (app)/             # Main application routes
│   ├── (onboarding)/      # Onboarding flow
│   ├── api/               # API routes
│   └── components/        # Shared components
├── lib/                   # Utility functions and hooks
└── prisma/               # Database schema and migrations
```

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Our amazing team members who worked tirelessly on this project
- The Start Hack 2025 organizers for this incredible opportunity
- All the open-source tools and libraries that made this project possible

---

<div align="center">
Made with ❤️ for Start Hack 2025
</div>

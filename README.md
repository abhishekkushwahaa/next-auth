# Complete Authentification with Next.js and MongoDB

## Description

This is a complete authentification system with Next.js and MongoDB. It includes the following features:

- Sign up
- Sign in (with email and password, Google, and GitHub)
- Sign out
- Email verification
- Password reset
- Update user profile
- Update user password
- Update user email
- Delete user account

## Technologies

- Next.js
- Prisma
- MongoDB
- Tailwind CSS
- VineJs (Form validation)
- NextAuth.js
- Vercel (Deployment)

## Installation

1. Clone the repository
2. Install the dependencies
3. Create a `.env.local` file and add the following environment variables:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000
DATABASE_URL="mongodb://localhost:27017/your-database-name"
```

### Run the development server

```bash
npm run dev
# or
yarn dev
```

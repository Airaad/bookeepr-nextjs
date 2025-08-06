# 📚 BooKeeper — Smart Book Note Taking App

Bookeeper is a full-stack Next.js application that allows users to easily take notes on books they've read. Just enter the **title**, **author**, or **ISBN**, and all relevant book details (such as cover image, author, title, publication date, and description) are fetched automatically. Users can then save notes, ratings, and personal insights securely.

## 🔗 Live Demo

[👉 Visit BookNote (Coming Soon)]

---

## ✨ Features

- 🔍 Search books by title, author, or ISBN
- 📖 Auto-fetch book details using public book APIs
- 📝 Take and save personal notes per book
- ⭐ Rate the books you’ve read
- 👤 Secure Google authentication via NextAuth.js
- 🗂️ Organized storage using PostgreSQL and Prisma ORM
- ⚡ Fast, modern full-stack Next.js architecture with the power of SSR 

---

## 🧰 Tech Stack

| Tech               | Usage                                |
|--------------------|--------------------------------------|
| **Next.js**        | Full-stack React framework           |
| **NextAuth.js**    | Authentication (Google OAuth)        |
| **Prisma**         | Type-safe ORM for database access    |
| **PostgreSQL**     | Relational database                  |
| **Tailwind CSS**   | Styling                              |
| **Book APIs**      | (Open Library) |

---

## 🚀 Manual Installation

### 1. Prerequisites
Make sure you have the following installed on your machine:

`node`

### 2. Clone the repo

```bash
git clone https://github.com/Airaad/bookeepr-nextjs.git
```

### 3. Install the dependencies

```bash
npm intall
```

### 4. Setup environment variables
Create a `.env` file in the root directory and add the following:

```bash
DATABASE_URL="postgres db url"
NEXTAUTH_SECRET="your next auth secret"
GOOGLE_CLIENT_ID="your google client id"
GOOGLE_CLIENT_SECRET="your google client secret"
```

### 5. Run Prisma migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 6. Run the development server

```bash
npm run dev
# or
yarn dev
```

## 🚀 Docker Installation

### 1. Prerequisites
Make sure you have the following installed on your machine:

`Docker`

`Docker Compose`

### 2. Clone the repo

```bash
git clone https://github.com/Airaad/bookeepr-nextjs.git
```

### 3. Setup environment variables
Create a `.env` file in the root directory and add the following:

```bash
NEXTAUTH_SECRET=your next auth secret
GOOGLE_CLIENT_ID=your google client id
GOOGLE_CLIENT_SECRET=your google client secret
```
⚠️ Important:
Do not wrap environment variable values in quotes (e.g. "value" or 'value').
Docker Compose may misinterpret quotes as literal characters, which can break the container.
### 4. Run the app using Docker Compose:
```bash
docker-compose up -d
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



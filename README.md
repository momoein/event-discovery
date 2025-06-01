# Event Discovery Platform API

A backend REST API built with **NestJS** and **PostgreSQL** that allows users to discover, create, search, and RSVP to local events. It includes location-based features like distance filtering and geolocation.

---

## 📦 Features

- 🔐 **User Authentication** (JWT-based)
- 📅 **Event Management** (CRUD operations with ownership enforcement)
- 🔎 **Advanced Search** (by name, location, distance)
- 📍 **Geolocation Support** (using nominatim API)
- ✅ **RSVP System** (Attend/Cancel events)
- 🧭 **Nearby Events** (based on user’s approximate coordinates)
- 🌐 **Swagger Documentation**
- 🧪 **Unit and e2e Testing** with Jest
- 🐘 **PostgreSQL** with TypeORM
- 🐳 **Dockerized** 

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18.x
- PostgreSQL (or use Docker)
- Docker & Docker Compose (optional)

---

### 🔧 Local Setup

1. **Clone the repository**

```bash
git clone https://github.com/momoein/event-discovery.git
cd event-discovery
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

Create a `.env` file based on `.env.example`:

```env
JWT_SECRET=verysecretkey
JWT_EXPIRES_IN=1h

# Database configuration
DB_HOST=localhost
DB_PORT=5434
DB_USERNAME=postgres
DB_PASSWORD=Password123!
DB_NAME=postgres

```

4. **Run with PostgreSQL via Docker (recommended)**

```bash
docker-compose up --build
```

5. **Start the development server**

```bash
npm run start:dev
```

---

## 🗃 Database Schema

Entities:

- **User**
- **Event**
- **RSVP**

Relationships:

- `User 1:N Event` (creator)
- `User N:M Event` through `RSVP` (attendees)

> You can generate a visual ERD using `typeorm-uml` or tools like [dbdiagram.io](https://dbdiagram.io).

---

## 📘 API Documentation

After running the server, access:

```
http://localhost:3000/swagger
```

Interactive Swagger UI with all endpoints.

### Example Endpoints

- `POST /auth/register` – Register a new user
- `POST /auth/login` – Login and receive JWT
- `POST /events` – Create an event (auth required)
- `GET /events` – List all events
- `GET /search/events?name=tech&lat=...&lng=...&radius=...` – Search by keyword and location
- `POST /rsvp/:eventId` – RSVP to an event
- `DELETE /rsvp/:eventId` – Cancel RSVP

---

## 🧪 Testing

Run tests with:

```bash
npm run test
```

> Includes basic unit tests and integration (e2e) tests for auth, events, and RSVP.

---

## 🌍 Deployment

You can deploy this app to **Render**, **Railway**, **Fly.io**, or **Heroku**.

A sample deployment command (Render):

1. Push your repo to GitHub
2. Go to [render.com](https://render.com) > New Web Service
3. Connect repo, set environment variables, use `npm run start:prod` as start command

---

## 📂 Project Structure

```
src/
├── auth/              # Auth logic and JWT guards
├── events/            # Event CRUD logic
├── rsvp/              # RSVP system
├── search/            # Search and geolocation
├── users/             # User service
├── common/            # Interceptors, filters
├── main.ts            # App entry
├── app.module.ts      # Root module
```

---

## 📌 Future Improvements

- Event categories and tags
- Full-text search
- Admin panel or moderation
- Email notifications

---

## 🧑‍💻 Author

Built with ❤️ by [@momoein](https://github.com/momoein)

---

## 📄 License

MIT License
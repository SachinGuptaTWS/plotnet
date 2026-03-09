# PlotNet — Plot Booking and Management System

A full-stack web application for plot booking and management built as a final year B.Tech project.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 21, TailwindCSS v3, TypeScript |
| Backend | Java 17, Spring Boot 3.2, Spring Security, JWT |
| Database | PostgreSQL (NeonDB — serverless) |
| Build Tools | Maven 3.9, Angular CLI 21 |

## Features

- User registration with admin verification workflow
- Plot listings with filters (location, area, price)
- Online booking with simulated payment gateway
- Receipt download (PDF print)
- User dashboard (booking history, profile edit)
- Admin panel (manage plots, bookings, users, dashboard analytics)
- JWT-based authentication with role-based access (ADMIN / ASSOCIATE)

## Project Structure

```
plotnet/
├── com.plotnet.dto/        # Spring Boot backend
│   └── src/main/
│       ├── java/com/plotnet/
│       │   ├── config/         # Security, CORS, DataSeeder
│       │   ├── controller/     # REST controllers
│       │   ├── dto/            # Data Transfer Objects
│       │   ├── model/          # JPA entities
│       │   ├── repository/     # Spring Data repositories
│       │   ├── security/       # JWT filter & utilities
│       │   └── service/        # Business logic
│       └── resources/
│           └── application.properties.example
└── plotnet-frontend/       # Angular frontend
    └── src/app/
        ├── core/           # Services, Guards, Interceptors
        ├── models/         # TypeScript interfaces
        ├── pages/          # Feature modules (auth, admin, dashboard, booking)
        └── shared/         # Navbar, Sidebar components
```

## Setup & Running

### Prerequisites
- Java 17+
- Maven 3.9+
- Node.js 20+, npm 10+
- A [NeonDB](https://neon.tech) PostgreSQL database

### Backend

```bash
cd com.plotnet.dto

# Copy the example config and fill in your NeonDB credentials
cp src/main/resources/application.properties.example src/main/resources/application.properties
# Edit application.properties with your DB URL, username, password

# Run
mvn spring-boot:run
# Server starts on http://localhost:8080
```

On first run the `DataSeeder` automatically creates:
- **Admin user** — `admin@plotnet.com` / `Admin@1234`
- **6 sample plots** across Rajasthan cities

### Frontend

```bash
cd plotnet-frontend
npm install
ng serve
# App starts on http://localhost:4200
```

## Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@plotnet.com | Admin@1234 |
| Associate | Register via /register (requires admin approval) |

## API Endpoints (summary)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/auth/signup | Public | Register user |
| POST | /api/auth/login | Public | Login, returns JWT |
| GET | /api/plots | Public | List all plots |
| GET | /api/plots/:id | Public | Plot details |
| POST | /api/bookings | JWT | Create booking |
| GET | /api/bookings/my | JWT | My bookings |
| POST | /api/payments/verify | JWT | Process payment |
| GET | /api/admin/dashboard | ADMIN | Dashboard stats |
| GET | /api/admin/plots | ADMIN | Manage plots |
| GET | /api/admin/bookings | ADMIN | Manage bookings |
| GET | /api/admin/users | ADMIN | Manage users |

## Mapped UN SDGs

| SDG | Mapping |
|-----|---------|
| Reduced Inequalities | Transparent digital land access |
| Sustainable Cities | Digital infrastructure for real estate |
| Industry & Innovation | Automation of manual property workflows |

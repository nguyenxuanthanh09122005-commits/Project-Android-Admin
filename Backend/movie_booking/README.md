# 🎬 Movie Ticket Booking System

A backend system for a Movie Ticket Booking application built with Spring Boot.  
This project provides RESTful APIs for managing movies, cinemas, showtimes, seats, and bookings with authentication and role-based access control.

---

## 🚀 Features

### 👤 Authentication
- User registration
- User login (JWT authentication)
- Get current user information

### 🎥 Movie Management
- Create, update, delete movies (Admin)
- View movie list and movie details (User)

### 🏢 Cinema Management
- Manage cinemas (Admin)
- View cinema details

### 🕒 Showtime Management
- Create and manage showtimes (Admin)
- View showtimes and available seats

### 🪑 Theater Room & Seat Management
- Manage theater rooms per cinema
- Create seats individually or in bulk
- Delete seats

### 🎟 Booking System
- Book movie tickets
- View booking history
- Admin booking management

---

## 🛠 Tech Stack

- Java 17+
- Spring Boot
- Spring Security (JWT)
- Spring Data JPA
- MySQL
- Maven
- Swagger / OpenAPI

---

## 📁 Project Structure

```bash
src
├── controller
├── service
├── repository
├── entity
├── dto
├── security
├── config
└── exception
```

---

## ⚙️ How to Run

### 1. Clone repository

```bash
git clone https://github.com/duongncg/movie_booking.git
cd movie_booking
```

### 2. Configure database

Create MySQL database:

```sql
movie_booking_db
```

Copy config file:

```
application-example.properties → application.properties
```

Update your local config:

```properties
spring.datasource.username=root
spring.datasource.password=your_password
```

### 3. Run project

```bash
mvn spring-boot:run
```

---

## 📚 API Documentation

Swagger UI:

```
http://localhost:8080/swagger-ui/index.html
```

OpenAPI JSON:

```
http://localhost:8080/v3/api-docs
```

---

## 🔐 Security

- JWT-based authentication
- Role-based authorization (USER / ADMIN)
- Protected admin endpoints

---

## 📲 Mobile App Integration

This backend is designed to support a mobile movie booking application with flows:

- Browse movies
- View showtimes
- Select seats
- Book tickets
- View booking history

---

## 👨‍💻 Author

Developed by: Your Name  
GitHub: [https://github.com/duongncg](https://github.com/duongncg)

---

## 📄 License

This project is for educational purposes (student project).

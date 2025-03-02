# Sales Management System

![Node.js](https://img.shields.io/badge/Node.js-14.x-green)
![Express.js](https://img.shields.io/badge/Express.js-4.x-blue)
![React.js](https://img.shields.io/badge/React.js-17.x-61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-5.x-green)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![Swagger](https://img.shields.io/badge/Swagger-API%20Documentation-brightgreen)
![Docker](https://img.shields.io/badge/Docker-Containerization-2496ED)
![License](https://img.shields.io/badge/License-MIT-blue)

A full-stack **Sales Management System** built with **Node.js (Express.js)** for the backend, **React.js** for the frontend, and **MongoDB** as the database. This application includes **JWT-based authentication**, **CRUD operations** for sales records, and **Swagger API documentation**.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running with Docker](#running-with-docker)
   - [Running without Docker](#running-without-docker)
4. [Project Structure](#project-structure)
5. [API Documentation](#api-documentation)
   - [Authentication](#authentication)
   - [Sales Management](#sales-management)
6. [Environment Variables](#environment-variables)
7. [License](#license)
8. [Contributing](#contributing)
9. [Acknowledgments](#acknowledgments)
10. [Contact](#contact)

---

## Features

### Backend
- **REST API** built with Node.js and Express.js.
- **JWT-based authentication** for secure access.
- **MongoDB** for storing sales records.
- **Swagger (OpenAPI)** for API documentation.
- **CRUD operations** for managing sales records.

### Frontend
- **Login Page**: Authenticate users and generate JWT tokens.
- **Sales Form**: Create new sales records.
- **Sales List**: Display all sales records retrieved from the backend.

---

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing sales data.
- **JWT (JSON Web Tokens)**: For secure authentication.
- **Swagger (OpenAPI)**: API documentation.

### Frontend
- **React.js**: JavaScript library for building the user interface.
- **Axios**: For making HTTP requests to the backend.
- **React Router**: For navigation between pages.

### Tools
- **Docker**: For containerization.
- **Docker Compose**: For managing multi-container applications.

---

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- **Docker** and **Docker Compose** installed.
- **Node.js** (optional, if running without Docker).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/balan18/NodeJs-and-React-Full-Stack.git

2. Start the application using Docker Compose:
   ```bash
   docker-compose up --build

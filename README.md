# Course Platform – Microservices Architecture

A microservices-based web application designed to manage online courses with secure authentication and role-based access control.

## Overview
This project follows a microservices architecture where core functionalities are split into independent backend services. An API Gateway acts as the single entry point for the frontend, ensuring secure and structured communication with backend services.

## Architecture
- **API Gateway** – Central entry point for all frontend requests  
- **Auth Service** – Handles authentication, JWT generation, and role management  
- **Course Service** – Manages courses and course purchases  
- **Frontend** – React-based UI communicating only with the API Gateway  

## Key Features
- JWT-based authentication
- Role-based access control  
  - Admin / Instructor: Add courses  
  - Student: Browse and purchase courses
- Secure frontend-to-backend communication via API Gateway
- Persistent course purchase tracking
- Responsive and clean UI using Tailwind CSS

## Tech Stack
- **Backend:** Node.js, Express.js  
- **Frontend:** React.js, Tailwind CSS  
- **Database:** PostgreSQL  
- **Authentication:** JWT  
- **Architecture:** Microservices, API Gateway  

## Project Structure
microservices/
├── api-gateway
├── auth-service
├── course-service
├── frontend

## How It Works
1. User interacts with the frontend
2. Frontend sends requests to the API Gateway
3. API Gateway routes requests to appropriate backend services
4. Auth Service validates JWT and user roles
5. Course Service processes course-related operations

## Status
Project is functionally complete and structured for further enhancements.


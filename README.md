# Weather-App

## Overview
The **Weather App** is a full-stack web application that provides real-time weather information. The project consists of a **frontend (React)** and a **backend (Flask with MySQL)**, containerized using **Docker**.

## Features
- Fetches real-time weather data
- Fully Dockerized for easy deployment
- Configurable API endpoint for backend service

---

## Getting Started
### 1️⃣ Clone the Repository
To get started, clone the repository to your local machine:

```sh
git clone https://github.com/arianghoochani/Weather-App.git
cd Weather-App
```

### 2️⃣ Configure Backend Endpoint

The frontend needs to know where the backend is hosted. Update the API endpoint in the frontend configuration file.

1. Open the following file:
```sh
weatherapp_project/weather_frontend/src/store/endpoint.json
```
2. Replace the existing IP (116.203.184.212) with your server's IP:

```sh
{
   "weather_service": "http://<YOUR_SERVER_IP>:5000/api/weather",
   "weather_service_with_slash": "http://<YOUR_SERVER_IP>:5000/api/weather/"
}
```

### 3️⃣ Build the Frontend

After updating the endpoint, build the frontend:

```sh
cd weatherapp_project/weather_frontend
npm install  # Ensure dependencies are installed
npm run build
```

### 4️⃣ Build and Run the Full-Stack Application

Navigate to the project root where the Dockerfile is located and execute the following commands:
## For Docker Compose v2 (modern Docker)
```sh
docker compose build
docker compose up -d
```

## The Weather App is now running!

Once the services are up, you can access the frontend by opening the browser and navigating to:

```sh
http://<YOUR_SERVER_IP>:80
```

and the backend is running on:
```sh
http://<YOUR_SERVER_IP>:5000/api/weather
```

Additionally, the OpenAPI documentation for the backend is available at:
```sh
http://<YOUR_SERVER_IP>:5000/api/ui
```
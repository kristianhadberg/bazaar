
# Bazaar


## Overview

Bazaar is a web application for managing auctions. Users can create auctions, place bids, and view auction details in real-time.

## Features

-   User authentication
-   Auction creation
-   Real-time bidding using Socket.io
-   Category filtering for items and auctions
-   File uploads for auction images using multer


## Technologies used
- **Backend:**
   - **TypeScript**
   - **Express**
   - **Mongoose (ORM)**
   - **Socket io**
- **Frontend:**
   - **React**
   - **TypeScript**
   - **React Query**
   - **Socket io**

## Getting Started

To get started with the Code Lab E-Learning Platform, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kristianhadberg/bazaar.git
   cd bazaar
2. **Install  the dependencies:**
   ```bash
   npm install
3. **Setup environment:**
	Create a .env file in the **server** and **client** directory. Values have to match your own configuration.
   ```bash
   ./client/.env:
   VITE_BAZAAR_API_URL=http://localhost:8080/api
   VITE_BACKEND_URL=http://localhost:8080/
   
   ./server/.env:
   PORT=8080
   CLIENT_URL=http://localhost:5173
   MONGO_URI=mongodb://localhost:27017/bazaar


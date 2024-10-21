
# Nuxt App with Express Backend - Setup Instructions

Welcome to the setup guide for the Nuxt app with an Express.js server backend. This document provides step-by-step instructions to get the application up and running on your local machine, as well as how to build and test the application.

## Prerequisites

- **Node.js** (version 20.17.0 or higher recommended)
- **npm** (Node Package Manager)

Ensure that both Node.js and npm are properly installed by running the following commands:

```bash
node -v
npm -v
```

## Project Structure

- **/**: This folder contains the Nuxt front-end project.
- **/server**: This folder contains the Express server for backend purposes.
  - **index.js**: The main entry point of the server.


## Setup Instructions

### 1. Clone the Repository

First, clone the repository to your local machine.

```bash
git clone https://github.com/hajkli/nhm-fe-assignment.git
cd nhm-fe-assignment
```

### 2. Install Server Dependencies

Navigate to the `/server` directory and install the dependencies for the backend server.

```bash
cd server
npm install
```

This will install Express and CORS, which are required for the backend to serve the API.

### 3. Start the Backend Server

To start the server, run the following command inside the `/server` directory:

```bash
node index.js
```

The server will be accessible at `http://localhost:3001`. The backend serves words data at the endpoint `/words`.

### 4. Install Nuxt Application Dependencies

Now, navigate to the Nuxt application directory (`/nuxt-app`) and install the necessary dependencies.

```bash
open root folder
npm install
```

This command will install all the required dependencies, including Nuxt, Vue 3, Vue Router, Vuex, and Tailwind CSS.

### 5. Run the Application in Development Mode

To run the Nuxt app in development mode, execute the following command:

```bash
npm run dev
```

The Nuxt application will start and should be accessible at `http://localhost:3000`.

### 6. Build the Application for Production

To build the application for production, use the following command:

```bash
npm run build
```

After the build is completed, you can preview it by running:

```bash
npm run preview
```

### 7. Run Tests

This application uses **Jest** for testing and **Cypress** for end-to-end tests. Follow these steps to run the tests:

#### Run Unit Tests with Jest

To run unit tests, execute the following command:

```bash
npm run test
```

Ensure all tests are passing before moving forward.

#### Run End-to-End Tests with Cypress

To run Cypress end-to-end tests, use:

```bash
npx cypress open
```

This will open the Cypress GUI where you can choose the tests to run, or you can run them directly from the command line:

```bash
npx cypress run
```

## Summary of Commands

| Task                           | Command                      |
|---------------------------------|------------------------------|
| Install server dependencies     | `cd server && npm install`    |
| Start backend server            | `node index.js`               |
| Install front-end dependencies  | `cd nuxt-app && npm install`  |
| Run app in development mode     | `npm run dev`                 |
| Build the application           | `npm run build`               |
| Run unit tests with Jest        | `npm run test`                |
| Run Cypress end-to-end tests    | `npx cypress open`            |

## Important Notes

- Ensure that the server (`/server/index.js`) is running before starting the Nuxt front-end application to avoid API connectivity issues.
- Adjust the `HOST` and `PORT` variables in `server/index.js` if you're deploying or using a different environment.

<xaiArtifact artifact_id="a417bf56-027f-4dfd-9a5c-54600c9747e0" artifact_version_id="b5f7ba12-d73a-40f3-b356-f6aa6911fea2" title="README.md" contentType="text/markdown">

# Welcome to Your Recipe App 👋

This is a recipe discovery app built with [React Native](https://reactnative.dev/) and [Expo](https://expo.dev), designed to help you find and explore recipes. The app connects to a backend API built with [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/) to fetch and manage recipe data.

## Get Started

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies

Install the required dependencies for both the frontend (React Native) and backend (Node.js + Express).

#### Frontend
Navigate to the project root directory and run:

```bash
npm install
```

#### Backend
Clone the recipe_app_api repo and run:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `backend/` directory and configure the necessary environment variables (e.g., database connection details, API keys). Example:

```env
PORT=5000
DATABASE_URL=your_database_connection_string
```

Check the backend documentation for specific configuration requirements.

### 4. Start the Backend API

From the `backend/` directory, start the Node.js + Express server:

```bash
npm start
```

The backend API will typically run on `http://localhost:5001`.

### 5. Start the Frontend App

From the project root directory, start the Expo app:

```bash
npx expo start
```

In the output, you'll find options to open the app in a:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

### 6. Configure API Endpoint

Ensure the React Native app is configured to connect to the backend API. Update the API URL in the frontend configuration (e.g., in `app/config.js` or similar) to point to your backend (e.g., `http://localhost:5000/api`).

### 7. Start Developing

Edit files inside the **app** directory to develop the frontend. The project uses [file-based routing](https://docs.expo.dev/router/introduction) for navigation. Modify the backend code in the `backend/` directory to update API endpoints or logic.

## Learn More

Explore these resources to enhance your development experience:

- [React Native Documentation](https://reactnative.dev/docs/getting-started): Learn the fundamentals of React Native.
- [Expo Documentation](https://docs.expo.dev/): Dive into Expo fundamentals or advanced [guides](https://docs.expo.dev/guides).
- [Learn Expo Tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial for creating a project that runs on Android, iOS, and the web.
- [Node.js Documentation](https://nodejs.org/en/docs/): Understand the backend runtime environment.
- [Express Documentation](https://expressjs.com/en/starter/installing.html): Learn how to build APIs with Express.

</xaiArtifact>

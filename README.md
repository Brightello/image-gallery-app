# Image Gallery App

A responsive and interactive image gallery application designed to demonstrate clean architecture, dynamic UI rendering, and real-time data capabilities.

## 🌐 Live Demo

Experience the application live: [https://chipper-bienenstitch-3d0d9e.netlify.app](https://chipper-bienenstitch-3d0d9e.netlify.app)

## 🚀 Features

- **Responsive Design** – Optimized for various screen sizes and devices.
- **Dynamic UI Rendering** – Built using modern front-end frameworks for smooth and fast interactions.
- **Real-time Data Handling** – Powered by cloud-based services for instant updates.
- **Clean Architecture** – Structured codebase for scalability and maintainability.

## 🛠️ Technologies Used

- **Front-end**: React.js, Chakra UI
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Build Tools**: Vite
- **Hosting**: Netlify

## 📁 Project Structure

```
image-gallery-app/
/src
   /firebase         - Firebase configuration and initialization
   /components      - Reusable UI elements (e.g., buttons, modals)
   /context         - Application context providers (e.g., AuthContext, UserContext)
   /constants          - Static values and config (e.g., routes)
   /hooks              - Custom React hooks
   /utils              - Utility functions and helpers
     App.tsx             - Main application component
     main.tsx            - Application entry point
```

## Getting Started

### Prerequisites

- Node.js v20.11.1 or higher
- npm or yarn
- A Firebase project

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Brightello/image-gallery-app
   cd image-gallery-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Firebase](https://firebase.google.com/)
- [Chakra UI](https://chakra-ui.com)
- [Netlify](https://app.netlify.com)

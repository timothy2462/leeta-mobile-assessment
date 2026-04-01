# Leeta Agent Order Management Dashboard

Welcome to the **Leeta Agent Dashboard**, built as part of the Founding Engineer Frontend Assessment. This application is a high-fidelity, production-ready Order Management system designed for LPG distribution agents.

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo Go (optional, for physical device testing)

### Installation
1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/timothy2462/leeta-mobile-assessmentl]
    cd leeta-mobile-assessment
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the application**:
    ```bash
    npm start
    npx expo start 
    ```

4.  **Running on different platforms**:
    - **Web**: Press `w` in the terminal to open the web interface (mirroring the Order List screen).
    - **iOS**: Press `i` to open in the iOS simulator.
    - **Android**: Press `a` to open in the Android emulator.

---

## 🏗️ Architecture Decisions

The project follows a **modular, scalable architecture** designed for long-term maintenance and production growth:

1.  **Context-Driven State Management**: 
    - Used `AuthContext` and `OrdersContext` to manage global application state (user sessions and order data). 
    - This ensures real-time data synchronization across different segments like the Dashboard, Order Details, and Insights.
    
2.  **Separation of Concerns (Hooks)**: 
    - Business logic is extracted into custom hooks (e.g., `useOrders.ts`). This keeps UI components thin, highly readable, and easily testable.

3.  **File-Based Routing**: 
    - Leverages `expo-router` for a modern, directory-based navigation structure. Organized into `(auth)` and `(tabs)` groups for a clean separation between protected and public routes.

4.  **Atomic Design System**: 
    - Standardized tokens in `lib/design-system.ts` (Colors, Typography, Shadows) ensure visual consistency across both mobile and web platforms.
    - Used `twrnc` (Tailwind for React Native) for rapid, consistent styling.

5.  **Monitoring-Ready Logging**: 
    - Implemented a centralized `lib/logger.ts` utility. This allows us to track errors and user breadcrumbs in development via the console, with clear hook-ins for production services like Sentry or Datadog.

---

## ⚖️ Trade-offs Made

1.  **Mock API Layer**: 
    - To focus on UI/UX and product thinking within the 48-hour window, I implemented a robust mock API with simulated network delays/errors rather than a live backend.
    
2.  **Web Persistence**: 
    - For this assessment, I used `localStorage` to handle session persistence on the web. In a full production native app, I would transition this to `expo-secure-store` or `AsyncStorage` for encrypted/reliable device storage.

3.  **Mocked Third-party Auth**: 
    - The authentication flow mimics a real OAuth/JWT system but uses purely client-side logic to demonstrate the UX/onboarding flow without requiring external server setup.

---

## 🛠️ What I Would Improve with More Time

1.  **Live Backend Integration**: Connect to a real database (e.g., Supabase or Firebase) for multi-agent synchronization and real-time order updates (WebSockets/Push Notifications).
2.  **Offline-First Support**: Implement a local database (like SQLite or WatermelonDB) to allow agents to process orders in areas with weak signal, syncing once they go back online.
3.  **Enhanced Micro-Animations**: Use `react-native-reanimated` for smoother screen transitions and interaction-driven animations (e.g., sliding price updates or success confetti).
4.  **Deep Linking**: Set up deep links for specific orders so agents can tap a notification and land directly on the relevant Order Details screen.
5.  **Extended Test Coverage**: Add end-to-end (E2E) testing with **Detox** or **Maestro** to verify the full user journey from login to delivery confirmation.

---

## 🧪 How to Run Tests

The project uses **Jest** and **React Testing Library** for behavioral testing.

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### View coverage report
```bash
npm run test:coverage
```

---

### 👤 Author
*Founding Engineer Timothy Akobundu*

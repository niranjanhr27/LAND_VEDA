// App.jsx — Root component connecting Navbar, Home, Auth modals and all Dashboards

/*import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";*/

// importing all page components
/*import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import AdminLogin from "./components/UI/AdminLogin";
import ClientLogin from "./components/UI/ClientLogin";
import Register from "./components/UI/Register";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard/ClientDashboard";*/

// AppContent — decides which screen to show based on who is logged in
/*function AppContent() {
  const { currentAdmin, currentClient, logout } = useAuth();
  const [activeScreen, setActiveScreen] = useState(null);*/

// if admin is logged in — show admin dashboard
/*if (currentAdmin) {
    return (
      <AdminDashboard
        onLogout={() => {
          logout();
          setActiveScreen(null);
        }}
      />
    );
  }*/

// if client is logged in — show client dashboard
/*if (currentClient) {
    return (
      <ClientDashboard
        onLogout={() => {
          logout();
          setActiveScreen(null);
        }}
      />
    );
  }*/

// otherwise show main website
//   return (
//     <>
//       {/* main navbar with login dropdown */}
//       <Navbar
//         onAdminLogin={() => setActiveScreen("adminLogin")}
//         onClientLogin={() => setActiveScreen("clientLogin")}
//       />

//       {/* home page with all sections */}
//       <Home />

//       {/* admin login modal */}
//       {activeScreen === "adminLogin" && (
//         <AdminLogin
//           onClose={() => setActiveScreen(null)}
//           onSuccess={() => setActiveScreen(null)}
//         />
//       )}

//       {/* client login modal */}
//       {activeScreen === "clientLogin" && (
//         <ClientLogin
//           onClose={() => setActiveScreen(null)}
//           onSuccess={() => setActiveScreen(null)}
//           onRegister={() => setActiveScreen("register")}
//         />
//       )}

//       {/* register modal */}
//       {activeScreen === "register" && (
//         <Register
//           onClose={() => setActiveScreen(null)}
//           onLoginClick={() => setActiveScreen("clientLogin")}
//         />
//       )}
//     </>
//   );
// }

// // App — wraps everything with AuthProvider and BrowserRouter
// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <AppContent />
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;

// App.jsx — Main application entry point for LandVeda
// This file sets up routing, authentication context and global components

import { useState } from "react";
import { BrowserRouter } from "react-router-dom";

// Context Provider — manages global auth state across all components
import { AuthProvider } from "./context/AuthContext";

// Page Components
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard/ClientDashboard";

// UI Modal Components — shown as overlays on top of home page
import AdminLogin from "./components/UI/AdminLogin";
import ClientLogin from "./components/UI/ClientLogin";
import Register from "./components/UI/Register";

// AI Chatbot Component — floating chat bubble shown on all pages
import Chatbot from "./components/Chatbot/Chatbot";

// useAuth hook — access global auth state
import { useAuth } from "./context/AuthContext";

// ─── AppContent ───────────────────────────────────────────────────────────────
// Inner component that uses auth context
// Separated from App because useAuth must be inside AuthProvider
function AppContent() {
  // Get current logged-in admin and client from global auth state
  const { currentAdmin, currentClient, logout } = useAuth();

  // Modal visibility states
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showClientLogin, setShowClientLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // ── If admin is logged in → show Admin Dashboard ──
  if (currentAdmin) {
    return (
      <AdminDashboard
        onLogout={function () {
          logout();
        }}
      />
    );
  }

  // ── If client is logged in → show Client Dashboard ──
  if (currentClient) {
    return (
      <ClientDashboard
        onLogout={function () {
          logout();
        }}
      />
    );
  }

  // ── Default → show Home Page with modals and chatbot ──
  return (
    <div>
      {/* Home page — main landing page with all sections */}
      <Home
        onAdminLogin={function () {
          setShowAdminLogin(true);
        }}
        onClientLogin={function () {
          setShowClientLogin(true);
        }}
      />

      {/* Admin Login Modal — shown when admin clicks login */}
      {showAdminLogin && (
        <AdminLogin
          onClose={function () {
            setShowAdminLogin(false);
          }}
          onSuccess={function () {
            setShowAdminLogin(false);
          }}
        />
      )}

      {/* Client Login Modal — shown when client clicks login */}
      {showClientLogin && (
        <ClientLogin
          onClose={function () {
            setShowClientLogin(false);
          }}
          onSuccess={function () {
            setShowClientLogin(false);
          }}
          onRegister={function () {
            // Switch from login modal to register modal
            setShowClientLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {/* Register Modal — shown when new client clicks Register */}
      {showRegister && (
        <Register
          onClose={function () {
            setShowRegister(false);
          }}
          onSuccess={function () {
            // After successful registration → switch to login modal
            setShowRegister(false);
            setShowClientLogin(true);
          }}
        />
      )}

      {/* AI Chatbot — floating chat bubble visible on home page */}
      {/* Customers can ask property questions and get instant AI replies */}
      <Chatbot />
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
// Root component — wraps everything in BrowserRouter and AuthProvider
function App() {
  return (
    <BrowserRouter>
      {/* AuthProvider makes auth state available to all child components */}
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

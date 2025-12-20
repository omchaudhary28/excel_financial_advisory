import React, { useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "./context/ThemeContext";
import { LoadingSpinner } from "./components/Notifications";
import PrivateRoute from "./components/PrivateRoute";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Contact = lazy(() => import("./pages/Contact"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Profile = lazy(() => import("./pages/Profile"));
const QueryForm = lazy(() => import("./pages/QueryForm"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Facebook = lazy(() => import("./pages/Facebook"));
const Twitter = lazy(() => import("./pages/Twitter"));
const LinkedIn = lazy(() => import("./pages/LinkedIn"));
const Instagram = lazy(() => import("./pages/Instagram"));
const Rating = lazy(() => import("./pages/Rating"));

function AppContent() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="bg-background-light dark:bg-background-dark text-text dark:text-text-inverted min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-6 py-8 max-w-7xl w-full">
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-[60vh]">
              <LoadingSpinner />
            </div>
          }
        >
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/facebook" element={<Facebook />} />
            <Route path="/twitter" element={<Twitter />} />
            <Route path="/linkedin" element={<LinkedIn />} />
            <Route path="/instagram" element={<Instagram />} />

            {/* Protected routes */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            <Route
              path="/query"
              element={
                <PrivateRoute>
                  <QueryForm />
                </PrivateRoute>
              }
            />

            <Route
              path="/rating"
              element={
                <PrivateRoute>
                  <Rating />
                </PrivateRoute>
              }
            />

            {/* Admin-only route */}
            <Route
              path="/admin"
              element={
                <PrivateRoute adminOnly>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Router>
  );
}

export default App;

// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './auth/ProtectedRoute';
import PublicRoute from './auth/PublicRoute';
import NotesPage from './pages/NotesPage'
import {GoogleOAuthProvider} from "@react-oauth/google";
import NewNotes from './pages/NewNotesPage';

export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route - redirects based on auth status */}
        <Route 
          path="/" 
          element={
            localStorage.getItem('token') 
              ? <Navigate to="/notes" replace /> 
              : <Navigate to="/signin" replace />
          } 
        />

        {/* Public routes - accessible only when not authenticated */}
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <LoginPage />
              </GoogleOAuthProvider>
            </PublicRoute>
          }
        />

        {/* Public routes - accessible only when not authenticated */}
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <LoginPage signup/>
              </GoogleOAuthProvider>
            </PublicRoute>
          }
        />

        {/* Protected routes - require authentication */}
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <NotesPage />
            </ProtectedRoute>
          }
        />

        {/* Catch all unmatched routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
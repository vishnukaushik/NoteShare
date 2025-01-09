// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './auth/ProtectedRoute';
import PublicRoute from './auth/PublicRoute';
import NotesPage from './pages/NotesPage'

export const BACKEND_BASE_URL = "http://localhost:3000/api"

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
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* Public routes - accessible only when not authenticated */}
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <LoginPage signup/>
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
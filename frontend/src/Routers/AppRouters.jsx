import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import { Dashboard } from "../pages/Dashboard";
import { CreateTask } from "../pages/CreateTask";
import { EditTask } from "../pages/EditTask";

import { ProtectedRoute } from "./ProtectedRoute";

function AppRouters() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔓 Public routes (no protection) */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 🔐 Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouters;
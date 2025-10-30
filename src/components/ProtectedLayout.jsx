import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

export default function ProtectedLayout({ isAuthenticated, onLogout }) {
  return (
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <Navbar onLogout={onLogout} />
      <div className="layout-content">
        <Outlet />
      </div>
    </ProtectedRoute>
  );
}
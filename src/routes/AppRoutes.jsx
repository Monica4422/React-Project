import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ErrorBoundary from '../components/ErrorBoundary';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../layouts/Layout';

const LoginPage = lazy(() => import('../features/LoginPage'));
const ForgotPasswordPage = lazy(() => import('../features/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../features/ResetPasswordPage'));
const DashboardPage = lazy(() => import('../features/DashboardPage'));
const ProcurementPage = lazy(() => import('../features/ProcurementPage'));
const VendorsPage = lazy(() => import('../features/VendorsPage'));
const VendorDetailPage = lazy(() => import('../features/VendorDetailPage'));
const RiskPage = lazy(() => import('../features/RiskPage'));
const CompliancePage = lazy(() => import('../features/CompliancePage'));
const AuditPage = lazy(() => import('../features/AuditPage'));
const ReportsPage = lazy(() => import('../features/ReportsPage'));
const SettingsPage = lazy(() => import('../features/SettingsPage'));
const NotFoundPage = lazy(() => import('../features/NotFoundPage'));

const AppRoutes = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="procurement" element={<ProtectedRoute allowedRoles={['Administrator', 'Procurement Manager']}><ProcurementPage /></ProtectedRoute>} />
          <Route path="vendors" element={<VendorsPage />} />
          <Route path="vendors/:id" element={<VendorDetailPage />} />
          <Route path="risk" element={<RiskPage />} />
          <Route path="compliance" element={<ProtectedRoute allowedRoles={['Administrator', 'Compliance Officer']}><CompliancePage /></ProtectedRoute>} />
          <Route path="audit" element={<ProtectedRoute allowedRoles={['Administrator', 'Auditor']}><AuditPage /></ProtectedRoute>} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRoutes;

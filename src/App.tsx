import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CompanyProvider } from './context/CompanyContext';
import { ThemeProvider } from './context/ThemeContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import { DashboardPage } from './modules/dashboard/DashboardPage';

import { HRPage } from './modules/hr/HRPage';
import { FleetPage } from './modules/fleet/FleetPage';
import { ContainerPage } from './modules/containers/ContainerPage';
import { ImportExportPage } from './modules/import-export/ImportExportPage';
import { ProductionPage } from './modules/production/ProductionPage';
import { FinancePage } from './modules/finance/FinancePage';
import type { Role } from './types';

// Placeholder Pages
const ReportsPage = () => <div className="p-4"><h1 className="text-2xl font-bold">Reports</h1><p>Unified reporting center.</p></div>;
const SettingsPage = () => <div className="p-4"><h1 className="text-2xl font-bold">Settings</h1><p>System configuration.</p></div>;

// Login Page Placeholder
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: Role) => {
    login(role);
    navigate('/');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-muted">
      <div className="p-8 bg-card rounded-lg shadow-lg max-w-md w-full border">
        <h1 className="text-2xl font-bold mb-6 text-center">Aman Transport ERP</h1>
        <div className="grid gap-4">
          <button onClick={() => handleLogin('SUPER_ADMIN')} className="w-full p-2 bg-primary text-primary-foreground rounded hover:opacity-90">Login as Super Admin</button>
          <button onClick={() => handleLogin('HR_MANAGER')} className="w-full p-2 bg-secondary text-secondary-foreground rounded hover:opacity-90">Login as HR Manager</button>
          <button onClick={() => handleLogin('OPERATIONS_MANAGER')} className="w-full p-2 bg-accent text-accent-foreground rounded hover:opacity-90 border">Login as Ops Manager</button>
        </div>
      </div>
    </div>
  );
}

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <>{children}</>;
};

const RoleRoute: React.FC<{ children: React.ReactNode; allowedRoles: Role[] }> = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role) && user.role !== 'SUPER_ADMIN') {
    return <div className="flex items-center justify-center h-[50vh] text-destructive">Access Denied: Permission Restricted</div>;
  }
  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="aman-erp-theme">
      <AuthProvider>
        <CompanyProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                <Route index element={<DashboardPage />} />
                <Route path="hr" element={<RoleRoute allowedRoles={['HR_MANAGER']}><HRPage /></RoleRoute>} />
                <Route path="fleet" element={<RoleRoute allowedRoles={['OPERATIONS_MANAGER', 'DISPATCHER', 'BRANCH_MANAGER']}><FleetPage /></RoleRoute>} />
                <Route path="containers" element={<RoleRoute allowedRoles={['OPERATIONS_MANAGER', 'DISPATCHER']}><ContainerPage /></RoleRoute>} />
                <Route path="import-export" element={<RoleRoute allowedRoles={['IMPORT_EXPORT_MANAGER']}><ImportExportPage /></RoleRoute>} />
                <Route path="production" element={<RoleRoute allowedRoles={['PRODUCTION_MANAGER']}><ProductionPage /></RoleRoute>} />
                <Route path="finance" element={<RoleRoute allowedRoles={['ACCOUNTANT']}><FinancePage /></RoleRoute>} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="settings" element={<RoleRoute allowedRoles={[]}><SettingsPage /></RoleRoute>} />
              </Route>
            </Routes>
          </Router>
        </CompanyProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthGuard } from './components/AuthGuard';


export const router = createBrowserRouter([
    { path: '/login', element: <Login /> },
    {
        path: '/',
        element: <AuthGuard><App /></AuthGuard>,
        children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: 'dashboard', element: <Dashboard /> },
        ],
    },

], { basename: '/ccs' });
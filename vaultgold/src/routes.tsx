import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard/Dashboard";
import Vault from "./pages/Vault/Vault";
import SavePassword from "./pages/SavePassword/SavePassword";
import Settings from "./pages/Settings/Settings";
import LockScreen from "./pages/LockScreen/LockScreen";
import SetupMasterPassword from "./pages/SetupMasterPassword/SetupMasterPassword";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/setup-master-password",
    element: <SetupMasterPassword />,
  },
  {
    path: "/lock",
    element: <LockScreen />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "vault",
        element: (
          <ProtectedRoute>
            <Vault />
          </ProtectedRoute>
        ),
      },
      {
        path: "save-password",
        element: (
          <ProtectedRoute>
            <SavePassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-password/:id",
        element: (
          <ProtectedRoute>
            <SavePassword />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
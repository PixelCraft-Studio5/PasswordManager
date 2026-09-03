import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard/Dashboard";
import Vault from "./pages/Vault/Vault";
import SavePassword from "./pages/SavePassword/SavePassword";
import Settings from "./pages/Settings/Settings";
import LockScreen from "./pages/LockScreen/LockScreen";
import SetupMasterPassword from "./pages/SetupMasterPassword/SetupMasterPassword";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Setup Master Password */}
        <Route
          path="/setup-master-password"
          element={<SetupMasterPassword />}
        />

        {/* Lock Screen */}
        <Route
          path="/lock"
          element={<LockScreen />}
        />

        {/* Main Application */}
        <Route
          path="/"
          element={<MainLayout />}
        >
          {/* Dashboard */}
          <Route
            index
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Vault */}
          <Route
            path="vault"
            element={
              <ProtectedRoute>
                <Vault />
              </ProtectedRoute>
            }
          />

          {/* Save Password */}
          <Route
            path="save-password"
            element={
              <ProtectedRoute>
                <SavePassword />
              </ProtectedRoute>
            }
          />

          {/* Edit Password */}
          <Route
            path="edit-password/:id"
            element={
              <ProtectedRoute>
                <SavePassword />
              </ProtectedRoute>
            }
          />

          {/* Settings */}
          <Route
            path="settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
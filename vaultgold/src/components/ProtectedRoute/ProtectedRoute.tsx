import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import {
  hasMasterPassword,
  isVaultUnlocked,
} from "../../utils/masterPassword";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  if (!hasMasterPassword()) {
    return <Navigate to="/setup-master-password" replace />;
  }

  if (!isVaultUnlocked()) {
    return <Navigate to="/lock" replace />;
  }

  return <>{children}</>;
}
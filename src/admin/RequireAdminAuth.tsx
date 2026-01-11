import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const RequireAdminAuth = ({ children }: { children: JSX.Element }) => {
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    fetch("http://localhost/backend/admin/auth.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "authorized") {
          setAuthorized(true);
        }
        setChecking(false);
      })
      .catch(() => setChecking(false));
  }, []);

  if (checking) return <p className="p-6">Checking authentication...</p>;

  if (!authorized) return <Navigate to="/admin" replace />;

  return children;
};

export default RequireAdminAuth;

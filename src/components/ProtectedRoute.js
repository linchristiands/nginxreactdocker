import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
export const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const checkStatus = (
    <div>{user == null ? <Navigate to="/login" /> : children}</div>
  );
  useEffect(() => {
    let unsub = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setUser(user);
    });
    return () => {
      unsub();
    };
  }, []);
  return <>{loading ? "" : checkStatus}</>;
};

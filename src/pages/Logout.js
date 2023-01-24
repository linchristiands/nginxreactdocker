import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

const Logout = () => {
  const logout = async () => {
    signOut(auth);
  };
  useEffect(() => {
    logout();
  }, []);
  return <Navigate to="/" />;
};

export default Logout;

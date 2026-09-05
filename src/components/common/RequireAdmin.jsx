import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAdmin } from "../../utils/auth";
import Spinner from "./Spinner";

const RequireAdmin = ({ children }) => {
  const { user, restoring } = useSelector((state) => state.auth);

  if (restoring) {
    return <div className="flex min-h-[50vh] items-center justify-center"><Spinner size="lg" /></div>;
  }

  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin(user)) return <Navigate to="/" replace />;

  return children;
};

export default RequireAdmin;

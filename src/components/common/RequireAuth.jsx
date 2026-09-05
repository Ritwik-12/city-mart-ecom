import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { user, restoring } = useSelector((state) => state.auth);

  if (restoring) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default RequireAuth;

import { useSelector } from "react-redux";
import { Navigate } from "react-router";
const ProtectedRoutes = ({ children }) => {
  const { isAuth } = useSelector((state) => state.users);

  if (!isAuth) {
    return (
      <>
        <h1>Вы не авторизированы</h1>
      </>
    );
  }

  return children;
};

export default ProtectedRoutes;

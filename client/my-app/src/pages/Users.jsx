import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../store/userSlice";
import { useEffect } from "react";
import { Link } from "react-router";
const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const { status, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="users">
      {error ? (
        <>
          <h1>{error}</h1>
        </>
      ) : status === "Загрузка" ? (
        <>
          <h1>{status}</h1>
        </>
      ) : users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} className="user__content">
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
        ))
      ) : (
        ""
      )}

      <Link to="/">Назад</Link>
    </div>
  );
};

export default Users;

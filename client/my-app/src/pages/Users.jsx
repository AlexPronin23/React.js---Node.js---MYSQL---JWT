import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getOneUser } from "../store/userSlice";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.users.currentUser);
  const { status, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleUser = (id) => {
    dispatch(getOneUser({ id }));
    navigate(`/users/${id}`);
  };

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
            <button className="btn" onClick={() => handleUser(user.id)}>
              Получить полную информацию
            </button>
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

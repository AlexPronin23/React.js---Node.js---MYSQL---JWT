// User.jsx
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getOneUser } from "../store/userSlice";

const User = () => {
  const { id } = useParams(); // Получаем id из URL
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);
  const { status, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(getOneUser({ id }));
    }
  }, [dispatch, id]);

  if (status === "Загрузка") {
    return <h1>Загрузка информации о пользователе...</h1>;
  }

  if (error) {
    return (
      <div>
        <h1>Ошибка: {error}</h1>
        <Link to="/users">Вернуться к списку</Link>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div>
        <h1>Пользователь не найден</h1>
        <Link to="/users">Вернуться к списку</Link>
      </div>
    );
  }

  return (
    <div className="user-page">
      <h1>Информация о пользователе</h1>

      <div className="user-details">
        <p>
          <strong>Имя пользователя:</strong> {currentUser.username}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
      </div>

      <Link to="/users" className="btn">
        Вернуться к списку
      </Link>
    </div>
  );
};

export default User;

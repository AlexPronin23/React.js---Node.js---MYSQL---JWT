// src/pages/Profile.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProfile, logoutUser } from "../store/userSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, isAuth, status } = useSelector((state) => state.users);

  // При загрузке проверяем авторизацию
  useEffect(() => {
    if (!isAuth) {
      dispatch(getProfile());
    }
  }, [dispatch, isAuth]);

  // Пока идет загрузка
  if (status === "Загрузка") {
    return <h2>Загрузка...</h2>;
  }

  //  Если не авторизован - показываем сообщение
  if (!isAuth) {
    return (
      <div className="profile-not-auth">
        <h2>🔒 Вы не авторизованы</h2>
        <p>Пожалуйста, войдите в систему</p>
      </div>
    );
  }

  // Если нет данных
  if (!currentUser) {
    return <h2>Нет данных о пользователе</h2>;
  }

  // Выход
  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/register");
  };

  // ✅ ПОКАЗЫВАЕМ ПРОФИЛЬ
  return (
    <div className="profile">
      <h1>Мой профиль</h1>
      <p>
        <strong>ID:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Имя:</strong> {currentUser.username}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>

      <button onClick={handleLogout} className="btn">
        Выйти
      </button>
      <Link to="/users" className="btn">
        К списку пользователей
      </Link>
    </div>
  );
};

export default Profile;

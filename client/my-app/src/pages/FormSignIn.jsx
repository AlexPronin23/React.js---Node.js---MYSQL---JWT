import "../style.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../store/userSlice";
import { Link, useNavigate } from "react-router";
const FormSignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState([
    {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  ]);

  const { username, email, password, confirmPassword } = user;

  const handleData = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      alert("Данные должны быть заполнены");
      return;
    }

    if (password !== confirmPassword) {
      alert("Пароли должны совпадать");
      return;
    }

    try {
      const resultAction = await dispatch(
        createUser({ username, email, password }),
      );

      if (createUser.fulfilled.match(resultAction)) {
        setUser({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      } else {
        alert(resultAction.payload);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="form">
      <h1>Форма регистрации</h1>
      <form onSubmit={handleSubmit}>
        <div className="form__column">
          <label>Логин: </label>
          <input
            type="text"
            name="username"
            value={username}
            className="form__input"
            placeholder="Введите логин"
            onChange={handleData}
          />
        </div>

        <div className="form__column">
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={email}
            className="form__input"
            placeholder="Введите email"
            onChange={handleData}
          />
        </div>

        <div className="form__column">
          <label>Пароль: </label>
          <input
            type="password"
            name="password"
            value={password}
            minLength={8}
            maxLength={16}
            className="form__input"
            placeholder="Введите пароль"
            onChange={handleData}
          />
        </div>

        <div className="form__column">
          <label>Повторите пароль: </label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            minLength={8}
            maxLength={16}
            className="form__input"
            placeholder="Подтвердите пароль"
            onChange={handleData}
          />
        </div>
        <button type="submit" className="btn">
          Зарегистрироваться
        </button>
      </form>

      <p>
        <Link to="/login">Уже есть аккаунт?</Link>
      </p>
      <p>
        <Link to="/">Назад</Link>
      </p>
    </div>
  );
};

export default FormSignIn;

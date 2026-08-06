import "../style.css";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { loginUser } from "../store/userSlice";

const FormLogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState([
    {
      username: "",
      password: "",
    },
  ]);

  const { username, password } = user;

  const handleData = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Введите полные данные");
      return;
    }

    try {
      const resultAction = await dispatch(loginUser({ username, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        setUser({
          username: "",
          password: "",
        });
        alert("Успешный вход");
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="form">
      <h1>Форма входа</h1>
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
          <label>Пароль: </label>
          <input
            type="password"
            name="password"
            value={password}
            className="form__input"
            placeholder="Введите пароль"
            onChange={handleData}
          />
        </div>

        <button type="submit" className="btn">
          Войти
        </button>
      </form>

      <p>
        <Link to="/register">Еще нет аккаунта?</Link>
      </p>
      <p>
        <Link to="/">Назад</Link>
      </p>
    </div>
  );
};

export default FormLogIn;

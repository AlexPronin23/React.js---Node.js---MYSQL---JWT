import "../style.css";
import { Link } from "react-router";
const FormSignIn = () => {
  return (
    <div className="form">
      <h1>Форма регистрации</h1>
      <form>
        <div className="form__column">
          <label>Логин: </label>
          <input
            type="text"
            name="username"
            className="form__input"
            placeholder="Введите логин"
          />
        </div>

        <div className="form__column">
          <label>Email: </label>
          <input
            type="email"
            name="email"
            className="form__input"
            placeholder="Введите email"
          />
        </div>

        <div className="form__column">
          <label>Пароль: </label>
          <input
            type="password"
            name="password"
            className="form__input"
            placeholder="Введите пароль"
          />
        </div>

        <div className="form__column">
          <label>Повторите пароль: </label>
          <input
            type="password"
            name="confirmPassword"
            className="form__input"
            placeholder="Подтвердите пароль"
          />
        </div>
      </form>

      <button type="submit" className="btn">
        Зарегистрироваться
      </button>

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

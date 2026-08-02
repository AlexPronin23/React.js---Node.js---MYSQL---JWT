import "../style.css";
import { Link } from "react-router";

const FormLogIn = () => {
  return (
    <div className="form">
      <h1>Форма входа</h1>
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
          <label>Пароль: </label>
          <input
            type="password"
            name="password"
            className="form__input"
            placeholder="Введите пароль"
          />
        </div>
      </form>

      <button type="submit" className="btn">
        Войти
      </button>

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

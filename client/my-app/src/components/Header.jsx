import "../style.css";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="header">
      <h1>Главная страница</h1>

      <div className="header__buttons">
        <Link to="/register" className="btn">
          Зарегистрироваться
        </Link>
        <Link to="/login" className="btn">
          Войти
        </Link>
      </div>
    </header>
  );
};

export default Header;

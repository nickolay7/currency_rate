import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <ul className="nav nav-pills nav-justified">
        <li className="nav-item btn btn-warning m-3 opacity-75">
          <Link to="/converter" className="nav-link text-primary">
            Currency converter
          </Link>
        </li>
        <li className="nav-item btn btn-warning m-3 opacity-75">
          <Link to="/current" className="nav-link text-primary">
            Current exchange rate
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;

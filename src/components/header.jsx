import { TbShoppingCart, TbMoodSmile, TbHistory, TbUser } from "react-icons/tb";

import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header>

      <div className="logo">
        <img src="logo.jpg" alt="logo" />
        <div className="logo-text">DICE</div>
      </div>

      <div className="actions">
        <div
          className={`action ${isActive("/") ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          <TbHistory size={20} />
          <div>History</div>
        </div>
        <div
          className={`action ${isActive("/") ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          <TbMoodSmile size={20} />
          <div>Helpers</div>
        </div>
        <div
          className={`action ${isActive("/cart") ? "active" : ""}`}
          onClick={() => navigate("/settings")}
        >
          <TbShoppingCart size={20} />
          <div>Cart</div>
        </div>
        <div
          className={`action ${isActive("/profile") ? "active" : ""}`}
          onClick={() => navigate("/settings")}
        >
          <TbUser size={20} />
          <div>Account</div>
        </div>
      </div>

    </header>
  );
}

export default Header;

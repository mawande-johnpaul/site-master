import {
  TbShoppingCart,
  TbHistory,
  TbUser,
  TbStar,
  TbRobot,
  TbShoppingBag,
} from "react-icons/tb";
import Modal from "../components/modal";
import Cookies from "../components/cookies";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setModalChildren, setIsOpen, modalChildren, cookieSeen, isOpen } = useAppContext();

  const isActive = (path) => location.pathname === path;

  return (
    <header>
      <div className="logo" onClick={() => navigate("/")}>
        DICE.com
      </div>

      <div className="actions">
        <div
          className={`action ${isActive("/history") ? "active" : ""}`}
          onClick={() => {
            setModalChildren(<h3>History</h3>);
            setIsOpen(true);
          }}
        >
          <TbHistory size={20} />
          <div>History</div>
        </div>

        <div
          className={`action ${isActive("/wishlist") ? "active" : ""}`}
          onClick={() => {
            setModalChildren(<h3>Wishlist</h3>);
            setIsOpen(true);
          }}
        >
          <TbStar size={20} />
          <div>Wishlist</div>
        </div>

        <div
          className={`action ${isActive("/cart") ? "active" : ""}`}
          onClick={() => {
            setModalChildren(<h3>Cart</h3>);
            setIsOpen(true);
          }}
        >
          <TbShoppingCart size={20} />
          <div>Cart</div>
        </div>
      </div>

      <div className="actions">
        <div
          className={`action ${isActive("/") ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          <TbShoppingBag size={20} />
          <div>Home</div>
        </div>
        <div
          className={`action ${isActive("/helpers") ? "active" : ""}`}
          onClick={() => navigate("/helpers")}
        >
          <TbRobot size={20} />
          <div>Helpers</div>
        </div>

        <div
          className={`action ${isActive("/account") ? "active" : ""}`}
          onClick={() => navigate("/account")}
        >
          <TbUser size={20} />
          <div>Account</div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {modalChildren}
      </Modal>
      {cookieSeen ? <></> : <Cookies />}
    </header>
  );
}

export default Header;

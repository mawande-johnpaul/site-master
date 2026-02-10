import {
  TbShoppingCart,
  TbHistory,
  TbUser,
  TbStar,
  TbRobot,
  TbShoppingBag,
  TbTrash,
  TbClearAll,
  TbX,
  TbMenu,
  TbMenu2,
} from "react-icons/tb";
import { useState } from "react";
import Modal from "../components/modal";
import Cookies from "../components/cookies";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    setModalChildren,
    setIsOpen,
    modalChildren,
    cookieSeen,
    isOpen,
    history,
    wishlist,
    cart,
    setCart,
    setWishlist,
  } = useAppContext();

  const isActive = (path) => location.pathname === path;
  const [isExpanded, setIsExpanded] = useState(false);

  function History() {
    return (
      <div>
        <div className="modal-header">
          <h2>History</h2>
          <TbTrash className="icon-btn" />
        </div>
        <div className="history-list">
          {history && history.length > 0 ? (
            history.map((item, i) => {
              return (
                <div className="history-item" key={i}>
                  <h5>10/10/2026 - 12:45PM</h5>
                  <p>{item && item[0] ? item[0].query : "Search query"}</p>
                </div>
              );
            })
          ) : (
            <p>No history yet</p>
          )}
        </div>
      </div>
    );
  }

  function Wishlist() {
    return (
      <div>
        <div className="modal-header">
          <h2>Wishlist ({wishlist.length})</h2>
          <button
            onClick={() => setWishlist([])}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.2rem",
            }}
          >
            <TbClearAll className="icon-btn" />
          </button>
        </div>
        <div className="wishlist-list">
          {wishlist && wishlist.length > 0 ? (
            wishlist.map((item, i) => {
              return (
                <div className="wishlist-item" key={i}>
                  <div>
                    <h5>{item.name}</h5>
                    <p>USD ${item.price.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() =>
                      setWishlist(wishlist.filter((w) => w.id !== item.id))
                    }
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <TbX className="icon-btn" />
                  </button>
                </div>
              );
            })
          ) : (
            <p>No items in wishlist</p>
          )}
        </div>
        {wishlist.length > 0 && (
          <button
            className="default-button"
            style={{ width: "100%", marginTop: "1rem" }}
          >
            Add All to Cart
          </button>
        )}
      </div>
    );
  }

  function Cart() {
    const total = cart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0,
    );

    return (
      <div>
        <div className="modal-header">
          <h2>Cart ({cart.length})</h2>
          <button
            onClick={() => setCart([])}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.2rem",
            }}
          >
            <TbClearAll className="icon-btn" />
          </button>
        </div>
        <div className="cart-list">
          {cart && cart.length > 0 ? (
            <>
              {cart.map((item, i) => {
                return (
                  <div className="cart-item" key={i}>
                    <div>
                      <h5>{item.name}</h5>
                      <p>USD ${item.price.toLocaleString()}</p>
                      <p style={{ fontSize: "0.9rem", color: "#999" }}>
                        Qty: {item.quantity || 1}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setCart(cart.filter((c) => c.id !== item.id))
                      }
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <TbX />
                    </button>
                  </div>
                );
              })}
              <div className="cart-total">
                <h4>Total: USD ${total.toLocaleString()}</h4>
                <button className="default-button" style={{ width: "100%" }}>
                  Checkout
                </button>
              </div>
            </>
          ) : (
            <p>No items in cart</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <header>
      <div className="logo" onClick={() => navigate("/")}>
        DICE.com
      </div>

      <div className="actions">
        <div
          className={`action ${isActive("/history") ? "active" : ""}`}
          onClick={() => {
            setModalChildren(<History />);
            setIsOpen(true);
          }}
        >
          <TbHistory size={20} />
          <div>History</div>
        </div>

        <div
          className={`action ${isActive("/wishlist") ? "active" : ""}`}
          onClick={() => {
            setModalChildren(<Wishlist />);
            setIsOpen(true);
          }}
        >
          <TbStar size={20} />
          <div>Wishlist</div>
        </div>

        <div
          className={`action ${isActive("/cart") ? "active" : ""}`}
          onClick={() => {
            setModalChildren(<Cart />);
            setIsOpen(true);
          }}
        >
          <TbShoppingCart size={20} />
          <div>Cart</div>
        </div>
      </div>

      <div className="actions-trailing">
        <div
          className={`action-trailing ${isActive("/") ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          <TbShoppingBag size={20} />
          <div>Home</div>
        </div>
        <div
          className={`action-trailing ${isActive("/helpers") ? "active" : ""}`}
          onClick={() => navigate("/helpers")}
        >
          <TbRobot size={20} />
          <div>Helpers</div>
        </div>

        <div
          className={`action-trailing ${isActive("/account") ? "active" : ""}`}
          onClick={() => navigate("/account")}
        >
          <TbUser size={20} />
          <div>Account</div>
        </div>
        <div className={`menu-btn`} onClick={() => setIsExpanded(!isExpanded)}>
          <TbMenu2 size={22} />
        </div>
      </div>

      <div className={"mobile-menu" + (isExpanded ? " open" : "")}>
        <div
          className={`action-trailing ${isActive("/") ? "active" : ""}`}
          style={{ display: "flex", width: "70%" }}
          onClick={() => {
            navigate("/");
            setIsExpanded(false);
          }}
        >
          <TbShoppingBag size={20} />
          <div>Home</div>
        </div>
        <div
          className={`action-trailing ${isActive("/helpers") ? "active" : ""}`}
          style={{ display: "flex" }}
          onClick={() => {
            navigate("/helpers");
            setIsExpanded(false);
          }}
        >
          <TbRobot size={20} />
          <div>Helpers</div>
        </div>

        <div
          className={`action-trailing ${isActive("/account") ? "active" : ""}`}
          style={{ display: "flex" }}
          onClick={() => {
            navigate("/account");
            setIsExpanded(false);
          }}
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

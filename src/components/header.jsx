import { useContext } from "react";
import { TbHeart, TbShoppingCart, TbUser } from "react-icons/tb";
import { useAppContext } from "../context/AppContext";
import Modal from "./modal";
import { useNavigate } from "react-router-dom";

function Header() {
  const {
    isAuthenticated,
    user,
    setModalChildren,
    setIsOpen,
    cart,
    wishlist,
    setWishlist,
    setCart,
  } = useAppContext();

  const navigate = useNavigate();

  function openModal(content) {
    setModalChildren(content);
    setIsOpen(true);
  }

  function handleHelperClick() {
    // Logic to open helper modal or dropdown
  }

  function handleCartClick() {
    const removeFromCart = (productId) => {
      setCart(cart.filter((item) => item.id !== productId));
    };

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    openModal(
      <div style={{ maxHeight: '70vh', overflow: 'auto' }}>
        <h2 style={{ marginBottom: '1rem' }}>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '1rem',
                    border: '1px solid var(--border, #ddd)',
                    borderRadius: '8px',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 0.5rem 0' }}>{item.name}</h4>
                    <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'var(--error, #FF4C4C)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: '1.5rem',
                padding: '1rem',
                borderTop: '2px solid var(--border, #ddd)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }}
            >
              <span>Total:</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </>
        )}
      </div>
    );
  }

  function handleProfileClick() {
    navigate('/profile')
  }

  function handleWishlistClick() {
    const removeFromWishlist = (productId) => {
      setWishlist(wishlist.filter((item) => item.id !== productId));
    };

    const addToCart = (product) => {
      if (!cart.find((item) => item.id === product.id)) {
        setCart([...cart, product]);
      }
    };

    openModal(
      <div style={{ maxHeight: '70vh', overflow: 'auto' }}>
        <h2 style={{ marginBottom: '1rem' }}>Wishlist</h2>
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {wishlist.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1rem',
                  border: '1px solid var(--border, #ddd)',
                  borderRadius: '8px',
                  alignItems: 'center',
                }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>{item.name}</h4>
                  <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                    ${item.price.toLocaleString()}
                  </p>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Rating: {item.rating}⭐ ({item.reviews} reviews)
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                  <button
                    onClick={() => {
                      addToCart(item);
                      removeFromWishlist(item.id);
                    }}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'var(--primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'transparent',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border, #ddd)',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <header>
      <div className="logo"
      onClick={() => navigate('/')}
      >DICE</div>
      <div className="actions">
        <button className="helper-button" onClick={handleHelperClick}>
          Helpers
        </button>
        <TbHeart size={20} onClick={handleWishlistClick} />
        <TbShoppingCart size={20} onClick={handleCartClick} />
        {isAuthenticated ? (
          <img
            src={user.avatar}
            alt="User Avatar"
            className="avatar"
            onClick={handleProfileClick}
          />
        ) : (
          <TbUser size={20} onClick={handleProfileClick} />
        )}
      </div>
      <Modal onClose={() => setIsOpen(false)} />
    </header>
  );
}

export default Header;

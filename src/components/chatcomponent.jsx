import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { TbHeart, TbShoppingCart } from "react-icons/tb";

function Chat() {
  const {
    chat,
    setChat,
    query,
    setQuery,
    helpers,
    setHistory,
    setWishlist,
    wishlist,
    setCart,
    cart,
  } = useAppContext();
  const navigate = useNavigate();
  const [selectedHelper, setSelectedHelper] = useState(undefined);

  function ProductSlider({ products }) {
    const toggleWishlist = (product, e) => {
      e.stopPropagation();
      const isWishlisted = wishlist.some((item) => item.id === product.id);
      if (isWishlisted) {
        setWishlist(wishlist.filter((item) => item.id !== product.id));
      } else {
        setWishlist([...wishlist, product]);
      }
    };

    const addToCart = (product, e) => {
      e.stopPropagation();
      const isInCart = cart.some((item) => item.id === product.id);
      if (!isInCart) {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    };

    return (
      <div className="product-slider">
        {products.map((product, i) => {
          const isWishlisted = wishlist.some((item) => item.id === product.id);
          return (
            <div
              className="product"
              key={i}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img src={product.img} />
              <div className="label">{product.name}</div>
              <h3>USD {product.price.toLocaleString()}</h3>
              <div className="product-actions">
                <button
                  className={`icon-btn wishlist ${isWishlisted ? "active" : ""}`}
                  onClick={(e) => toggleWishlist(product, e)}
                  title="Add to wishlist"
                >
                  <TbHeart
                    className="favorite-icon"
                    size={20}
                    fill={isWishlisted ? "currentColor" : "none"}
                  />
                </button>
                <button
                  className="icon-btn cart"
                  onClick={(e) => addToCart(product, e)}
                  title="Add to cart"
                >
                  <TbShoppingCart size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  function Response() {
    return (
      <div className="response">
        {chat.map((chatMessage) => (
          <MessageComponent message={chatMessage} key={chatMessage} />
        ))}
      </div>
    );
  }

  function MessageComponent({ message }) {
    return (
      <div>
        {message.sender == "user" ? (
          <div className="user-bubble">{message.query}</div>
        ) : (
          <div className="ai-bubble">
            <p>{message.message}</p>
            <ProductSlider products={message.products} />
          </div>
        )}
      </div>
    );
  }

  function DefaultResponse() {
    return (
      <div className="default-response">
        <h1>Find, compare and review products with AI.</h1>
        <h5>Describe what you want naturally.</h5>
        <h5>Simplify product details.</h5>
        <h5>Search by reason.</h5>
        <h5>Summarize reviews.</h5>
      </div>
    );
  }

  function getResponse(query) {
    if (chat == null) {
      setChat([]);
      setHistory((prevItems) => [...prevItems, chat]);
    }
    setChat((prevItems) => [
      ...prevItems,
      {
        sender: "user",
        query: query,
      },
    ]);

    setChat((prevItems) => [
      ...prevItems,
      {
        sender: "ai",
        message: "Here is what i found",
        products: [
          {
            id: 1,
            name: "Prod1",
            img: "image.jpeg",
            desc: "A compelling product",
            price: 30000,
            rating: 3,
          },
          {
            id: 2,
            name: "Prod2",
            img: "image.jpeg",
            desc: "A compelling product",
            price: 50000,
            rating: 5,
          },
          {
            id: 3,
            name: "Prod3",
            img: "image.jpeg",
            desc: "A compelling product",
            price: 28000,
            rating: 4,
          },
        ],
      },
    ]);
    setQuery("");
  }

  return (
    <div className="chat">
      {chat == null || chat == undefined ? <DefaultResponse /> : <Response />}
      <form
        className="search-bar"
        onSubmit={(e) => {
          e.preventDefault();
          getResponse(query);
        }}
      >
        <select
          className="select-helper"
          value={selectedHelper}
          onChange={(e) => setSelectedHelper(e.target.value)}
        >
          {helpers.map((helper) => {
            return (
              <option style={{ cursor: "pointer" }} key={helper.name}>
                {helper.name}
              </option>
            );
          })}
        </select>
        <input
          id="prompt"
          type="text"
          value={query}
          placeholder="What are you looking for?"
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default Chat;

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Header from "../components/header";
import { TbHeart, TbShoppingCart, TbShare2 } from "react-icons/tb";
import "../components/product.css";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    products,
    cart,
    setCart,
    wishlist,
    setWishlist,
    currentProduct,
    setCurrentProduct,
  } = useAppContext();

  const [productChat, setProductChat] = useState([]);
  const [productQuery, setProductQuery] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Find product
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <main>
        <Header />
        <section className="product-page">
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <h2>Product not found</h2>
            <button onClick={() => navigate("/")} className="default-button">
              Back to Home
            </button>
          </div>
        </section>
      </main>
    );
  }

  const isInWishlist = wishlist.some((item) => item.id === product.id);
  const isInCart = cart.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      setCart([
        ...cart,
        {
          ...product,
          quantity,
        },
      ]);
    }
  };

  const handleWishlist = () => {
    if (isInWishlist) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const handleProductChat = () => {
    if (productQuery.trim()) {
      setProductChat([
        ...productChat,
        {
          sender: "user",
          message: productQuery,
        },
      ]);

      // Simulate AI response
      setTimeout(() => {
        setProductChat((prev) => [
          ...prev,
          {
            sender: "ai",
            message: `Regarding "${product.name}": ${getAIResponse(
              productQuery,
              product
            )}`,
          },
        ]);
      }, 500);

      setProductQuery("");
    }
  };

  const getAIResponse = (query, product) => {
    const lowerQuery = query.toLowerCase();
    if (
      lowerQuery.includes("price") ||
      lowerQuery.includes("cost") ||
      lowerQuery.includes("expensive")
    ) {
      return `This product is priced at $${product.price}. It's ${
        product.price < 30000
          ? "an affordable option"
          : product.price < 60000
          ? "mid-range priced"
          : "a premium product"
      } in its category.`;
    } else if (
      lowerQuery.includes("review") ||
      lowerQuery.includes("rating") ||
      lowerQuery.includes("good")
    ) {
      return `This product has a ${product.rating}/5 rating with ${product.reviews} reviews. Customers generally find it to be ${
        product.rating >= 4.5
          ? "excellent"
          : product.rating >= 4
          ? "very good"
          : product.rating >= 3
          ? "decent"
          : "okay"
      }.`;
    } else if (
      lowerQuery.includes("spec") ||
      lowerQuery.includes("feature") ||
      lowerQuery.includes("capability")
    ) {
      return `Key specifications: ${product.specs}. This product is designed for quality and performance in the ${product.category} category.`;
    } else if (lowerQuery.includes("comparison") || lowerQuery.includes("vs")) {
      return `${product.name} stands out with its ${product.rating}/5 rating and ${product.reviews} customer reviews. At $${product.price}, it offers great ${
        product.price < 30000
          ? "value for the price"
          : "premium quality"
      }.`;
    } else {
      return `${product.name} is a great choice. With a rating of ${product.rating}/5 stars and ${product.reviews} customer reviews, it's a reliable product in the ${product.category} category. The price point of $${product.price} makes it ${
        product.price < 30000
          ? "very competitively priced"
          : product.price < 60000
          ? "reasonably priced for the quality"
          : "positioned as a premium option"
      }.`;
    }
  };

  return (
    <main>
      <Header />
      <section className="product-page">
        <button onClick={() => navigate("/")} className="back-button">
          ← Back
        </button>

        <div className="product-container">
          <div className="product-details">
            <div className="product-image">
              <img src={product.img} alt={product.name} />
            </div>

            <div className="product-info">
              <h1>{product.name}</h1>
              <div className="rating">
                <span className="stars">★★★★☆ {product.rating}/5</span>
                <span className="reviews">({product.reviews} reviews)</span>
              </div>

              <p className="description">{product.desc}</p>

              <div className="specifications">
                <h3>Specifications</h3>
                <p>{product.specs}</p>
              </div>

              <div className="price-section">
                <h2 className="price">USD ${product.price.toLocaleString()}</h2>
              </div>

              <div className="quantity-selector">
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>

              <div className="product-actions">
                <button
                  className={`add-to-cart ${isInCart ? "in-cart" : ""}`}
                  onClick={handleAddToCart}
                >
                  <TbShoppingCart size={20} />
                  {isInCart ? "In Cart" : "Add to Cart"}
                </button>
                <button
                  className={`wishlist-btn ${isInWishlist ? "wishlisted" : ""}`}
                  onClick={handleWishlist}
                >
                  <TbHeart size={20} fill={isInWishlist ? "currentColor" : "none"} />
                </button>
                <button className="share-btn">
                  <TbShare2 size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="product-chat-section">
            <h3>Ask about this product</h3>
            <div className="product-chat-messages">
              {productChat.length === 0 ? (
                <div className="chat-placeholder">
                  <p>Have questions about {product.name}?</p>
                  <p>Ask our helper assistant for more information.</p>
                </div>
              ) : (
                productChat.map((msg, i) => (
                  <div
                    key={i}
                    className={`chat-message ${msg.sender}`}
                  >
                    <p>{msg.message}</p>
                  </div>
                ))
              )}
            </div>
            <form
              className="product-chat-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleProductChat();
              }}
            >
              <input
                type="text"
                value={productQuery}
                onChange={(e) => setProductQuery(e.target.value)}
                placeholder="Ask a question..."
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductPage;

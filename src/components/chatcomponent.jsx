import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";

function Chat() {
  const { chat, setChat, query, setQuery, helpers } = useAppContext();
  const [selectedHelper, setSelectedHelper] = useState(undefined);

  function ProductSlider({products}) {
    return (
      <div className="product-slider">
        {products.map((product, i) => {
          return <div className="product" key={i}>
            <img src={product.img} />
            <div className="label">{product.name}</div>
          </div>;
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
      setHistory((prevItems) => [
      ...prevItems,
      chat
    ]);
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
          { name: "Prod1", img: "image.jpeg", desc: "A compelling product" },
          { name: "Prod2", img: "image.jpeg", desc: "A compelling product" },
          { name: "Prod3", img: "image.jpeg", desc: "A compelling product" },
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

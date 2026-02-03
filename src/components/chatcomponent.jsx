import { useState } from "react";
import { useAppContext } from "../context/AppContext";

function Chat() {
  const [query, setQuery] = useState("");
  const { chat, setChat } = useAppContext();

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
    return <div className="message">{message.message}</div>;
  }

  function DefaultResponse() {
    return (
      <div className="default-response">
        <h1>Find, compare and review products with AI.</h1>
        <h5>Describe what you want naturally.</h5>
      </div>
    );
  }

  function getResponse(query) {
    return [
      {
        query: query,
        message: "Here is what i found",
        products: ["Prod1", "Prod2", "Prod3"],
      },
    ];
  }

  return (
    <div className="chat">
      {chat == null ? <DefaultResponse /> : <Response />}
      <div className="search-bar">
        <input
          placeholder="What are you looking for?"
          onChange={(event) => {
            event.preventDefault();
            setQuery(event.value);
          }}
        />
        <button
          onClick={() => {
            setChat(getResponse(query));
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Chat;

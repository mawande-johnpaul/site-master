import { useState, useRef, useEffect } from "react";
import { TbSend, TbHistory, TbPlus, TbSend2 } from "react-icons/tb";

function SearchBar() {
  const [query, setQuery] = useState("");
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px"; // 5 lines max
    }
  }, [query]);

  const handleSubmit = () => {
    if (query.trim()) {
      console.log("Searching:", query);
      // Add your search logic here
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="search-bar">
      <div className="options">
        <select>
          <option value="select">Helper1</option>
          <option value="compare">Helper2</option>
          <option value="summarize">Helper3</option>
          <option value="simplify">Helper4</option>
        </select>
        <div className="trailing">
          <button title="New Chat" aria-label="New Chat">
            <TbPlus />
          </button>
          <button title="History" aria-label="History">
            <TbHistory />
          </button>
          <button
            className="send-button"
            title="Send"
            aria-label="Send"
            onClick={handleSubmit}
            disabled={!query.trim()}
          >
            <TbSend2 fill="#fff" stroke="#fff"/>
          </button>
        </div>
      </div>
      <div className="search-input-container">
        <textarea
          ref={textareaRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about products..."
          rows={1}
        />
      </div>
    </div>
  );
}

export default SearchBar;

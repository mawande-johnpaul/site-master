import { useAppContext } from "../context/AppContext";
import DefaultResponse from "./default";
import ChatResponse from "./results";
import SearchBar from "./searchbar";

function Chat() {
  const { chat } = useAppContext();
  return (
    <div className="chat">
      {chat === null ? <DefaultResponse /> : <ChatResponse />}
      <SearchBar />
    </div>
  );
}

export default Chat;

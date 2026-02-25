import { AppProvider, useAppContext } from "../context/AppContext";

function ChatResponse() {
    const { chat } = useAppContext();
    return ( 
        <div className="chat-response">
            {
                chat.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {message.text}
                    </div>
                ))
            }
        </div>
    );
}

function Bubble({ text, sender }) {
    return (
        <div className={`message ${sender}`}>
            {text}
        </div>
    );
}

export default ChatResponse;
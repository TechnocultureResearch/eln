import ChatMessage from "./ChatMessage";
import { useMessageStore } from "./store";

const Chat = () => {
  const { messages } = useMessageStore();

  return (
    <div className='grow flex flex-col'>
      {
        messages.map((chat_message, index) => {
          if (chat_message.role !== "system")
          {
            return (<ChatMessage
              chat={ chat_message }
              key={ index }
            />);
          }
        })
      }
    </div>
  );
};

export default Chat;

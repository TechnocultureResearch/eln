import ChatMessage from "./ChatMessage";
import { ChatLog } from "./types";

interface ChatProps {
  chat: ChatLog;
  // className?: React.ComponentProps<'div'>['className'];
}

const Chat = (props: ChatProps) => {
  return (
    <div className='grow flex flex-col'>
      {
        props.chat.log?.map((chat_message, index) => {
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
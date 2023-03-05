import ChatMessage from "./ChatMessage";
import { ChatLog } from "./types";
import React from "react";

interface ChatProps {
  chat: ChatLog;
  // className?: React.ComponentProps<'div'>['className'];
}
const Chat = (props: ChatProps) => {
  return (
    <div className='flex flex-col grow bg-gray-900 rounded-md mb-6 overflow-x-scroll' >
      {
        props.chat.log.map((chat_message, index) => (
          <ChatMessage
            chat={ chat_message }
            key={ index }
          />
        ))
      }
    </div>
  );
};

export default Chat;
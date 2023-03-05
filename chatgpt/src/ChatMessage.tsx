import { ChatEntry } from "./types";
import React from 'react';

interface ChatMessageProps {
  chat: ChatEntry;
  // className?: React.ComponentProps<'div'>['className'];
}

const ChatMessage = (props: ChatMessageProps) => {
  return (
    <div className="flex flex-col p-4 gap-2">
      <p className={
        props.chat.sender === "User" ? "flex-none w-20 text-green-500 select-none" :
          "" }>{ props.chat.sender }</p>
      <p className="grow text-gray-100 selection:bg-green-100 selection:text-green-900">{ props.chat.message }</p>
    </div>
  );
};

export default ChatMessage;
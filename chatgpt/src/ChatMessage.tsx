import { ChatEntry } from "./types";
// import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  chat: ChatEntry;
  // className?: React.ComponentProps<'div'>['className'];
}

const ChatMessage = (props: ChatMessageProps) => {
  return (
    <div className="flex flex-col p-4 gap-2 text-xs group hover:bg-gray-900 ml-2 mr-2">
      <p className={
        props.chat.sender === "User" ? "text-green-500 group-hover:text-green-400 select-none" :
          "" }>{ props.chat.sender }</p>
      {/* <p className="grow text-gray-300 text-base selection:bg-green-100 selection:text-green-900 group-hover:text-gray-100">
        { props.chat.message }
      </p> */}
      <ReactMarkdown
        className="grow text-gray-300 text-base group-hover:text-gray-100 selection:bg-green-100 selection:text-green-900"
        children={ props.chat.message }
        remarkPlugins={ [remarkGfm] }
      />
    </div>
  );
};

export default ChatMessage;
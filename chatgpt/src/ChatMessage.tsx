import { ChatEntry } from "./types";
// import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy } from 'iconoir-react';

interface ChatMessageProps {
  chat: ChatEntry;
  // className?: React.ComponentProps<'div'>['className'];
}

function copyToClipboard (copyText: string) {
  navigator.clipboard.writeText(copyText).then(() => {
    // Alert the user that the action took place.
    // Nobody likes hidden stuff being done under the hood!
    alert("Copied to clipboard");
  });
}

const ChatMessage = (props: ChatMessageProps) => {
  return (
    <div className="flex flex-row p-4 gap-2 text-xs group hover:bg-gray-900 ml-2 mr-2 bg-blue-900">
      <div className="grow">
        <p className={
          props.chat.sender === "User" ? "text-gray-600 group-hover:text-green-200 select-none" :
            "text-green-300 group-hover:text-green-400 select-none" }>{ props.chat.sender }</p>
        <ReactMarkdown
          className="grow text-gray-200 text-base group-hover:text-gray-50 selection:bg-green-100 selection:text-green-900"
          children={ props.chat.message }
          remarkPlugins={ [remarkGfm] }
        />
      </div>
      <div className="">
        <button onClick={ () => copyToClipboard(props.chat.message) } className="bg-blue-900 group-hover:bg-gray-800 text-gray-400 group-hover:text-blue-50 flex-none p-1 w-fit">
          <Copy className="hover:text-red-300" height={ 20 } width={ 20 } />
        </button>
      </div>
    </div>
  );
};

export default ChatMessage;
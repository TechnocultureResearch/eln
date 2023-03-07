import TextareaAutosize from 'react-textarea-autosize';
import { chatGPT } from './openai';
import { ChatLog } from './types';
import { useRef } from 'react';

interface InputBarProps {
  chat_log: ChatLog;
  setChatLog: (chat_log: ChatLog) => void;
}

const InputBar = (props: InputBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  let onSend = async () => {
    let current = inputRef.current;
    if (current === null || current.value.trim() === "")
    {
      return;
    }

    let new_chat_log = props.chat_log.log;

    if (current.value.startsWith("!noai"))
    {
      new_chat_log.push({ role: "tester", content: current.value });
      props.setChatLog({ log: new_chat_log });

      current.value = "";
    }
    else
    {
      new_chat_log.push({ role: "user", content: current.value });
      props.setChatLog({ log: new_chat_log });

      new_chat_log.push({ role: "assistant", content: ". . ." });
      props.setChatLog({ log: new_chat_log });

      current.value = "";

      await chatGPT(props.chat_log).then((response) => {
        new_chat_log[new_chat_log.length - 1].content = response;
        props.setChatLog({ log: new_chat_log });
      }).catch((error) => {
        new_chat_log[new_chat_log.length - 1].content = `Sorry, I'm having some trouble. Please try again later.\n\n> Details\n> ${error}`;
        props.setChatLog({ log: new_chat_log });
      });
    }
  };

  return (
    <div className='flex gap-1 bg-gray-900'>
      <TextareaAutosize
        ref={ inputRef }
        maxRows={ 10 }
        placeholder='Type your message here...'
        autoFocus
        onKeyPress={ (e) => {
          if (e.key === 'Enter' && !e.shiftKey)
          {
            onSend();
            e.preventDefault();
          }
        } }
        className='flex-none resize-none grow bg-gray-900 border rounded border-gray-800 text-gray-200 p-2 min-h-full' />
      <button onClick={ onSend } className='p-4 text-green-400  hover:text-green-100 flex justify-end'>
        Send
      </button>
    </div>
  );
};

export default InputBar;
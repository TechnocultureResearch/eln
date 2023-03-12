import TextareaAutosize from 'react-textarea-autosize';
import { chatGPT, useChat } from '../LLM/openai';
import { ChatEntry } from '../types/types';
import { useRef } from 'react';
import { useMessageStore } from '../utils/store';

// import { useFrappeUpdateDoc } from 'frappe-react-sdk';
// import { ChatIdContext } from './chat_id_context';

// interface InputBarProps {
//   chat_log: ChatLog;
//   setChatLog: (chat_log: ChatLog) => void;
// }

const InputBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { chat_id, appendChat } = useChat();
  const { messages, addMessage, callChatGPT } = useMessageStore();

  const onSend = async (
    ref: React.RefObject<HTMLInputElement>,
    addMessage: (message: ChatEntry) => void,
  ) => {
    let current = ref.current;
    console.info("input value: ", current?.value);

    // Check if the input is empty
    if (current === null || current.value.trim() === "") { return; }

    // Check if the input is a command
    if (current.value.startsWith("!noai"))
    {
      addMessage({ role: "tester", content: current.value });
      current.value = "";
      return;
    }

    addMessage({ role: "user", content: current.value } as ChatEntry);
    addMessage({ role: "assistant", content: ". . ." } as ChatEntry);
    current.value = "";

    callChatGPT();
  };

  return (
    <div className='flex gap-1 bg-gray-900'>
      <TextareaAutosize
        ref={ inputRef }
        maxRows={ 10 }
        placeholder='Type your message here...'
        autoFocus
        onKeyPress={ (e) => {
          if (e.key === 'Enter' && e.shiftKey)
          {
            onSend(inputRef, addMessage);
            e.preventDefault();
          }
        } }
        className='flex-none resize-none grow bg-gray-900 border rounded border-gray-800 text-gray-200 p-2 min-h-full' />
      <button
        onClick={ () => onSend(inputRef, addMessage) }
        className='p-4 text-green-400  hover:text-green-100 flex justify-end'
      >
        Send
      </button>
    </div >
  );
};

export default InputBar;
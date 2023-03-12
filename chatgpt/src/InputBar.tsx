import TextareaAutosize from 'react-textarea-autosize';
import { chatGPT, useChat } from './openai';
import { ChatLog, ChatEntry } from './types';
import { useRef } from 'react';
// import { useFrappeUpdateDoc } from 'frappe-react-sdk';
// import { ChatIdContext } from './chat_id_context';

interface InputBarProps {
  chat_log: ChatLog;
  setChatLog: (chat_log: ChatLog) => void;
}

const InputBar = (props: InputBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { chat_id, appendChat } = useChat();

  const onSend = async (
    ref: React.RefObject<HTMLInputElement>,
    props: InputBarProps
  ) => {
    let current = ref.current;
    console.info("input value: ", current?.value);

    // Check if the input is empty
    if (current === null || current.value.trim() === "") { return; }

    // Check if the input is a command
    if (current.value.startsWith("!noai"))
    {
      props.setChatLog({
        log: [
          ...props.chat_log.log,
          { role: "tester", content: current.value }
        ]
      });
      current.value = "";
      return;
    }

    props.chat_log.log.push({ role: "user", content: current.value } as ChatEntry);
    props.chat_log.log.push({ role: "assistant", content: ". . ." } as ChatEntry);
    console.info(props.chat_log.log);
    props.setChatLog(props.chat_log);

    current.value = "";

    // Update the chat log in the database
    chatGPT(
      props.chat_log
    ).then((response) => {
      let index = props.chat_log.log?.length === 0 ? 0 : props.chat_log.log.length - 1;
      props.chat_log.log[index].content = response;
      props.setChatLog(props.chat_log);

      // Create a new Chat Message Document
      appendChat({ role: "assistant", content: response });
    }).catch((error) => {
      console.error(error);
      if (props.chat_log.log === undefined) { return; }

      const index = props.chat_log.log?.length === 0 ? 0 : props.chat_log.log.length - 1;
      props.chat_log.log[index].content = `Sorry, I'm having some trouble. Please try again later.\n\n> Details\n> ${error}`;
      props.setChatLog(props.chat_log);
    });
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
            onSend(inputRef, props);
            e.preventDefault();
          }
        } }
        className='flex-none resize-none grow bg-gray-900 border rounded border-gray-800 text-gray-200 p-2 min-h-full' />
      <button
        onClick={ () => onSend(inputRef, props) }
        className='p-4 text-green-400  hover:text-green-100 flex justify-end'
      >
        Send
      </button>
    </div >
  );
};

export default InputBar;
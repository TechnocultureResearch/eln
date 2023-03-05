import { useRef, useState } from 'react';
import { FrappeProvider } from 'frappe-react-sdk';
import Chat from './Chat';
import { ChatLog } from './types';
import TextareaAutosize from 'react-textarea-autosize';

function App () {
  //const [chat_log, setChatLog] = useState<ChatProps>({ log: [] });
  const [chat_log, setChatLog] = useState<ChatLog>({ log: [{ sender: "User", "message": "hello" }] });
  const inputRef = useRef<HTMLInputElement>(null);

  let onSend = () => {
    let current = inputRef.current;
    if (current === null || current.value.trim() === "")
    {
      return;
    }

    let new_chat_log = chat_log.log;
    new_chat_log.push({ sender: "User", message: current.value });
    setChatLog({ log: new_chat_log });
    current.value = "";
  };

  return (
    <FrappeProvider>
      <div className='bg-gray-900 min-h-screen max-h-screen min-w-screen overflow py-6 px-4 flex flex-col'>
        <div className='flex-none gap-2'>
          <img src='./logo.png' className='w-6 h-6 mb-6 border-gray-700 border-2' />
        </div>
        <Chat chat={ chat_log } />
        <div className='flex gap-1 bg-gray-900'>
          <TextareaAutosize
            ref={ inputRef }
            maxRows={ 10 }
            placeholder='Type your message here...'
            autoFocus
            className='resize-none grow bg-gray-900 border rounded border-gray-800 text-gray-200 p-2' />
          <button onClick={ onSend } className='p-4 text-green-400 hover:bg-green-500 hover:text-red-100'>Send</button>
        </div>
      </div >
    </FrappeProvider >
  );
};

export default App;

import { useEffect, useRef, useState } from 'react';
import { FrappeProvider, useFrappeAuth } from 'frappe-react-sdk';
import Chat from './Chat';
import { ChatLog, SystemPersona } from './types';
import { SystemPrompt } from './prompts';
import TextareaAutosize from 'react-textarea-autosize';
import { chatGPT } from './openai';
import ToggleMenu from './ToggleMenu';
import logo from './assets/logo.png';
import { APIKEY } from './GetAPIKey';
import Div100vh from 'react-div-100vh';

function App () {
  const [chat_log, setChatLog] = useState<ChatLog>({ log: [] });
  // const [chat_log, setChatLog] = useState<ChatLog>({ log: [{ role: "user", "content": "hello" }] });
  const inputRef = useRef<HTMLInputElement>(null);
  const [persona, setPersona] = useState<SystemPersona>(null);

  useEffect(() => {
    if (persona === null)
    {
      return;
    }
    else
    {
      let new_chat_log = chat_log.log;
      new_chat_log.push({ role: "system", content: `Hi, I'm a Scientific Assistant (${persona}). ${SystemPrompt(persona)}` });
      setChatLog({ log: new_chat_log });
    }
  }, [persona]);

  let onSend = async () => {
    let current = inputRef.current;
    if (current === null || current.value.trim() === "")
    {
      return;
    }

    let new_chat_log = chat_log.log;

    if (current.value.startsWith("!noai"))
    {
      new_chat_log.push({ role: "tester", content: current.value });
      setChatLog({ log: new_chat_log });
    }
    else
    {
      new_chat_log.push({ role: "user", content: current.value });
      setChatLog({ log: new_chat_log });

      new_chat_log.push({ role: "assistant", content: ". . ." });
      setChatLog({ log: new_chat_log });

      await chatGPT(chat_log).then((response) => {
        new_chat_log[new_chat_log.length - 1].content = response;
        setChatLog({ log: new_chat_log });
      });
    }

    current.value = "";
  };

  return (
    <FrappeProvider>
      <Div100vh className='bg-gray-900 overflow py-6 px-4 flex flex-col'>
        <div className='gap-2 flex'>
          <img src={ logo } className='w-6 h-6 mb-6 border-gray-700 border-2' />
          <ToggleMenu setPersona={ setPersona } disabled={ chat_log.log.length > 0 } />
        </div>

        <Chat chat={ chat_log } />
        <APIKEY />
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
      </Div100vh>
    </FrappeProvider >
  );
};

export default App;

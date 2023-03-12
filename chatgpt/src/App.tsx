import { useEffect, useState } from 'react';
import { useFrappeAuth, useFrappeGetDoc } from 'frappe-react-sdk';
import { SystemPersona, ChatLog, ChatEntry } from './types/types';
import { SystemPrompt } from './LLM/prompts';
import { Chat } from './types/ELN/Chat';
import Div100vh from 'react-div-100vh';
import LoggedOut from './Components/LoggedOut';
import LoggedIn from './Components/LoggedIn';
import ToggleMenu from './Components/ToggleMenu';
import logo from './assets/logo.png';
import { ErrorBoundary } from "react-error-boundary";
import { useChat } from './LLM/openai';

function ErrorFallback ({ error, componentStack, resetErrorBoundary }: any) {
  return (
    <div role="alert" className="text-red-400 p-4">
      <p>Something went wrong:</p>
      <pre>{ error.message }</pre>
      <pre>{ componentStack }</pre>
    </div>
  );
}

function App () {
  const { currentUser } = useFrappeAuth();
  let isLoggedIn = false;

  const { chat_id } = useChat();
  const [chat_log, setChatLog] = useState<ChatLog>({ log: [] });
  const [persona, setPersona] = useState<SystemPersona>(null);

  useEffect(() => {
    if (persona === null)
    {
      return;
    }
    else
    {
      setChatLog({
        log: [
          ...chat_log.log,
          {
            role: "system",
            content: `Hi, 
          I'm a Scientific Assistant (${persona}). 
          ---
          ${SystemPrompt(persona)}`
          } as ChatEntry
        ]
      });
    }
  }, [persona]);

  const { data, error } = useFrappeGetDoc<Chat>(
    'Chat',
    chat_id,
    {
      fields: ['log'],
    });

  useEffect(() => {
    if (data && data.log)
    {
      // If the chat log is present in the database
      const messages = data.log.map(item => {
        return {
          role: item.role,
          content: item.content,
        } as ChatEntry;
      });
      setChatLog({ log: messages });
    }
  }, [data]);

  return (
    <ErrorBoundary
      FallbackComponent={ ErrorFallback }
    >
      <Div100vh className='bg-gray-900 py-6 px-4 flex flex-col'>
        <div className='gap-2 flex'>
          <img src={ logo } className='flex-none w-6 h-6 mb-6 border-gray-700 border-2' />
          {
            !isLoggedIn ?
              <ToggleMenu
                setPersona={ setPersona }
                disabled={ chat_log.log.filter(
                  item => (
                    (item.role !== "system") && (item.role !== "tester")
                  )).length > 0 }
              />
              : null
          }
        </div>
        {
          isLoggedIn ?
            <LoggedOut /> :
            <LoggedIn
              chat_log={ chat_log }
              setChatLog={ setChatLog }
            // user={ currentUser ? currentUser : "" }
            />
        }
      </Div100vh>
    </ErrorBoundary>
  );
};

export default App;

import { useEffect, useState } from 'react';
import { useFrappeAuth } from 'frappe-react-sdk';
import { ChatLog, SystemPersona } from './types';
import { SystemPrompt } from './prompts';

import ToggleMenu from './ToggleMenu';
import logo from './assets/logo.png';
import Div100vh from 'react-div-100vh';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

function App () {
  const { currentUser } = useFrappeAuth();
  const isLoggedIn = (currentUser === null || currentUser === undefined);

  const [chat_log, setChatLog] = useState<ChatLog>({ log: [] });
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

  return (
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
          <LoggedIn chat_log={ chat_log } setChatLog={ setChatLog } user={ currentUser } />
      }
    </Div100vh>
  );
};

export default App;

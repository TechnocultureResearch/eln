import { ELNSettings } from "./types/ELN/ELNSettings";
import InputBar from './InputBar';
import Chat from './Chat';
import { useEffect } from "react";
import { useFrappeGetDoc } from "frappe-react-sdk";
import { ChatLog } from "./types";

// interface LoggedInProps {
//   chat_log: ChatLog;
//   setChatLog: (chat_log: ChatLog) => void;
// }

const LoggedIn = () => {
  const { data, error } = useFrappeGetDoc<ELNSettings>(
    'ELN Settings',
    'ELN Settings',
    {
      fields: ['openai_api_key'],
    }
  );

  useEffect(() => {
    // store API key in local storage
    if (data && data.openai_api_key)
    {
      localStorage.setItem('openai_api_key', data.openai_api_key);
    }
  }, [data]);

  return (
    <>
      {/* { isValidating && <div className='text-gray-500'>Loading...</div> }; */ }

      {
        error &&
        <div className='text-red-500'>
          <p>There was an error loading the settings.</p>
        </div>
      }

      {
        data &&
        <div className='flex flex-col grow gap-6'>
          <Chat />
          <InputBar />
        </div>
      }
    </>
  );
};

export default LoggedIn;
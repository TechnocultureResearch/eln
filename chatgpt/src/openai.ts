import axios from 'axios';
import { ChatEntry, ChatLog } from './types';
import { useFrappeCreateDoc, useFrappeGetDoc, useFrappeUpdateDoc, FrappeDoc } from 'frappe-react-sdk';
import { Chat } from './types/ELN/Chat';
import { ChatMessage } from './types/ELN/ChatMessage';
import { useContext } from 'react';
import { ChatIdContext } from './chat_id_context';
import { useEffect } from 'react';

// // 1. Authenticate, get token from OpenAI
export const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// 2. Create a completion request
const OPENAI_CHATGPT_API_URL = "https://api.openai.com/v1/chat/completions";
const config = (api_key: String) => ({
    headers: { 
      Authorization: `Bearer ${api_key}`, 
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8"
    }
});

export const useChat = () => {
  const chat_id = useContext(ChatIdContext);
  const { createDoc } = useFrappeCreateDoc<Chat>();

  useEffect(() => {
    if (chat_id === '') {
      // Create a new chat
      createDoc('Chat', {} as Chat).then((data) => {
        console.info('Created new chat: ', data);
        // TODO: Route to new chat name
        // Here is how:

        console.info('Current URL: ', window.location.href);
        console.info('Current URL: ', window.location.search);

        // const url = new URL(window.location.href);
        // url.searchParams.set('chat_id', data.name);
        // window.history.pushState({}, '', url.toString());
      });
    }
  }, [chat_id]);

  const { data } = useFrappeGetDoc<Chat>('Chat', chat_id);
  const { updateDoc } = useFrappeUpdateDoc<Chat>();

  const appendChat = (entry: ChatEntry) => {
    if (data && data.log) {
      updateDoc('Chat', chat_id, {
        log: [...data.log, {
          role: entry.role,
          content: entry.content,
        } as ChatMessage],
      });
    }
  };

  console.debug('Current chat ID: ', chat_id);

  return {
    chat_id,
    appendChat,
  };
};

export const chatGPT = async (
  chat_log: ChatEntry[]
  ): Promise<string> => {
  const user_prompts = chat_log.filter(item => item.role === "user");
  console.info("User Prompt Count: ", user_prompts.length);

  if (user_prompts.length === 0) {
    // If there are no user prompts, return a default message
    throw new Error("No user prompts");
  }

  let data = {
    "model": "gpt-3.5-turbo",
    "messages": user_prompts // Filter out tester messages
  };

  // Get latest user message if it exists
  const user_message = user_prompts[user_prompts.length - 1];
  console.info("User Message: ", user_message);

  let reply = "";
  await axios.post(
    OPENAI_CHATGPT_API_URL, 
    data, 
    config(localStorage.getItem("openai_api_key") || OPENAI_API_KEY))
    .then(function (response) {
      reply = response.data.choices[0].message.content;
    });

  return reply;
}

import axios from 'axios';
import { ChatLog } from './types';

// 1. Authenticate, get token from OpenAI
export const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// 2. Create a completion request
const OPENAI_CHATGPT_API_URL = "https://api.openai.com/v1/chat/completions";
const config = {
    headers: { 
      Authorization: `Bearer ${OPENAI_API_KEY}`, 
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8"
    }
};

export const chatGPT = async (chat_log: ChatLog) => {
  let data = {
    "model": "gpt-3.5-turbo",
    "messages": chat_log.log,
  };
  console.log(data);

  let reply = "";
  await axios.post(OPENAI_CHATGPT_API_URL, data, config)
    .then(function (response) {
      reply = response.data.choices[0].message.content;
    })
    .catch(function (error) {
      console.log(error);
    });

  return reply;
}

// 3. Send the request to OpenAI
// 4. Print the response
// 5. Add the request and response to the history
// 6. On follow-up requests, use the history as context
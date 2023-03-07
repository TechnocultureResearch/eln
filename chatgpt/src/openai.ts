import axios from 'axios';
import { ChatLog } from './types';

// // 1. Authenticate, get token from OpenAI
// export const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// 2. Create a completion request
const OPENAI_CHATGPT_API_URL = "https://api.openai.com/v1/chat/completions";
const config = (api_key: String) => ({
    headers: { 
      Authorization: `Bearer ${api_key}`, 
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8"
    }
});

export const chatGPT = async (chat_log: ChatLog) => {
  let data = {
    "model": "gpt-3.5-turbo",
    "messages": chat_log.log.slice(0, -1).filter(item => item.role !== "tester") // All but not the last item
  };

  let reply = "";
  await axios.post(OPENAI_CHATGPT_API_URL, data, config(localStorage.getItem("openai_api_key") || OPENAI_API_KEY))
    .then(function (response) {
      reply = response.data.choices[0].message.content;

      // TODO: Write the question and answer to the database
    })
    .catch(function (error) {
      throw new Error(error);
    });

  return reply;
}
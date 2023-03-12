import { create } from 'zustand';
import { ChatEntry } from './types';
import { chatGPT } from './openai';

interface MessageStore {
  messages: ChatEntry[];
  addMessage: (message: ChatEntry) => void;
  changeLastAssistantMessage: (content: string) => void;
  callChatGPT: () => Promise<void>;
}

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [] as ChatEntry[],

  addMessage: (message: ChatEntry) => set(
    (state) => ({ messages: [...state.messages, message] })),

  changeLastAssistantMessage: (content: string) => set(
    (state) => {
      const messages = [...state.messages];
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        lastMessage.content = content;
      }
      return { messages };
    }
  ),

  callChatGPT: async () => {
    let state = useMessageStore.getState();

    try {
      const response = await chatGPT(
        state.messages
      );

      state.changeLastAssistantMessage(response);
    } catch (error) {
      console.error(error);
      if (state.messages === undefined) { return; }
      state.changeLastAssistantMessage(`Sorry, I'm having some trouble. Please try again later.\n\n> Details\n> ${error}`);
    }
  }
}));

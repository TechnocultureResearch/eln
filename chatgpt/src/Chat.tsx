import * as ScrollArea from '@radix-ui/react-scroll-area';
import ChatMessage from "./ChatMessage";
import { ChatLog } from "./types";

interface ChatProps {
  chat: ChatLog;
  // className?: React.ComponentProps<'div'>['className'];
}

const Chat = (props: ChatProps) => {
  return (
    <ScrollArea.Root className='flex flex-col grow bg-gray-900 rounded-md mb-6 overflow-hidden overscroll-auto justify-end items-center'>
      <ScrollArea.Viewport className="max-w-[1000px] h-full">
        {
          props.chat.log.map((chat_message, index) => (
            <ChatMessage
              chat={ chat_message }
              key={ index }
            />
          ))
        }
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex select-none touch-none p-0.5 bg-gray-900 transition-colors duration-[160ms] ease-out hover:bg-black data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="flex-1 bg-gray-800 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="flex select-none touch-none p-0.5 bg-gray-600 transition-colors duration-[160ms] ease-out hover:bg-black data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="flex-1 bg-white rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="bg-gray-200" />
    </ScrollArea.Root>
  );
};

export default Chat;
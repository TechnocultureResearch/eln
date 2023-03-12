import { ChatEntry } from "../types/types";
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Check, Copy } from 'iconoir-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ChatMessageProps {
  chat: ChatEntry;
}

const ChatMessage = (props: ChatMessageProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = (copyText: string) => {
    // NOTE: `navigator.clipboard` is supported in secure contexts only
    // Won't work in localhost
    // https://stackoverflow.com/questions/71873824/copy-text-to-clipboard-cannot-read-properties-of-undefined-reading-writetext
    navigator.clipboard.writeText(copyText.trim()).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }).catch((err) => {
      console.error(err);
    });
  };

  return (
    <div className={ "flex flex-col p-4 gap-2 text-xs group ml-2 mr-2 hover:bg-slate-900 bg-blue-900" }>
      <div className="grow flex flex-row justify-between">
        <p className={
          props.chat.role === "user" || props.chat.role === "tester" ? "text-gray-600 group-hover:text-gray-400 select-none" :
            "text-green-300 group-hover:text-green-200 select-none" }>{ props.chat.role }</p>

        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button onClick={ () => copyToClipboard(props.chat.content) } className="bg-blue-900 group-hover:bg-blue-800 text-blue-400 group-hover:text-blue-50 flex-none p-1 w-fit h-fit">
                { copied ? <Check className="hover:text-green-200" height={ 14 } width={ 14 } /> : <Copy className="hover:text-green-200" height={ 14 } width={ 14 } /> }
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-xs text-blue-900 select-none rounded bg-green-300 px-2 py-2 leading-none will-change-[transform,opacity]"
                sideOffset={ 5 }
              >
                Copy
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>

      <ReactMarkdown
        className="pt-2 text-gray-200 text-sm group-hover:text-gray-100 overflow-x-scroll"
        children={ props.chat.content }
        remarkPlugins={ [remarkGfm] }
        components={ {
          code ({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                children={ String(children).replace(/\n$/, '') }
                style={ dracula }
                language={ match[1] }
                PreTag="div"
                showLineNumbers
                { ...props }
              />
            ) : (
              <code className={ className } { ...props }>
                { children }
              </code>
            );
          }
        } }
      />

    </div>
  );
};

export default ChatMessage;
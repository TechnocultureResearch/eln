export type ChatEntry = {
  role: "user" | "assistant";
  content: string;
};

export type ChatLog = {
  log: ChatEntry[];
};
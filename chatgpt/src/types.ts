export type ChatEntry = {
  sender: "User" | "Assistant";
  message: string;
};

export type ChatLog = {
  log: ChatEntry[];
};
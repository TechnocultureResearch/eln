export type ChatEntry = {
  role: "user" | "assistant" | "system" | "tester";
  content: string;
};

export type ChatLog = {
  log: ChatEntry[];
};

export type SystemPersona = "scientist" | "regulator" | "student" | "IPR" | null;
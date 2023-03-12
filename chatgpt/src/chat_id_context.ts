import React from "react";

export const get_chat_id_from_url = () => {
  try
  {
    const url = window.location.href;

    const match = url.split("/").pop(); // Remove the leading slash
    if (!match || match.length === 0)
    {
      return "";
    }

    return match;
  } catch (error)
  {
    console.log(error);
    return "";
  }
};

export const ChatIdContext = React.createContext<string>(
  get_chat_id_from_url());

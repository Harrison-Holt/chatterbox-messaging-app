import { useState, useEffect } from "react";
import api from "./axios.ts"; 

interface Message {
  _id: string;
  content: string;
  createdAt: string;
  sender: {
    _id: string;
    username: string;
  } | null;
}

interface ApiResponse {
  message?: string;
  messages: Message[];
}

export const useMessage = (
  token: string | null,
  channelId: string | null
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageLoading, setLoading] = useState<boolean>(false);
  const [messageError, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    if (!token || !channelId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await api.get<ApiResponse>(
        `http://localhost:5000/api/channels/${channelId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages(response.data.messages);
    } catch (err) {
      setError("Error fetching messages!");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [token, channelId]);

  return { messages, messageLoading, messageError, setMessages, fetchMessages };
};
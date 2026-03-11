import { useState } from "react";
import api from "./axios.ts"; 

export const useCreateMessage = (token: string | null, channelId: string | null) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token || !channelId || !content.trim()) {
      setError("Message content is required.");
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      await api.post(
        `http://localhost:5000/api/channels/${channelId}/messages`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContent("");
      return true;
    } catch (err) {
      setError("Error sending message.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    content,
    setContent,
    loading,
    error,
    createMessage,
  };
};

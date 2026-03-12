import { useState, useEffect } from "react";
import axios from "axios";

interface Channel {
  _id: string;
  name: string;
  description?: string;
  members?: string[];
}

interface ApiResponse {
  message?: string;
  channels: Channel[];
}

export const useChannel = (token: string | null) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [channels, setChannels] = useState<Channel[]>([]);
  const [channelLoading, setLoading] = useState<boolean>(false);
  const [channelError, setError] = useState<string | null>(null);

  const fetchChannels = async () => {
    if (!token) {
      setChannels([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get<ApiResponse>(
        `${API_URL}/api/channels/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setChannels(response.data.channels);
    } catch (err) {
      setError("Error fetching joined channels!");
      setChannels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, [token]);

  return { channels, channelLoading, channelError, fetchChannels };
};

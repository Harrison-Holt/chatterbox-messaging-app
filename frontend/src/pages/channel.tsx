import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Alert,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import panel from "../assets/gradient.png";

interface Channel {
  _id: string;
  name: string;
  description?: string;
  members: string[];
}

function Channel() {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [channels, setChannels] = useState<Channel[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [joinLoadingId, setJoinLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchChannels = async () => {
    try {
      setError(null);

      const res = await axios.get(`${API_URL}/api/channels/public`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setChannels(res.data.channels || []);
    } catch {
      setError("Failed to load channels");
    }
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  const handleCreateChannel = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !description.trim()) {
      setError("Channel name and description are required.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await axios.post(
        `${API_URL}/api/channels/create`,
        {
          name: name.trim(),
          description: description.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setName("");
      setDescription("");
      await fetchChannels();
    } catch {
      setError("Failed to create channel");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinChannel = async (channelId: string) => {
    try {
      setJoinLoadingId(channelId);
      setError(null);

      await axios.post(
        `${API_URL}/api/channels/${channelId}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchChannels();
      navigate("/");
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError("You already joined this channel.");
      } else {
        setError("Failed to join channel");
      }
    } finally {
      setJoinLoadingId(null);
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(2,6,23,0.82), rgba(2,6,23,0.82)), url(${panel})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: 5,
        px: 3,
      }}
    >
      <Box sx={{ maxWidth: 1050, mx: "auto" }}>
        <Paper
          elevation={5}
          sx={{
            mb: 4,
            borderRadius: 4,
            px: 3,
            py: 2.5,
            bgcolor: "rgba(15,23,42,0.82)",
            color: "white",
            backdropFilter: "blur(8px)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                component="img"
                src={logo}
                alt="ChatterBox logo"
                sx={{ height: 48, width: "auto" }}
              />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Channel Workspace
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Create a channel or join an existing one
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              onClick={() => navigate("/")}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              Back to Chat
            </Button>
          </Box>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "360px 1fr" },
            gap: 3,
          }}
        >
          <Paper
            elevation={5}
            sx={{
              borderRadius: 4,
              p: 3,
              bgcolor: "rgba(255,255,255,0.94)",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1,  color: "#000 !important" }}>
              Create Channel
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Start a new conversation space for your team.
            </Typography>

            <Box
              component="form"
              onSubmit={handleCreateChannel}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Channel Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                sx={{
                    input: { color: "#000" },
                    label: { color: "#555" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#ccc" },
                      "&:hover fieldset": { borderColor: "#888" },
                      "&.Mui-focused fieldset": { borderColor: "#1976d2" }
                }
                }}
              />

              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                minRows={3}
                  sx={{
                    input: { color: "#000 !important" },
                    label: { color: "#555" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#ccc" },
                      "&:hover fieldset": { borderColor: "#888" },
                      "&.Mui-focused fieldset": { borderColor: "#1976d2" }
                  }
                  }}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 1,
                  py: 1.3,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                {loading ? "Creating..." : "Create Channel"}
              </Button>
            </Box>
          </Paper>

          <Paper
            elevation={5}
            sx={{
              borderRadius: 4,
              p: 3,
              bgcolor: "rgba(15,23,42,0.82)",
              color: "white",
              backdropFilter: "blur(8px)",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              Public Channels
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
              Browse available channels and join ongoing conversations.
            </Typography>

            {channels.length > 0 ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {channels.map((channel) => {
                  const alreadyJoined = channel.members?.some(
                    (memberId) => memberId.toString() === userId
                  );

                  return (
                    <Paper
                      key={channel._id}
                      elevation={2}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        bgcolor: "rgba(255,255,255,0.08)",
                        color: "white",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 2,
                          flexWrap: "wrap",
                        }}
                      >
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
                            {channel.name}
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            {channel.description || "No description provided."}
                          </Typography>
                        </Box>

                        <Button
                          variant={alreadyJoined ? "contained" : "outlined"}
                          disabled={alreadyJoined || joinLoadingId === channel._id}
                          onClick={() => handleJoinChannel(channel._id)}
                          sx={{
                            minWidth: 110,
                            textTransform: "none",
                            borderRadius: 2,
                            fontWeight: 600,
                            color: "white",
                            borderColor: "rgba(255,255,255,0.28)",
                          }}
                        >
                          {alreadyJoined
                            ? "Joined"
                            : joinLoadingId === channel._id
                            ? "Joining..."
                            : "Join"}
                        </Button>
                      </Box>
                    </Paper>
                  );
                })}
              </Box>
            ) : (
              <Typography sx={{ mt: 2, opacity: 0.8 }}>
                No channels found.
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

export default Channel;

import { Container, Typography, Box, Button, TextField, Alert, Paper } from "@mui/material";
import { useState } from "react";
import logo from "../assets/logo.png";
import WifiChannelIcon from "@mui/icons-material/WifiChannel";
import chat_image from "../assets/background.png";
import { useChannel } from "../hooks/useChannel.ts";
import { useCreateMessage } from "../hooks/useCreateMessage.ts";
import { useMessage } from "../hooks/useMessage.ts";
import { useNavigate } from "react-router-dom";

interface Channel {
  _id: string;
  name: string;
  description?: string;
  members?: string[];
}

function Home() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const { messages, messageLoading, messageError, fetchMessages } = useMessage(
    token,
    selectedChannel?._id || null
  );

  const { content, setContent, loading, error, createMessage } = useCreateMessage(
    token,
    selectedChannel?._id || null
  );

  const { channels, channelLoading, channelError } = useChannel(token);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await createMessage(e);
    if (success) {
      fetchMessages();
    }
  };

  if (!token) {
    return <p>No token found. Please login.</p>;
  }

  if (channelLoading) {
    return <p>Loading your workspace...</p>;
  }

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        bgcolor: "#0f172a",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: 290,
          bgcolor: "#111827",
          color: "white",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Logo/Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 2,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Box component="img" src={logo} alt="ChatterBox logo" sx={{ height: 48, width: "auto" }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            ChatterBox
          </Typography>
        </Box>

        {/* Channels Section */}
        <Box sx={{ px: 2, py: 2, display: "flex", flexDirection: "column", gap: 2, flexGrow: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WifiChannelIcon />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              My Channels
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={() => navigate("/create_channel")}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            Create / Join Channel
          </Button>

          {channelError && <Alert severity="error">{channelError}</Alert>}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              overflowY: "auto",
              pr: 0.5,
            }}
          >
            {channels?.map((channel) => (
              <Box
                key={channel._id}
                onClick={() => setSelectedChannel(channel)}
                sx={{
                  cursor: "pointer",
                  px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  bgcolor:
                    selectedChannel?._id === channel._id
                      ? "rgba(59,130,246,0.22)"
                      : "rgba(255,255,255,0.04)",
                  border:
                    selectedChannel?._id === channel._id
                      ? "1px solid rgba(96,165,250,0.45)"
                      : "1px solid transparent",
                  transition: "0.2s ease",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {channel.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Main Chat Area */}
      <Box
        sx={{
          flexGrow: 1,
          backgroundImage: `linear-gradient(rgba(2,6,23,0.72), rgba(2,6,23,0.72)), url(${chat_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "white",
          p: 3,
        }}
      >
        {/* Top Bar */}
        <Paper
          elevation={4}
          sx={{
            bgcolor: "rgba(15,23,42,0.72)",
            color: "white",
            borderRadius: 3,
            px: 3,
            py: 2,
            mb: 2,
            backdropFilter: "blur(8px)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {selectedChannel ? (
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {selectedChannel.name}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.75 }}>
                  Channel conversation
                </Typography>
              </Box>
            ) : (
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Select a channel
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.75 }}>
                  Choose a channel from the sidebar to start chatting
                </Typography>
              </Box>
            )}

            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              Logout
            </Button>
          </Box>
        </Paper>

        {/* Messages */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            pr: 1,
            mb: 2,
          }}
        >
          {messageLoading && <Typography>Loading messages...</Typography>}
          {messageError && <Typography>{messageError}</Typography>}

          {!selectedChannel ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                opacity: 0.9,
              }}
            >
              <Typography variant="h6">Select a channel to begin messaging.</Typography>
            </Box>
          ) : messages?.length > 0 ? (
            messages.map((message) => {
              const formattedDate = new Date(message.createdAt).toLocaleString([], {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <Box
                  key={message._id}
                  sx={{
                    mb: 2,
                    maxWidth: "820px",
                  }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      bgcolor: "rgba(255,255,255,0.10)",
                      color: "white",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.75 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {message.sender?.username || "User"}
                      </Typography>

                      <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        {formattedDate}
                      </Typography>
                    </Box>

                    <Typography variant="body1">{message.content}</Typography>
                  </Paper>
                </Box>
              );
            })
          ) : (
            <Typography>No messages yet.</Typography>
          )}
        </Box>

        {/* Message Input */}
        <Paper
          elevation={4}
          sx={{
            bgcolor: "rgba(15,23,42,0.72)",
            borderRadius: 3,
            p: 2,
            backdropFilter: "blur(8px)",
          }}
        >
          <Box component="form" onSubmit={handleSendMessage} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              type="text"
              id="content"
              name="content"
              placeholder={selectedChannel ? "Type your message..." : "Select a channel first"}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              disabled={!selectedChannel}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "white",
                  borderRadius: 2,
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading || !selectedChannel}
              sx={{
                px: 3,
                py: 1.6,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                minWidth: 140,
              }}
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Home;

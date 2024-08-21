import { Alert, Box, IconButton, LinearProgress } from "@mui/material";
import { useChat } from "../hooks/useChatState";
import { ChatItem } from "../components/ChatItem";
import { ChatFooter } from "../components/ChatFooter";
import CloseIcon from "@mui/icons-material/Close";

export const ChatPage = () => {
  const {
    chats,
    isLoading,
    showErrorAlert,
    inputText,
    handleSend,
    setShowErrorAlert,
    setInputText,
  } = useChat();

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      alignItems="center"
    >
      <Box display="flex" flexDirection="column" width="800px" flexGrow={1}>
        <Box
          display="flex"
          flexDirection="column"
          gap="32px"
          padding="16px 16px 160px 16px"
          overflow="auto"
          flexGrow={1}
        >
          {showErrorAlert && (
            <Box
              position="fixed"
              maxWidth="800px"
              width="100%"
              minWidth="400px"
            >
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setShowErrorAlert(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {"回答の生成に失敗しました。"}
              </Alert>
            </Box>
          )}
          {chats.map((chat, index) => (
            <ChatItem key={index} chat={chat} />
          ))}
          {isLoading && (
            <LinearProgress
              sx={{
                height: "8px",
                borderRadius: "8px",
                "& .MuiLinearProgress-bar": {
                  borderRadius: "8px",
                },
              }}
            />
          )}
        </Box>
        <ChatFooter
          inputText={inputText}
          handleSend={handleSend}
          onChangeField={(event) => setInputText(event.target.value)}
        />
      </Box>
    </Box>
  );
};

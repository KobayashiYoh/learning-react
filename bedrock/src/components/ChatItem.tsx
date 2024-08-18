import Box from "@mui/material/Box";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Chat } from "../types/chat";
import styled from "styled-components";
import { CopyIconButton } from "./CopyIconButton";

const ChatItemWrapper = styled(Box)<ChatItemProp>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: ${({ chat }) => (chat.isUser ? "flex-end" : "flex-start")};
`;

const MessageWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Bubble = styled(Box)<ChatItemProp>`
  border-radius: 32px;
  padding: 12px 16px;
  background: ${({ chat }) => (chat.isUser ? "#DDDDDD" : "#349680")};
  color: ${({ chat }) => (chat.isUser ? "#333333" : "#FFFFFF")};
`;

interface ChatItemProp {
  chat: Chat;
}

export const ChatItem = ({ chat }: ChatItemProp) => {
  return (
    <ChatItemWrapper chat={chat}>
      <Box minWidth="48px" marginRight="16px">
        {!chat.isUser && <SupportAgentIcon sx={{ fontSize: 48 }} />}
      </Box>
      <MessageWrapper>
        <Bubble chat={chat}>{chat.message}</Bubble>
        {!chat.isUser && <CopyIconButton text={chat.message} />}
      </MessageWrapper>
    </ChatItemWrapper>
  );
};

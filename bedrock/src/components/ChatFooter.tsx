import { Box, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import styled from "styled-components";

interface ChatFooterProps {
  inputText: string;
  onChangeField?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  handleSend?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const FooterBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 16px 16px 16px;
  background-color: #ffffff;
`;

const InputArea = styled(Box)`
  display: flex;
  align-items: flex-end;
  max-width: 800px;
  width: 100%;
  min-width: 400px;
  border-radius: 32px;
  padding: 0 8px;
  background-color: #f5f5f5;
`;

export const ChatFooter = ({
  inputText,
  onChangeField,
  handleSend,
}: ChatFooterProps) => {
  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    const isExecutedSendTrigger =
      (event.metaKey || event.ctrlKey) && event.key === "Enter";
    if (!isExecutedSendTrigger) {
      return;
    }
    event.preventDefault();
    if (handleSend) {
      handleSend!({} as React.MouseEvent<HTMLButtonElement>);
    }
  };

  const isMacOS = navigator.platform.toUpperCase().indexOf("MAC") >= 0;

  return (
    <FooterBox>
      <InputArea>
        <TextField
          fullWidth
          placeholder="ここにテキストを入力してください"
          variant="outlined"
          value={inputText}
          onChange={onChangeField}
          onKeyDown={handleKeyDown}
          multiline
          minRows={1}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
              "&.Mui-focused fieldset": {
                border: "none",
              },
            },
          }}
        />
        <Tooltip
          title={isMacOS ? "command + Enterで送信" : "control + Enterで送信"}
          arrow
        >
          <IconButton
            onClick={handleSend}
            color="primary"
            sx={{ marginBottom: "8px", marginRight: "0px" }}
          >
            <SendIcon />
          </IconButton>
        </Tooltip>
      </InputArea>
      <Typography
        variant="body2"
        sx={{ fontSize: "12px", marginTop: "8px", textAlign: "center" }}
      >
        AIが生成した回答は100%正しいとは限りません。生成された回答を十分にご確認ください。
      </Typography>
    </FooterBox>
  );
};

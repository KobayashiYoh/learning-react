import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface CopyIconButtonProp {
  text: string;
}

export const CopyIconButton = ({ text }: CopyIconButtonProp) => {
  const [showTooltip, setTooltip] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setTooltip(true);
    setTimeout(() => setTooltip(false), 2000); // ツールチップを2秒間表示
  };

  return (
    <Tooltip title="コピーしました" open={showTooltip} arrow placement="bottom">
      <IconButton onClick={handleCopy}>
        <ContentCopyIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Tooltip>
  );
};

import { TextField } from "@mui/material";
import React from "react";

interface SingleDigitCodeFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void; // onKeyDownを追加
  ref?: React.Ref<HTMLInputElement>;
}

export const SingleDigitCodeField = React.forwardRef<
  HTMLInputElement,
  SingleDigitCodeFieldProps
>(({ value, onChange, onKeyDown }, ref) => {
  return (
    <TextField
      variant="outlined"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown} // ここでonKeyDownを使用
      inputProps={{
        maxLength: 1,
        pattern: "\\d*",
      }}
      inputRef={ref} // refをinputRefに渡す
    />
  );
});

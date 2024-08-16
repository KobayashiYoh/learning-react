import { TextField } from "@mui/material";
import React from "react";

interface SingleDigitCodeFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
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
      onKeyDown={onKeyDown}
      inputProps={{
        maxLength: 1,
        pattern: "\\d*",
      }}
      inputRef={ref}
      sx={{
        width: '56px',
        height: '64px',
        textAlign: 'center',
        '& input': {
          textAlign: 'center',
          fontSize: '24px',
        },
      }}
    />
  );
});

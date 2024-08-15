import React, { forwardRef } from "react";
import { TextField } from "@mui/material";

interface SingleDigitCodeFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  index: number; // index を追加していることを確認
}

const SingleDigitCodeField = forwardRef<
  HTMLInputElement,
  SingleDigitCodeFieldProps
>(({ value, onChange }, ref) => {
  return (
    <TextField
      variant="outlined"
      value={value}
      onChange={onChange}
      inputProps={{
        maxLength: 1,
        pattern: "\\d*", // 数字のみを許可
      }}
      inputRef={ref} // inputRef を設定
    />
  );
});

SingleDigitCodeField.displayName = "SingleDigitCodeField";

export { SingleDigitCodeField };

import { TextField, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

interface PasswordTextFieldProps {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordTextField = ({
  id,
  value,
  onChange,
}: PasswordTextFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      id={id}
      variant="outlined"
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

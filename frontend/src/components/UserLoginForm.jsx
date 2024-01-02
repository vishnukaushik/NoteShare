import { Button, IconButton, TextField, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

const PasswordVisibility = ({ showPassword, handlePasswordVisibility }) => {
  return (
    <IconButton onClick={handlePasswordVisibility}>
      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
    </IconButton>
  );
};

export default function UserLoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div
      style={{
        padding: "10px",
        width: "50vw",
        height: "50vh",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5">User Login</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 10,
          margin: 30,
          width: "80%",
        }}
      >
        <TextField
          required
          label="username"
          size="small"
          sx={{
            margin: 1,
          }}
          InputProps={{
            startAdornment: (
              <AccountCircle
                style={{
                  marginRight: 10,
                }}
              />
            ),
          }}
        />
        <TextField
          required
          type={showPassword ? "text" : "password"}
          label="Password"
          size="small"
          sx={{
            margin: 1,
          }}
          InputProps={{
            startAdornment: (
              <PasswordIcon
                style={{
                  marginRight: 10,
                }}
              />
            ),
            endAdornment: (
              <PasswordVisibility
                showPassword={showPassword}
                handlePasswordVisibility={handlePasswordVisibility}
              />
            ),
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="text"
            size="small"
            style={{
              fontSize: "0.7rem",
            }}
          >
            forgot password?
          </Button>
          <Button
            variant="contained"
            sx={{
              alignSelf: "flex-end",
              width: "auto",
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

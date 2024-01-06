import { Button, IconButton, TextField, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import axios from "axios";
import ErrorNotification from "./ErrorNotification";
import { useNavigate } from "react-router-dom";

const PasswordVisibility = ({ showPassword, handlePasswordVisibility }) => {
  return (
    <IconButton onClick={handlePasswordVisibility}>
      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
    </IconButton>
  );
};

export default function UserLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleUserLogin = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/auth/signin", { username, password })
      .then((result) => {
        const token = result.data.token;
        localStorage.setItem("token", token);
        console.log(`request sent SUCCESSFULLY: `, result.data.token);
        navigate("/todos");
      })
      .catch((err) => {
        console.error(`request sent but FAILED: ${err}`);
        localStorage.setItem("token", null);
        setError("Invalid username or password!");
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
    setUsername("");
    setPassword("");
  };

  const handleForgotPassword = () => {
    // TODO: handle forgot password
    console.log("TODO: handle forgot password");
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
      {error && <ErrorNotification error={error} setError={setError} />}
      <form onSubmit={handleUserLogin}>
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
            value={username}
            label="username"
            size="small"
            sx={{
              margin: 1,
            }}
            onChange={(e) => setUsername(e.target.value)}
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
            value={password}
            type={showPassword ? "text" : "password"}
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
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
              onClick={handleForgotPassword}
              style={{
                fontSize: "12px",
              }}
            >
              forgot password?
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{
                alignSelf: "flex-end",
                width: "auto",
                fontSize: "12px",
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

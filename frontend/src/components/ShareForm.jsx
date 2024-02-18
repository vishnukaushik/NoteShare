import { Error } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import ErrorNotification from "./ErrorNotification";
import { useState } from "react";

const ShareForm = ({ handleCancel, handleShare }) => {
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);
  return (
    <form
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          width: "inherits",
          height: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Typography>Share with:</Typography>
        <TextField
          inputProps={{
            style: {
              padding: "5px",
              fontSize: "1rem",
            },
          }}
          style={{
            padding: "0px",
          }}
          label="username"
          variant="outlined"
        />
      </div>
      {error && <ErrorNotification error={error} />}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Button onClick={handleCancel}>cancel</Button>
        <Button variant="contained" onClick={handleShare}>
          share
        </Button>
      </div>
    </form>
  );
};

export default ShareForm;

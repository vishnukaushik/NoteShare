import { Typography } from "@mui/material";

const ErrorNotification = ({ error }) => {
  if (error)
    return (
      <Typography
        style={{
          color: "red",
        }}
      >
        {error}
      </Typography>
    );
  return null;
};

export default ErrorNotification;

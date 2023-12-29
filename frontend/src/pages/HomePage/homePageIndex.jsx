import { Card, CardContent, Input, TextField, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <>
      <Card
        raised="true"
        sx={{
          width: "80vw",
          height: "80vh",
          padding: "10px",
        }}
      >
        <CardContent
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: "50vw",
            }}
          >
            <h4>There will be a image</h4>
          </div>
          <div
            style={{
              padding: "10px",
              width: "50vw",
              height: "50vh",
              alignItems: "center",
              //   display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography align="left" variant="h5">
              Welcome back!
            </Typography>
            <Typography align="left">Login</Typography>
            <Input required placeholder="username" label="username" />
            <Input required placeholder="password" label="password" />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

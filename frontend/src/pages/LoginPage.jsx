import { Card, CardContent } from "@mui/material";
import UserLoginForm from "../components/UserLoginForm";

export default function LoginPage() {
  return (
    <Card
      sx={{
        width: "100%",
        height: "50%",
        padding: "10px",
        margin: "50px",
      }}
    >
      <CardContent
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            width: "50%",
          }}
        >
          <img src="../assets/notesLogo.png" width="70%" height="auto" />
          <h4
            style={{
              margin: "auto",
              fontSize: "3rem",
            }}
          >
            Notes App
          </h4>
        </div>
        <UserLoginForm />
      </CardContent>
    </Card>
  );
}

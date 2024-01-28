import { Card, CardContent } from "@mui/material";
import UserLoginForm from "../components/UserLoginForm";

export default function LoginPage() {
  return (
    <Card
      sx={{
        width: "100%",
        height: "50%",
        padding: "5%",
        margin: "5%",
      }}
    >
      <CardContent
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            margin: "auto",
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            // border: "solid black",
          }}
        >
          <img
            src="../assets/notesLogo.png"
            width="50%"
            height="auto"
            style={{
              // border: "solid black",
              margin: "2%",
            }}
          />
          <h4
            style={{
              margin: "auto",
              fontSize: "200%",
              // border: "solid black",
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

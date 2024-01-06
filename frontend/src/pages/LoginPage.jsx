import { Card, CardContent } from "@mui/material";
import UserLoginForm from "../components/UserLoginForm";

export default function LoginPage() {
  return (
    <>
      <Card
        sx={{
          width: "auto",
          height: "auto",
          padding: "10px",
          margin: "auto",
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
            <h4>There will be an image</h4>
          </div>
          <UserLoginForm />
        </CardContent>
      </Card>
    </>
  );
}

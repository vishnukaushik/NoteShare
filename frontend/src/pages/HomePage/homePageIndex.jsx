import { Card, CardContent } from "@mui/material";
import UserLoginForm from "../../components/UserLoginForm";

export default function HomePage() {
  return (
    <>
      <Card
        sx={{
          width: "60vw",
          height: "60vh",
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
            <h4>There will be an image</h4>
          </div>
          <UserLoginForm />
        </CardContent>
      </Card>
    </>
  );
}

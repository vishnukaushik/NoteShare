import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export function ButtonAppBar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
          <Typography variant="h6" align="left">
            Todo Application
          </Typography>
        </div>
        <div>
          <Button color="inherit">Login</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
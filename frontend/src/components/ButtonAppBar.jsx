import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export function ButtonAppBar({ style }) {
  return (
    <AppBar style={{ ...style }}>
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
          <Typography variant="h6" align="left">
            Todo Application
          </Typography>
        </div>
        <div>
          <Button color="inherit">Logout</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
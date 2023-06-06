import { useState, useCallback } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

import UserService from "../services/users";

const LoginDialog = ({onComplete}) => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toggle = () => {
    setOpen(!open);
  };

  const login = useCallback( async (event) => {
    event.preventDefault();

    try {
      const user = await UserService.login(username, password);
      UserService.setToken(user.token);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setOpen(!open)
      onComplete(user)
    } catch (exception) {
      console.log(exception);
    }
  }, [onComplete, open, password, username]);

  return (
    <div>
      <Button variant="contained" sx={{backgroundColor: 'lightcoral'}} className="login" onClick={toggle}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Login
        </Typography>
      </Button>
      <Dialog open={open} onClose={toggle}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your credentials:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            fullWidth
            variant="standard"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={login}>Login</Button>
          <Button onClick={toggle}>Cancel</Button>
          <Button onClick={toggle}>Don't have an account? Sign up</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginDialog;

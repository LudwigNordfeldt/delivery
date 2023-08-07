import "./App.css";

import { useState, useEffect } from "react"
import UserService from "./services/users"

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Box, Divider, Toolbar, Typography } from "@mui/material";

import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Cart from "./pages/cart";
import Shop from "./pages/shop";
import History from "./pages/history";
import Map from "./components/map";
import Coupons from "./pages/coupons";

import LoginDialog from "./components/login"
import RegisterDialog from "./components/register"
import LogOut from "./components/logOut"

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      UserService.setToken(user.token)
    }
  }, [])
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/">
              <div className="nav">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Shop
                </Typography>
                <StoreIcon />
              </div>
            </Link>

            <Divider orientation="vertical" flexItem sx={{backgroundColor:'black'}}></Divider>

            <Link to="/cart">
              <div className="nav">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Shopping cart
                </Typography>
                <ShoppingCartIcon />
              </div>
            </Link>

            <Divider orientation="vertical" flexItem sx={{backgroundColor:'black'}}></Divider>

            <Link to="/history">
              <div className="nav">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Order History
                </Typography>
                <ShoppingCartIcon />
              </div>
            </Link>

            <Divider orientation="vertical" flexItem sx={{backgroundColor:'black'}}></Divider>

            <Link to="/map">
              <div className="nav">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Map
                </Typography>
                <ShoppingCartIcon />
              </div>
            </Link>

            <Divider orientation="vertical" flexItem sx={{backgroundColor:'black'}}></Divider>

            <Link to="/coupons">
              <div className="nav">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Coupons
                </Typography>
                <ShoppingCartIcon />
              </div>
            </Link>

            {console.log(user)}
            {user ? <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>{user.username}</Typography> : <LoginDialog onComplete={setUser}></LoginDialog>}
            {user ? <LogOut onComplete={setUser}> </LogOut> : <RegisterDialog></RegisterDialog>}
          </Toolbar>
        </AppBar>
      </Box>

      <Routes>
        <Route path="/" element={<Shop/>}></Route>
        <Route path="/cart" element={<Cart user={user}/>}></Route>
        <Route path="/history" element={<History user={user}/>}></Route>
        <Route path="/map" element={<Map/>}></Route>
        <Route path="/coupons" element={<Coupons/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;

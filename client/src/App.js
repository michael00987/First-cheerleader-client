import React, { useState } from 'react';
// import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Login from './components/Login';
import Signup from './components/Signup';
import GetMsg from './components/GetMsg';
import SendMsg from './components/SendMsg';
// import axios from 'axios';

// material-ui/style
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const [isLogin, setIsLogin] = useState(false);
  function handleIsLogin() {
    setIsLogin(true);
  }

  const classes = useStyles();
  return (
    <div className="App">
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Menu
            </Typography>
            <Button color="inherit">Log out</Button>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
      <Switch>
        <Route
          exact
          path="/login"
          render={() => (
            <Login isLogin={isLogin} handleIsLogin={() => handleIsLogin} />
          )}
        />
        <Route
          exact
          path="/signup"
          render={() => (
            <Signup isLogin={isLogin} handleIsLogin={() => handleIsLogin} />
          )}
        />
        <Route
          exact
          path="/getmsg"
          render={() => (
            <GetMsg isLogin={isLogin} handleIsLogin={() => handleIsLogin} />
          )}
        />
        <Route
          exact
          path="/sendmsg"
          render={() => (
            <SendMsg isLogin={isLogin} handleIsLogin={() => handleIsLogin} />
          )}
        />
        <Route
          path="/"
          render={() => {
            if (isLogin) {
              return <Redirect to="/getmsg" />;
            }
            return <Redirect to="/login" />;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;

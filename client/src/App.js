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
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
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
  const [modal, setModal] = useState(false);

  function handleIsLogin() {
    console.log('aa');
    setIsLogin(true);
  }

  function handleOpenModal() {
    setModal(true);
  }
  function handleCloseModal() {
    setModal(false);
  }
  function UserInfo() {
    if (isLogin) {
      return (
        <div>
          <DialogTitle>사용자 정보</DialogTitle>
          <DialogContent>
            <span>이름 :</span>
            <span>김 삿갓</span>
            <br />
            <span>Email :</span>
            <span>김 삿갓@satgat.com</span>
            <br />
            <Button>정보 수정</Button>
            <Button
              onClick={() => {
                alert('진짜루?');
              }}
            >
              회원 탈퇴
            </Button>
          </DialogContent>
        </div>
      );
    } else {
      return <DialogTitle>로그인</DialogTitle>;
    }
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
              onClick={handleOpenModal}
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
      <div className="모달창">
        <Dialog open={modal} onClose={handleCloseModal}>
          <UserInfo />
        </Dialog>
      </div>
      <Switch>
        <Route
          exact
          path="/login"
          render={() => (
            <Login isLogin={isLogin} handleIsLogin={handleIsLogin} />
          )}
        />
        <Route
          exact
          path="/signup"
          render={() => <Signup isLogin={isLogin} />}
        />
        <Route
          exact
          path="/getmsg"
          render={() => <GetMsg isLogin={isLogin} />}
        />
        <Route
          exact
          path="/sendmsg"
          render={() => <SendMsg isLogin={isLogin} />}
        />
        <Route
          path="/"
          render={() => {
            if (isLogin) {
              console.log('?????');
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

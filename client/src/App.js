import React, { useState, useEffect } from 'react';
// import './App.css';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

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
import axios from 'axios';

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

function App({ history }) {
  const [isLogin, setIsLogin] = useState(false);
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

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

  function handleSignout() {
    setIsLogin(false);
    axios({
      method: 'post',
      url: 'http://15.164.164.204:4000/user/withDrawal',
    });
  }

  function handleLogout() {
    axios({
      method: 'post',
      url: 'http://15.164.164.204:4000/user/logout',
    });
  }

  useEffect(() => {
    if (window.sessionStorage.getItem('email')) {
      // 새션에 있는지 확인하고 있으면 로그인 상태로 바꾸고 루트로 보냄 ==> 루트로 보내도 getmsg로 이동함
      handleIsLogin();
      history.push('/');
    }
    axios({
      method: 'get',
      url: 'http://15.164.164.204:4000/user/info',
    }).then(res => {
      setEmail(res.data.email);
      setUsername(res.data.username);
    });
  }, []);

  function UserInfo() {
    if (isLogin) {
      return (
        <div>
          <DialogTitle>사용자 정보</DialogTitle>
          <DialogContent>
            <span>이름 :</span>
            <span>{username}</span>
            <br />
            <span>Email :</span>
            <span>{email}</span>
            <br />
            <Button>정보 수정</Button>
            <Button
              onClick={() => {
                handleSignout();
                history.push('/');
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
            <Button
              color="inherit"
              onClick={() => {
                handleLogout(); // 로그아웃을 누르려면 모달이 비활성화 되야하기때문에 modalClose는 필요없음
                window.sessionStorage.setItem('email', null); // 저장된 세션스토리지를 비우고 로그인으로 이동
                setIsLogin(false);
                history.push('/');
              }}
            >
              Log out
            </Button>
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
        <Route path="/getmsg" render={() => <GetMsg isLogin={isLogin} />} />
        <Route path="/sendmsg" render={() => <SendMsg isLogin={isLogin} />} />
        <Route
          path="/"
          render={() => {
            if (isLogin) {
              // console.log('?????');
              return <Redirect to="/getmsg" />;
            }
            return <Redirect to="/login" />;
          }}
        />
      </Switch>
    </div>
  );
}

export default withRouter(App);

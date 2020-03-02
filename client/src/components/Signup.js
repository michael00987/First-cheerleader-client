import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import { grey } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'; // *** 제일 마지막에 import 해야 적용됨

axios.defaults.withCredentials = true;

// material-ui/style
const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage:
      'url(https://source.unsplash.com/user/hy0212/likes/800x700)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  hidden: {
    display: 'none',
  },
}));

// Signup
function Signup({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setConfirm] = useState('');
  const [username, setUsername] = useState('');

  /*************************** 인풋 관리 ****************************/
  function handleInputEmail(e) {
    setEmail(e.target.value);
  }

  function handleInputPassword(e) {
    setPassword(e.target.value);
  }

  function handleInputConfirm(e) {
    setConfirm(e.target.value);
  }

  function handleInputUsername(e) {
    setUsername(e.target.value);
  }

  function handleInputReset(e) {
    // 페이지 리로딩 방지
    e.preventDefault();
    // 상태 초기화
    setEmail('');
    setPassword('');
    setConfirm('');
    setUsername('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'http://15.164.164.204:4000/user/signup',
      data: {
        email: email,
        password: password,
        username: username,
      },
    })
      .then(res => {
        alert(res.data.id + '번째 회원님 환영합니다');
        history.push('/login');
      })
      .catch(err => console.log(err));
  }

  /*************************** 패스워드 일치 ****************************/

  function doesPasswordMatch() {
    return password === passwordConfirm;
  }

  function passwordConf() {
    if (passwordConfirm) {
      return this.doesPasswordMatch() ? 'is-valid' : 'is-invalid';
    }
  }

  function renderFeedbackMessage() {
    if (passwordConf) {
      if (!doesPasswordMatch()) {
        return (
          <div className="invalid-feedback">패스워드가 일치하지 않습니다</div>
        );
      }
    }
  }
  /*********************************************************************/
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleInputEmail}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={handleInputPassword}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="passwordConfirm"
              name="passwordConfirm"
              label="PasswordConfirm"
              type="password"
              autoComplete="current-password"
              value={passwordConfirm}
              onChange={handleInputConfirm}
            />
            <div className="feedback">{renderFeedbackMessage()}</div>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              name="username"
              label="Username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={handleInputUsername}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box
                  mt={1}
                  color="primary.main"
                  component="span"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Button onClick={() => history.push('/login')}>취소</Button>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box
                  mt={1}
                  color="primary.main"
                  component="span"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Button onClick={handleInputReset}>다시 작성</Button>
                  {/*}
                  <Button
                    type="submit"
                    // fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    value="다시 작성"
                    onClick={handleInputReset}
                  >
                    다시 작성
                  </Button>
                 */}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    value="Sign Up"
                    onClick={
                      // alert('회원가입 성공')
                      handleSubmit
                    }
                  >
                    Sign Up
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default withRouter(Signup);

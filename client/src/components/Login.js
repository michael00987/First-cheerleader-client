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

import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

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
}));

// Login
function Login({ handleIsLogin, history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function handleInputEmail(e) {
    setEmail(e.target.value);
  }
  function handleInputPassword(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'http://15.164.164.204:4000/user/signin',
      data: {
        email: email,
        password: password,
      },
    })
      .then(() => {
        console.log('post 요청');
        handleIsLogin();
        history.push('/getmsg');
      })
      .catch(err => console.log(err));
  }

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
            Sign in
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
            {/*<FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
          />*/}

            <Grid container spacing={2}>
              <Grid item xs>
                <Box color="primary.main" component="span" pt={10}>
                  <Button fullWidth onClick={() => history.push('/signup')}>
                    아직 가입하지 않으셨나요?
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs>
                <Box component="span" mx="auto">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    value="Sign In"
                    onClick={() => {
                      alert('로그인 성공');
                      handleSubmit();
                    }}
                  >
                    Sign In
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs>
                <div className="social_login">
                  <Box
                    m="auto"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Button>
                      <TwitterIcon color="primary" />
                    </Button>

                    <Button>
                      <FacebookIcon color="primary" />
                    </Button>

                    <Button>
                      <InstagramIcon color="primary" />
                    </Button>
                  </Box>
                </div>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default withRouter(Login);

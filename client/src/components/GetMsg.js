import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { BottomNavigation } from '@material-ui/core';
import { BottomNavigationAction } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';

axios.defaults.withCredentials = true;

// material-ui/style
const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  root: {
    width: 300,
    height: 300,
  },

  cardHeader: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[700]
        : theme.palette.grey[200],
  },
  cardContent: {
    display: 'block', // 한 줄 차지
    width: '30vw',
    height: '50vw',
  },
  cardAction: {},
  bottom: {
    display: 'flex',
    justifyContent: 'center',
    height: 50,
    // backgroundColor: theme.palette.background.paper,
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#388e3c',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});

// GetMsg
function GetMsg({ isLogin, history }) {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://15.164.164.204:4000/message/getMessage',
    }).then(res => {
      setText(res.data.data.inputText);
      setDate(res.data.data.createdAt);
    });
  }, []);
  // }, [text]);

  // 뒤로가기
  function handleBack() {
    history.goBack();
  }

  const classes = useStyles();
  if (!isLogin) {
    return (
      <div>
        <div
          style={{
            fontSize: 50,
            fontWeight: 'bold',
            // color: 'red',
            textAlign: 'center',
            margin: '50px',
          }}
        >
          Not Found
        </div>

        <div>
          <IconButton style={{ align: 'center' }}>
            <LockOutlinedIcon onClick={handleBack} size="large" />
          </IconButton>
        </div>
      </div>
    );
  } else {
    return (
      <div className="getMsg">
        <CssBaseline />
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-start">
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  titleTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                  title="Message Page"
                  action={
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  }
                ></CardHeader>

                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    align="center"
                    justify="center"
                    alignItems="center" // *** align center>
                  >
                    <div className={classes.cardContent} variant="outlined">
                      <Grid item xs={12}>
                        <Box
                          m="auto"
                          name="contents"
                          style={{ fontSize: '20pt' }}
                        >
                          {text}
                        </Box>
                        <Box
                          m="auto"
                          name="contents"
                          style={{
                            fontSize: 15,
                            fontStyle: 'italic',
                            float: 'right',
                            padding: '20px',
                          }}
                        >
                          {date.slice(0, 10)}
                        </Box>
                      </Grid>
                    </div>
                  </Grid>
                </CardContent>

                <Grid item xs={12}>
                  <CardActions className={classes.cardAction}>
                    <ThemeProvider theme={theme}>
                      <Button
                        color="primary"
                        type="submit"
                        fullWidth
                        value="응원메세지 작성하러 가기"
                        style={{ fontSize: '17px' }}
                        onClick={() => history.push('/sendmsg')}
                      >
                        응원메세지 작성하러 가기
                      </Button>
                    </ThemeProvider>
                  </CardActions>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <BottomNavigation showLabels className={classes.bottom}>
              <BottomNavigationAction
                value="favorites"
                icon={<FavoriteIcon />}
              />
            </BottomNavigation>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(GetMsg);

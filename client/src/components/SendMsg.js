import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Textfield from '@material-ui/core/Textfield';
import { BottomNavigation } from '@material-ui/core';
import { BottomNavigationAction } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
// import Box from '@material-ui/core/Box';
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
    /*
    display: 'flex',
    justifyContent: 'center',
    height: 56,
    backgroundColor: theme.palette.background.paper, */
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[700]
        : theme.palette.grey[200],
  },
  cardContent: {
    display: 'block', // 한 줄 차지
    width: '100vw',
    height: '60vw',
    // fontSize: '20pt',
  },
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

// SendMsg
function SendMsg({ history }) {
  const [value, setValue] = useState('');
  const [countText, setCount] = useState(0);

  /*********************인풋 관리 *****************************/
  function handleInputValue(e) {
    if (e.target.value.length <= 150) {
      setValue(e.target.value);
      setCount(e.target.value.length);
    }
  }

  function handleSubmit() {
    // e.preventDefault();
    axios({
      method: 'post',
      url: 'http://15.164.164.204:4000/message/sendMessage',
      data: {
        inputText: value,
      },
    }).then(res => {
      if (res.data.id) {
        history.push('/getMsg');
      } else {
        alert('중복되는 메세지가 있습니다.');
      }
    });
  }

  // 뒤로가기
  function handleBack() {
    history.goBack();
  }
  /*************************************************/

  const classes = useStyles();
  return (
    <div className="sendMsg">
      <CssBaseline />
      <Container maxWidth="md" component="main">
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                titleTypographyProps={{ align: 'center' }}
                className={classes.cardHeader}
                title="Send Message Page"
                action={
                  <IconButton aria-label="back" size="small">
                    <ArrowBackIcon onClick={handleBack} />
                  </IconButton>
                }
              />

              <CardContent>
                <Grid
                  container
                  spacing={3}
                  align="center"
                  justify="center"
                  alignItems="center" // *** align center>
                >
                  <div className={classes.cardContent}>
                    {/* variant="outlined" */}
                    <Grid item xs={12}>
                      <Textfield
                        m="auto"
                        fullWidth
                        name="contents"
                        multiline
                        rows="25"
                        area-label="응원 메세지를 입력하세요"
                        variant="outlined"
                        onChange={handleInputValue}
                      >
                        {value}
                      </Textfield>

                      <div className="countText" style={{ fontSize: '11pt' }}>
                        <span className="currCount">{countText}</span>
                        <span>/</span>
                        <span className="MaxCount">최대 150자</span>
                      </div>
                    </Grid>
                  </div>
                </Grid>
              </CardContent>

              <CardActions>
                <ThemeProvider theme={theme}>
                  <Button
                    color="primary"
                    type="submit"
                    fullWidth
                    value="응원메세지 작성"
                    style={{ fontSize: '17px' }}
                    onClick={
                      handleSubmit
                      //   () => {
                      //   if (value.length > 0) {
                      //     handleSubmit();
                      //     console.log('메세지 전송');
                      //     // history.push('/getmsg');
                      //   } else {
                      //     console.log('빈칸 인데?');
                      //   }
                      // }
                    }
                  >
                    응원메세지 작성
                  </Button>
                </ThemeProvider>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Grid container spacing={5}>
        <Grid item xs={12}>
          <BottomNavigation className={classes.bottom}>
            <BottomNavigationAction value="favorites" icon={<FavoriteIcon />} />
          </BottomNavigation>
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(SendMsg);

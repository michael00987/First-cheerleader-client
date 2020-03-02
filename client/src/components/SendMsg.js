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
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

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
    display: 'flex',
    justifyContent: 'center',
    height: 56,
    backgroundColor: theme.palette.background.paper,
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[700]
        : theme.palette.grey[200],
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
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

  function handleSubmit(e) {
    // e.preventDefault();
    axios({
      method: 'post',
      url: 'http://15.164.164.204:4000/user/sendMessage',
      data: {
        value: value,
      },
    });
  }
  /*************************************************/

  const classes = useStyles();
  return (
    <div className="sendMsg">
      <CssBaseline />
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignitems="flex-end">
          <Grid item xs={12}>
            <Card>
              <CardHeader
                titleTypographyProps={{ align: 'center' }}
                className={classes.cardHeader}
                title="Send Message Page"
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
              />

              <CardContent>
                <Grid container spacing={3}>
                  <div className={classes.cardContent} variant="outlined">
                    <Grid item xs={12}>
                      <Typography
                        style={{ height: '50vh' }}
                        component="h1"
                        variant="h5"
                        color="textPrimary"
                      ></Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Textfield
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        name="contents"
                        value={value}
                        onChange={handleInputValue}
                      ></Textfield>
                      <div className="countText">
                        <span className="currCount">{countText}</span>
                        <span>/</span>
                        <span className="MaxCount">최대 150자</span>
                      </div>
                    </Grid>
                  </div>
                </Grid>
              </CardContent>

              <CardActions>
                <Button
                  color="primary"
                  type="submit"
                  fullWidth
                  value="응원메세지 작성"
                  onClick={() => {
                    if (value.length > 0) {
                      alert('메세지 전송');
                      handleSubmit();
                      history.push('/getmsg');
                    } else {
                      console.log('빈칸 인데?');
                    }
                  }}
                >
                  응원메세지 작성
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Grid container spacing={5}>
        <Grid item xs={12}>
          <BottomNavigation showLabels className={classes.bottom}>
            <BottomNavigationAction
              label=""
              value="favorites"
              icon={<FavoriteIcon />}
            />
          </BottomNavigation>
        </Grid>
      </Grid>
    </div>

    /*
    <div className="sendMessage">
      <div className="navigation">
        <div>
          <input className="to_CheerBtn" value="로그아웃" type="submit" />
        </div>
        <div className="title">메세지 보내기</div>
        <div>
          <input className="to_CheerBtn" value="나의정보" type="submit" />
        </div>
      </div>
      <div className="body">
        <div>
          <span className="header">응원하고 싶은 메세지를 입력하세요</span>
        </div>
        <div>
          <textarea
            name="text"
            type="text"
            placeholder="응원하고 싶은 메세지를 입력하세요"
            cols="70"
            rows="30"
            value={this.state.value}
            onChange={this.handleInputValue}
          />
          <div className="countText">
            <span className="currCount">{countText}</span>
            <span>/</span>
            <span className="MaxCount">최대 150자</span>
          </div>
        </div>
      </div>
      <div className="btns">
        <input
          className="sendBtn"
          type="submit"
          value="응원보내기"
          onClick={() => {
            if (value.length > 0) {
              alert('성공적을 전송하였습니다.');
              this.handleSubmit();
              history.push('/getmsg');
            } else {
              console.log('빈칸 인데?');
            }
          }}
        />
        <input
          className="backBtn"
          type="submit"
          value="돌아가기"
          onClick={() => {
            history.push('/getmsg');
          }}
        />
      </div>
        </div> */
  );
}

export default withRouter(SendMsg);

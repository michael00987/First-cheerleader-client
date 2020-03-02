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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
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

// GetMsg
function GetMsg({ history }) {
  const [text, setText] = useState('');

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://15.164.164.204:4000/message/getMessage',
    }).then(res => {
      console.log(res.data.data.inputText);
      setText(res.data.data.inputText);
    });
  }, []);
  // }, [text]);

  const classes = useStyles();
  return (
    <div className="getMsg">
      <CssBaseline />
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item xs={12}>
            {/* <Card className={classes.root} variant="outlined"> */}
            <Card>
              <CardHeader
                titleTypographyProps={{ align: 'center' }}
                className={classes.cardHeader}
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Message Page"
              ></CardHeader>

              <CardContent>
                <Grid container spacing={3}>
                  <div className={classes.cardContent}>
                    <Grid item xs={12}>
                      <Typography
                        // component="div"
                        style={{ height: '50vh' }}
                        component="h1"
                        variant="h5"
                        // color="textPrimary"
                      ></Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        name="contents"
                        value={text}
                      ></Box>
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
                  onClick={() => history.push('/sendmsg')}
                >
                  응원메세지 작성하러 가기
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
      {console.log('나는 리턴!!!!!')}
      {/*
      <div className="navigation">
        <div>
          <input className="to_CheerBtn" value="로그아웃" type="submit" />
        </div>
        <div className="title">Message Page</div>
        <div>
          <input className="to_CheerBtn" value="나의정보" type="submit" />
        </div>
      </div>
      <div className="body">
        <textarea
          className="contents"
          type="text"
          cols="70"
          rows="30"
          value={text}
        />
      </div>
      <div>
        <input
          className="to_CheerBtn"
          type="submit"
          value="응원메세지 작성하기"
          onClick={() => {
            history.push('/sendmsg');
          }}
        />
        {/* <Button variant="contained">응원 메세지 보내기</Button> 
      </div>*/}
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
  );
}

export default withRouter(GetMsg);

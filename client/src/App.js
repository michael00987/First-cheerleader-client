import React from 'react';
// import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import GetMsg from './components/GetMsg';
import SendMsg from './components/SendMsg';
// import axios from 'axios';

class App extends React.Component {
  state = {
    isLogin: false,
  };

  handleIsLogin() {
    this.setState({ isLogin: true });
  }

  render() {
    const { isLogin } = this.state;
    // console.log(isLogin);
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/login"
            render={() => (
              <Login
                isLogin={isLogin}
                handleIsLogin={this.handleIsLogin.bind(this)}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={() => (
              <Signup
                isLogin={isLogin}
                handleIsLogin={this.handleIsLogin.bind(this)}
              />
            )}
          />
          <Route
            exact
            path="/getmsg"
            render={() => (
              <GetMsg
                isLogin={isLogin}
                handleIsLogin={this.handleIsLogin.bind(this)}
              />
            )}
          />
          <Route
            exact
            path="/sendmsg"
            render={() => (
              <SendMsg
                isLogin={isLogin}
                handleIsLogin={this.handleIsLogin.bind(this)}
              />
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
}

export default App;

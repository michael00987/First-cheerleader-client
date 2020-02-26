import React from 'react';
// import './App.css';
import { Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import GetMsg from './components/GetMsg';
import SendMsg from './components/SendMsg';

class App extends React.Component {
  state = {
    isLogin: false,
  };

  render() {
    const { isLogin } = this.state;

    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/login"
            render={() => <Login isLogin={isLogin} />}
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
        </Switch>
      </div>
    );
  }
}

export default App;

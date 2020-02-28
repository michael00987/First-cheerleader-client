import React from 'react';
// import './App.css';
// import { Switch, Route } from 'react-router-dom';
import { withRouter, Link, useHistory } from 'react-router-dom';
import '../css/Signup.css';
import axios from 'axios';

axios.defaults.withCredentials = true;

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      username: '',
    };

    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleInputReset = this.handleInputReset.bind(this);
  }

  /*************************** 인풋 관리 ****************************/
  // 변수 값을 키로 사용
  // (ref: https://developer.mozilla.org/en-US/docs/Web/API/Event/target)
  handleInputValue = key => e => {
    this.setState({ [key]: e.target.value });
  };

  handleInputReset(e) {
    // 페이지 리로딩 방지
    e.preventDefault();
    // console.log('reset');
    // 상태 초기화
    this.setState({
      email: '',
      password: '',
      passwordConfirm: '',
      username: '',
    });
  }
  /*******************************************************************/

  /*************************** 패스워드 일치 ****************************/

  doesPasswordMatch() {
    const { password, passwordConfirm } = this.state;
    return password === passwordConfirm;
  }

  passwordConfirm() {
    const { passwordConfirm } = this.state;

    if (passwordConfirm) {
      return this.doesPasswordMatch() ? 'is-valid' : 'is-invalid';
    }
  }

  renderFeedbackMessage() {
    const { passwordConfirm } = this.state;

    if (passwordConfirm) {
      if (!this.doesPasswordMatch()) {
        return (
          <div className="invalid-feedback">패스워드가 일치하지 않습니다</div>
        );
      }
    }
  }
  /*********************************************************************/

  render() {
    const { email, password, passwordConfirm, username } = this.state;
    // const { handleIsLogin } = this.props;
    const { history } = this.props;
    // console.log('email: ', email);
    return (
      <div className="signup">
        <div>회원 가입</div>
        <div>
          <img src="https://source.unsplash.com/user/hy0212/likes/400x300" />
        </div>
        <div>
          <div className="title">
            <div>ID(e-mail):</div>
            <input
              className="input_contants"
              type="email"
              placeholder="이메일을 입력 하세요"
              onChange={this.handleInputValue('email')}
              value={email}
            />
          </div>

          <div className="title">
            <div>Password:</div>
            <input
              className="input_contants"
              type="password"
              placeholder="비밀번호를 입력 하세요"
              onChange={this.handleInputValue('password')}
              value={password}
            />
          </div>

          <div className="title">
            <div>Comfirm:</div>
            <input
              className="input_contants"
              type="password"
              placeholder="비밀번호를 다시 입력 하세요"
              onChange={this.handleInputValue('passwordConfirm')}
              value={passwordConfirm}
            />
            <div className="feedback">{this.renderFeedbackMessage()}</div>
          </div>

          <div className="title">
            <div>Username:</div>
            <input
              className="input_contants"
              placeholder="이름을 입력 하세요"
              onChange={this.handleInputValue('username')}
              value={username}
            />
          </div>

          <div>
            <div className="Buttens_frame">
              <input
                className="button"
                type="submit"
                value="취소"
                onClick={() => history.push('/login')}
              />
              <input
                className="button"
                type="submit"
                value="회원가입"
                onClick={e => {
                  e.preventDefault();
                  axios({
                    method: 'post',
                    url: 'http://15.164.164.204:4000/user/signup',
                    data: {
                      email: this.state.email,
                      username: this.state.username,
                      password: this.state.password,
                    },
                  })
                    .then(res => {
                      alert(res.data.id + '번째 회원님 환영합니다');
                      history.push('/getmsg');
                    })
                    .catch(err => console.log(err));
                }}
              />
              <input
                className="button"
                type="text/css"
                type="submit"
                value="다시작성"
                onClick={this.handleInputReset}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);

import React from 'react';
// import './App.css';
// import { Switch, Route } from 'react-router-dom';
import { withRouter, Link, useHistory } from 'react-router-dom';
import './Signup.css';

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
        <h1>회원 가입</h1>
        <form>
          <div>
            <img src="https://source.unsplash.com/user/hy0212/likes/400x300" />
          </div>
          <div>
            <div className="Signup_title">
              ID(e-mail):
              <input
                className="Signup_input_email"
                type="email"
                placeholder="이메일을 입력 하세요"
                onChange={this.handleInputValue('email')}
                value={email}
              />
            </div>

            <div className="Signup_title">
              Password:
              <input
                className="Signup_input_password"
                type="password"
                placeholder="비밀번호를 입력 하세요"
                onChange={this.handleInputValue('password')}
                value={password}
              />
            </div>

            <div className="Signup_title">
              Comfirm:
              <input
                className="Signup_input_passwordConfirm"
                type="password"
                placeholder="비밀번호를 다시 입력 하세요"
                onChange={this.handleInputValue('passwordConfirm')}
                value={passwordConfirm}
              />
              <div className="feedback">{this.renderFeedbackMessage()}</div>
            </div>

            <div className="Signup_title">
              Username:
              <input
                className="Signup_input_username"
                placeholder="이름을 입력 하세요"
                onChange={this.handleInputValue('username')}
                value={username}
              />
            </div>

            <div>
              {/*
              <Link to="/login">
                <button className="Signup_button">취소</button>
              </Link>
              <Link to="/">
                <button className="Signup_button">회원가입</button>
              </Link>*/}
              {/*<button className="Signup_button" onClick={this.handleInputReset}>
                다시작성
                </button> 
              {/*</Link>*/}
              <div className="Signup_frame">
                <span
                  className="Signup_button"
                  type="text/css"
                  onClick={() => history.push('/login')}
                >
                  취소
                </span>
                <span
                  className="Signup_button"
                  type="text/css"
                  onClick={() => history.push('/')}
                >
                  회원가입
                </span>
                <span
                  className="Signup_button"
                  type="text/css"
                  onClick={this.handleInputReset}
                >
                  다시 작성
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Signup);

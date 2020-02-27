import React from 'react';
import './Login.css';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div id="out">
        <div class="head">로그인</div>
        <div>
          <img src="https://source.unsplash.com/1600x900/?code" width="400px" />
        </div>
        <div class="이메일 비밀번호 입력 및 제출">
          <form>
            <div>
              이메일
              <input className="Login_input_email" placeholder="입력" />
            </div>
            <div>
              비밀번호
              <input className="Login_input_password" placeholder="입력" />
            </div>
            <div className="button_Frame">
              <span
                className="Signup_button"
                type="text"
                onClick={() => history.push('/signup')}
              >
                아직 회원가입을 하지 않으셨나요?
              </span>
            </div>
            <div className="button_Frame">
              <span className="Login_button" type="text/css">
                로그인
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);

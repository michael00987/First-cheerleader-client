import React from 'react';
// import './App.css';
// import { Switch, Route } from 'react-router-dom';
import { withRouter, Link, useHistory } from 'react-router-dom';
import './Signup.css';

class Signup extends React.Component {
  render() {
    return (
      <div className="signup">
        <h1>회원 가입</h1>
        <form>
          <div>
            <img src="https://source.unsplash.com/user/hy0212/likes/400x300" />
          </div>
          <div>
            <div>
              ID(e-mail):
              <input
                className="Signup_input_email"
                type="email"
                placeholder="이메일을 입력 하세요"
              ></input>
            </div>

            <div>
              Password:
              <input
                className="Signup_input_password"
                type="password"
                placeholder="비밀번호를 입력 하세요"
              ></input>
            </div>

            <div>
              Password comfirm:
              <input
                className="Signup_input_passwordConfirm"
                type="password"
                placeholder="비밀번호를 다시 입력 하세요"
              ></input>
            </div>

            <div>
              username:
              <input
                className="Signup_input_username"
                placeholder="이름을 입력 하세요"
              ></input>
            </div>

            <div>
              <button className="Signup_button">취소</button>
              <button className="Signup_button">회원가입</button>
              <button className="Signup_button">다시작성</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;

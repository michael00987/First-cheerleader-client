import React from 'react';
import './Login.css';

function Login() {
  return (
    <div id="out">
      <div class="head">로그인</div>
      <div>
        <img src="https://source.unsplash.com/1600x900/?code" width="400px" />
      </div>
      <div class="이메일 비밀번호 입력 및 제출">
        <form>
          이메일
          <input className="Login_input_email" placeholder="입력" />
          비밀번호
          <input className="Login_input_password" placeholder="입력" />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Login;

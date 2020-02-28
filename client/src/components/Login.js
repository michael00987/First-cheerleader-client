import React from 'react';
import '../css/Login.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }
  handleInputValue = key => e => {
    this.setState({ [key]: e.target.value });
  };

  render() {
    const { email, password } = this.state;
    const { history, handleIsLogin } = this.props;

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
              <input
                className="Login_input_email"
                placeholder="입력"
                onChange={this.handleInputValue('email')}
              />
            </div>
            <div>
              비밀번호
              <input
                className="Login_input_password"
                placeholder="입력"
                onChange={this.handleInputValue('password')}
              />
            </div>
            <div className="Login_button_Frame">
              <input
                className="Login_to_Signupbutton"
                type="submit"
                onClick={() => history.push('/signup')}
                value=" 아직 회원가입을 하지 않으셨나요?"
              />
            </div>
            <div className="button_Frame">
              <input
                type="submit"
                className="Login_button"
                type="submit"
                value="로그인"
                onClick={e => {
                  e.preventDefault();
                  return axios({
                    method: 'post',
                    url: 'http://15.164.164.204:4000/user/signin',
                    data: {
                      email: email,
                      password: password,
                    },
                  }).then(res => {
                    handleIsLogin();
                    history.push('/');
                    console.log(res);
                    console.log(res.data);
                  });
                  // .catch(err => console.log(err));
                }}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);

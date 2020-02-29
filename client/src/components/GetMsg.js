import React from 'react';
import { withRouter } from 'react-router-dom';
import '../css/GetMsg.css';
import axios from 'axios';

class GetMsg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://15.164.164.204:4000/message/getMessage',
    }).then(res => {
      console.log(this.props.isLogin);
      this.setState({
        text: res.data.data.inputText,
      });
    });
  }
  render() {
    const { history } = this.props;
    return (
      <div className="getMsg">
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
            className="contants"
            type="text"
            cols="70"
            rows="30"
            value={this.state.text}
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
          {/* <Button variant="contained">응원 메세지 보내기</Button> */}
        </div>
      </div>
    );
  }
}

export default withRouter(GetMsg);

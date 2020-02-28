import React from 'react';
import { withRouter, Link, useHistory } from 'react-router-dom';
import '../css/SendMsg.css';

class SendMsg extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      countText: 0,
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }
  /*********************인풋 관리 *****************************/
  handleInputValue(e) {
    if (e.target.value.length <= 150) {
      this.setState({
        value: e.target.value,
        countText: e.target.value.length,
      });
    }
  }
  /**********************************************************/

  render() {
    const { history } = this.props;
    const { value, countText } = this.state;
    console.log('value: ', value);
    return (
      <div className="sendMessage">
        <h1>메세지 보내기</h1>
        <div>
          <div>
            <span className="sendMsg_header">
              응원하고 싶은 메세지를 입력하세요
            </span>
          </div>
          <div>
            <textarea
              name="sendMsg_text"
              type="text"
              placeholder="응원하고 싶은 메세지를 입력하세요"
              cols="70"
              rows="30"
              value={this.state.value}
              onChange={this.handleInputValue}
            />
            <div className="sendMsg_countText">
              <span className="sendMsg_currCount">{countText}</span>
              <span>/</span>
              <span className="sendMsg_MaxCount">최대 150자</span>
            </div>
          </div>
          <div>
            <input
              className="sendMsg_sendBtn"
              type="submit"
              value="응원보내기"
              onClick={() => {
                if (value.length > 0) {
                  console.log('성공적을 전송하였습니다.');
                  history.push('/getmsg');
                } else {
                  console.log('빈칸은 인데?');
                }
              }}
            />
            <input
              className="sendMsg_back"
              type="submit"
              value="돌아가기"
              onClick={() => {
                history.push('/getmsg');
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SendMsg);

import React from 'react';
import { withRouter, Link, useHistory } from 'react-router-dom';
import './SendMsg.css';

class SendMsg extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }
  /*********************인풋 관리 *****************************/
  handleInputValue(e) {
    this.setState({
      value: e.target.value,
    });
  }
  /**********************************************************/

  render() {
    const { history } = this.props;
    const { value } = this.state;
    console.log('value: ', value);
    return (
      <div className="sendMessage">
        <h1>메세지 보내기</h1>
        <form>
          <div>
            <span className="sendMsg_header">
              응원하고 싶은 메세지를 입력하세요
            </span>
            <p>
              <textarea
                name="sendMsg_text"
                type="text"
                placeholder="메세지를 입력하세요"
                cols="70"
                rows="30"
                onChange={this.handleInputValue}
              >
                응원하고 싶은 메세지를 입력하세요
              </textarea>
            </p>

            <input
              className="sendMsg_sendBtn"
              type="submit"
              value="응원보내기"
              onClick={() => {
                history.push('/');
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
        </form>
      </div>
    );
  }
}

export default withRouter(SendMsg);

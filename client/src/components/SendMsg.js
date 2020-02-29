import React from 'react';
import { withRouter } from 'react-router-dom';
import '../css/SendMsg.css';
import axios from 'axios';

class SendMsg extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      countText: 0,
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit() {
    // e.preventDefault();
    axios({
      method: 'post',
      url: 'http://15.164.164.204:4000/user/sendMessage',
      data: {
        inputText: this.state.value,
      },
    });
    // console.log(res.data);
    /*
    this.setState({
      value: res.data.inputText,
    }); */
    // .catch(error => console.log(error));
  }
  /**********************************************************/

  render() {
    const { history } = this.props;
    const { value, countText } = this.state;
    // console.log('value: ', value);
    return (
      <div className="sendMessage">
        <div className="navigation">
          <div>
            <input className="to_CheerBtn" value="로그아웃" type="submit" />
          </div>
          <div className="title">메세지 보내기</div>
          <div>
            <input className="to_CheerBtn" value="나의정보" type="submit" />
          </div>
        </div>
        <div className="body">
          <div>
            <span className="header">응원하고 싶은 메세지를 입력하세요</span>
          </div>
          <div>
            <textarea
              name="text"
              type="text"
              placeholder="응원하고 싶은 메세지를 입력하세요"
              cols="70"
              rows="30"
              value={this.state.value}
              onChange={this.handleInputValue}
            />
            <div className="countText">
              <span className="currCount">{countText}</span>
              <span>/</span>
              <span className="MaxCount">최대 150자</span>
            </div>
          </div>
        </div>
        <div className="btns">
          <input
            className="sendBtn"
            type="submit"
            value="응원보내기"
            onClick={() => {
              if (value.length > 0) {
                alert('성공적을 전송하였습니다.');
                this.handleSubmit();
                history.push('/getmsg');
              } else {
                console.log('빈칸 인데?');
              }
            }}
          />
          <input
            className="backBtn"
            type="submit"
            value="돌아가기"
            onClick={() => {
              history.push('/getmsg');
            }}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(SendMsg);

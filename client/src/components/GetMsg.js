import React from 'react';
import { withRouter } from 'react-router-dom';
import '../css/GetMsg.css';

class GetMsg extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div id="out">
        {/* <div>
          <input
            className="GetMsg_to_CheerBtn"
            value="로그아웃"
            type="submit"
          />
        </div> */}
        <div className="GetMsg_title">Message Page</div>
        <div>
          <textarea
            className="GetMsg_contants"
            type="text"
            cols="70"
            rows="30"
            value="당신을 응원합니다."
          />
        </div>
        <div>
          <input
            className="GetMsg_to_CheerBtn"
            type="submit"
            value="응원메세지 작성하기"
            onClick={() => history.push('/sendmsg')}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(GetMsg);

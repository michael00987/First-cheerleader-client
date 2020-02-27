import React from 'react';
import { withRouter } from 'react-router-dom';
import './GetMsg.css';

class GetMsg extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div id="out">
        <div className="메세지 페이지">Message Page</div>
        <div>
          <input className="show_msg" type="text" value="당신을 응원합니다." />
        </div>
        <div>
          <input
            type="submit"
            value="응원메세지 작성하기"
            onClick={() => history.push('/login')}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(GetMsg);

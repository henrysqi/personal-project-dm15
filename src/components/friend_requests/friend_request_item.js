import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchUserById} from '../../actions/index';


class FriendRequestItem extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }

  componentWillMount() {
    this.props.fetchUserById(this.props.userid).then((res) => {
      this.setState({
        userinfo: res.payload.data[0]
      })
    })
  }

  render() {
    return (
      <div className="friend-request-item">
        <div id="friend-request-info">
          <img src="http://www.hayy.net/Content/img/custom/default-avatar.png" />
          <div id="friend-request-info-text">
            <h2>{this.state.userinfo ? this.state.userinfo.firstname : ''} {this.state.userinfo ? this.state.userinfo.lastname : ''}</h2>
            <h3>Some Description</h3>
          </div>
        </div>
        <div id="friend-request-buttons">
          <button onClick={() => {this.props.acceptFriend(this.props.elem.sender, this.props.elem.receiver)} } id="friend-request-buttons-confirm">Confirm</button>
          <button onClick={this.props.rejectFriend} id="friend-request-buttons-delete">Delete Request</button>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchUserById}, dispatch)
}

export default connect(null, mapDispatchToProps)(FriendRequestItem);

import React from 'react';
import {Link} from 'react-router';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUserById, friendRequest, fetchFriends} from '../../actions/index';


class SearchResult extends React.Component {
  constructor(){
    super();
    this.state = {
      friendButtonText: "Add Friend"
    }
    this.makeFriendRequest = this.makeFriendRequest.bind(this);
  }

  componentWillMount(){
    this.props.fetchFriends().then((res) => {
      if (this.props.currentUser.user.id === this.props.elem.id){
        this.setState({friendButtonText: <span>Update Info</span>});
        return;
      } else {
        let foundflag = false;
        res.payload.data.forEach((elem2) => {
          if ( (elem2.sender === this.props.currentUser.user.id && elem2.receiver === this.props.elem.id) || (elem2.sender === this.props.elem.id && elem2.receiver === this.props.currentUser.user.id) ) {
            if (elem2.resolved === false){
              this.setState({friendButtonText: <span>Request Pending</span>});
              foundflag = true;
              return;
            } else {
              this.setState({friendButtonText: <span>Friends</span>});
              foundflag = true;
              return;
            }
          }
        });
        if (!foundflag){
          this.setState({friendButtonText: <span>Add Friends</span>});
          return;
        }
      }
    })
  }

  makeFriendRequest(){
    if (!this.props.elem){
      return;
    }

    this.props.fetchFriends().then((res) => {
      let foundflag = false;
      res.payload.data.forEach((elem) => {
        if ( (elem.sender === this.props.currentUser.user.id && elem.receiver === this.props.elem.id) || (elem.receiver === this.props.currentUser.user.id && elem.sender === this.props.elem.id) ){
          foundflag = true;
          if (elem.resolved){
            this.setState({friendButtonText: <span>Friends</span>})
          } else {
            this.setState({friendButtonText: <span>Request Pending</span>})
          }
        }
      })
      if (!foundflag){
        this.props.friendRequest({
          sender: this.props.currentUser.user.id,
          receiver: this.props.elem.id
        });
        this.setState({friendButtonText: <span>Request Pending</span>});
      }
    })

  }

  render() {
    return (
      <div className="feed-search-post-container">
        <Link to={`${this.props.elem.id}`}><img src={`${this.props.elem.profile_pic}`} />
        <h1>{this.props.elem.firstname} {this.props.elem.lastname}</h1></Link>
        <div className="feed-search-post-buttons">
          <button onClick={this.makeFriendRequest}>
            <img src="assets\images\add-user3-512.png" />
            <span>{this.state.friendButtonText}</span>
          </button>
          <select>
            <option selected disabled="disabled">...</option>
            <option>Send Message</option>
            <option>Photos</option>
            <option>Friends</option>
            <option>Interests</option>
          </select>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

function  mapDispatchToProps(dispatch){
  return bindActionCreators({fetchUserById, friendRequest, fetchFriends}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);

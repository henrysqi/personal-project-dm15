import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUserById, friendRequest, fetchFriends, updateProfilePic, updateCoverPhoto, deleteFriendsById} from '../../actions/index';
import {Link} from 'react-router';

class FixedFriends extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }

  componentWillMount(){
    this.updateState();
  }

  updateState(){
    let filteredFriends = []
    let filteredFriendsObjects = []
    let fetchUserByIdPointer = this.props.fetchUserById;
      this.props.fetchFriends().then((res) => {
        res.payload.data.forEach((elem) => {
          if (elem.resolved === true ){
            if (elem.sender === this.props.currentUser.user.id && elem.receiver !== this.props.currentUser.user.id){
              filteredFriends.push(elem.receiver)
            } else if (elem.receiver === this.props.currentUser.user.id && elem.sender !== this.props.currentUser.user.id ){
              filteredFriends.push(elem.sender)
            }
          }
      })

      filteredFriends.forEach((elem) => {
        this.props.fetchUserById(elem).then((res) => {
          filteredFriendsObjects.push(res.payload.data[0])
        })
      })

      setTimeout(() => {
        this.setState({
          friends: filteredFriendsObjects
        })
      }, 400)

    })
  }

  renderFriends(){
    if (!this.state.friends){
      return;
    }
    return this.state.friends.map((elem) => {
      return (
        <div>

          <Link to={`${elem.id}`}><div className="fixedfriends-friend">
            <img src={elem.profile_pic} />
            <div id="fixedfriends-friend-info">
              <h2>{elem.firstname} {elem.lastname}</h2>
            </div>
          </div></Link>

        </div>
      )
    }).reverse();
  }

  render() {
    return (
      <div id="fixedfriends-container">
        {this.renderFriends()}
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
  return bindActionCreators({fetchUserById, friendRequest, fetchFriends, updateProfilePic, updateCoverPhoto, deleteFriendsById}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FixedFriends);

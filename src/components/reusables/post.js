import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchNameById} from '../../actions/index';

class Posts extends React.Component {
  constructor(){
    super();
    this.state = {}
  }

  componentWillMount(){
    this.props.fetchNameById(this.props.userinfo.id).then((res) => {
      this.setState({
        nameOfUser: res
      })
    })
  }

  render() {
    return (
      <div>
        <div className="feed-news-post-container">
          {this.props.postinfo.text_content}
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchNameById}, dispatch)
}

export default connect(null, mapDispatchToProps)(Posts);

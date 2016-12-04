import React from 'react';
import {Link} from 'react-router';


class SearchResult extends React.Component {
  render() {
    return (
      <div className="feed-search-post-container">
        <Link to={`${this.props.elem.id}`}><img src="assets\images\defprofpic.jpg" />
        <h1>{this.props.elem.firstname} {this.props.elem.lastname}</h1></Link>
        <div className="feed-search-post-buttons">
          <button><img src="assets\images\add-user3-512.png" /><span>Add Friend</span></button>
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

export default SearchResult;

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class SearchMid extends React.Component {
  renderSearchResults(elem){
    if (elem === "na"){
      return (
        <p>no users found</p>
      )
    }
    return (
      <div key={elem.id} className="feed-search-post-container">
        <Link to={`${elem.id}`}><img src="assets\images\defprofpic.jpg" />
        <h1>{elem.firstname} {elem.lastname}</h1></Link>
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


  render() {
    console.log(this.props)
    return (
      <div id="search-mid">
        {this.props.searchResults.length === 0 ? this.renderSearchResults("na") : this.props.searchResults.map(this.renderSearchResults)}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    searchResults: state.searchResults
  }
}

export default connect(mapStateToProps)(SearchMid);

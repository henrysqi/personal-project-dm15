import React from 'react';
import {connect} from 'react-redux';

class SearchMid extends React.Component {
  renderSearchResults(elem){
    if (elem === "na"){
      return (
        <p>no users found</p>
      )
    }
    return (
      <div key={elem.id} className="feed-news-post-container">
        {elem.firstname}
        {elem.lastname}
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

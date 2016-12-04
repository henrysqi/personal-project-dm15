import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import SearchResult from './search_result';

class SearchMid extends React.Component {
  renderSearchResults(elem){
    if (elem === "na"){
      return (
        <p>no users found</p>
      )
    }
    return (
      <SearchResult key={elem.id} elem={elem} />
    )
  }


  render() {
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

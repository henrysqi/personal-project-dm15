import React from 'react';

class FeedHeaderSearchbar extends React.Component {
  render() {
    return (
      <div id="feed-header-searchbar">
        <i className="fa fa-facebook-official" aria-hidden="true"></i>
        <input placeholder="Search Facebook" type="text"></input>
        <button>
          <img src="assets/images/magnify.png" />
        </button>
      </div>
    )
  }
}

export default FeedHeaderSearchbar;

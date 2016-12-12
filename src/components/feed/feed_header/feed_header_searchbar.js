import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchSearchResults} from '../../../actions/index';
import {Link} from 'react-router';

class FeedHeaderSearchbar extends React.Component {
  constructor() {
    super();
    this.state = {
      term: ''
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({
      term: event.target.value
    });
  };

  static contextTypes = {
    router: PropTypes.object
  }

  onFormSubmit(event){
    event.preventDefault();

    this.props.fetchSearchResults(this.state.term);
    this.context.router.push("search");
  }

  render() {
    return (
      <div id="feed-header-searchbar">
        <form onSubmit={this.onFormSubmit}>
          <Link to={'/feed'}><i style={{color: 'white'}} className="fa fa-facebook-official" aria-hidden="true"></i></Link>
          <input value={this.state.term} onChange={this.onInputChange} placeholder="Search Fauxbook" type="text"></input>
          <button>
            <img src="http://localhost:8080/assets/images/magnify.png" />
          </button>
        </form>
      </div>
    )
  }
}

function  mapDispatchToProps(dispatch){
  return bindActionCreators({fetchSearchResults}, dispatch);
}

export default connect(null, mapDispatchToProps)(FeedHeaderSearchbar);

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTrends} from '../../../actions/index';

class FeedAds extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }

  componentDidMount(){
    this.updateState();
  }

  updateState(){
    this.props.getTrends().then((res) => {
      this.setState({
        trends: res.payload.data[0].trends.slice(0, 20)
      })
    })
  }

  renderTrends(){
    return this.state.trends.map((elem) => {
      return (
        <div id="feed-ads-trending-trend">
          <img src="http://localhost:8080/assets/images/provide-consistent-access-to-corporate-apps-anywhere-anytime-reduce--1362420.png" />
          <a href={elem.url}><h2>{elem.name}</h2></a>
        </div>
      )
    })
  }

  render() {
    return (
      <div id="feed-ads">
        <div id="feed-ads-trending">
          <h1>Trending</h1>

          {/* <div id="feed-ads-trending-trend">
            <img src="http://localhost:8080/assets/images/provide-consistent-access-to-corporate-apps-anywhere-anytime-reduce--1362420.png" />
            <h2>Some Trend lel.</h2>
          </div> */}
          {this.state.trends ? this.renderTrends() : <span></span>}

        </div>
      </div>
    )
  }
}

function  mapDispatchToProps(dispatch){
  return bindActionCreators({getTrends}, dispatch);
}

export default connect(null, mapDispatchToProps)(FeedAds);

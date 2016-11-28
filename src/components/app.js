import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div>
        <div>hello from app.js</div>
        {this.props.children}
      </div>
    )
  }
}

export default App;

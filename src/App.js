import React, {Component} from 'react';
import Home from './views/Home';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { accessLevel: props.accessLevel};
  }
  render() {
    return (
      <div className={"app" + this.props.accessLevel}>
        <Home accessLevel={this.state.accessLevel} />
      </div>
    );
  }
}

export default App;

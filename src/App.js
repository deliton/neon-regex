import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      regularExpression: "",
      targetText: "",
      highlight: ""

    }
  }

  handleRegularExpressionChange = async (event) => {
    await this.setState({ regularExpression: event.target.value });
    let highlightedText = this.applyHighlights(this.state.targetText);
    this.setState({highlight: highlightedText });
  }

  handleTargetTextChange = (event) => {
    let highlightedText = this.applyHighlights(event.target.value);
    this.setState({ targetText: event.target.value, highlight: highlightedText });
  }

  applyHighlights = (text) => {
    return text
      .replace(/\n$/g, '\n\n')
      .replace(this.regexFromString(this.state.regularExpression), match => `<mark>${match}</mark>`);
  }

  regexFromString = () => {

    let re
    try {
      re = new RegExp(this.state.regularExpression, "g")
    }
    catch(e) {
      re = new RegExp("", "g")
    }
    return re
  }

  handleScroll = (event) => {
    const node = ReactDOM.findDOMNode(this);
    const asideElement = node.querySelector('.backdrop');
    const mainElement = node.querySelector('.text-area');
    asideElement.scrollTop = mainElement.scrollTop;

  }

  render() {
    return (
      <div className="App">
        <div className="left-container">
          <div class="logo"><b>neon regex tool</b></div>
          <input value={this.state.regularExpression} onChange={this.handleRegularExpressionChange} className="regular-expression-input" type="text" placeholder="write regular expression here" />
        </div>
        <div className="right-container">
          <textarea className="text-area" onScroll={this.handleScroll} placeholder="insert text here" onChange={this.handleTargetTextChange}>
            {this.state.targetText}
          </textarea>
          <div className="backdrop">
            <div className="highlights" dangerouslySetInnerHTML={{ __html: this.state.highlight }}>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

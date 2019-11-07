import React from 'react';
import axios from 'axios';
import Error from '../components/Error';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { paragraphs: null };

    axios.get(this.props.contentPath)
      .then(resp => this.setState({
        paragraphs: resp.data
      }))
      .catch(err => this.setState({ err }));
  }

  render() {
    if (this.state.err) {
      return <div>Oopsie Doopsie</div>;
    } else if (!this.state.paragraphs) {
      return <div></div>;
    }

    return (
      <div id="article-content">
        {this.state.paragraphs.map(para => (<p class="article-paragraph">{para}</p>))}
      </div>
    );
  }
}
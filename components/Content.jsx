import React from 'react';
import data from '../public/content.json';
export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { paragraphs: data };
  }

  render() {
    if (this.state.err) {
      return <div>Oopsie Doopsie</div>;
    } else if (!this.state.paragraphs) {
      return <div></div>;
    }

    return (
      <div id='article-content'>
        {this.state.paragraphs.map((para, idx) => (
          <p key={`content-paragraph-${idx}`} className='article-paragraph'>
            {para}
          </p>
        ))}
      </div>
    );
  }
}

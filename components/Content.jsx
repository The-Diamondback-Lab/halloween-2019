import React from 'react';
import data from '../public/content.json';
export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { paragraphs: data };
  }

  render() {
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

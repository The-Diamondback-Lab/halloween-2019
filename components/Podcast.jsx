import React from 'react';

export default class Podcast extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <iframe
        width='100%'
        height='166px'
        src={this.props.src}
        scrolling='no'
        frameborder='no'
        allow='autoplay'
      ></iframe>
    );
  }
}

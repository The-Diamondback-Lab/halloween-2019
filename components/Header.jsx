import React from 'react';
import '../styles/main.css';
import data from '../public/data-header.json';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.state = { data };
  }

  render() {
    if (!this.state.data) {
      // TODO Load proper loading screen (spinner, etc...)
      return <div></div>;
    }

    return (
      <div className='header-bg'>
        <div className='header-content'>
          <a href='https://dbknews.com' target='_blank'>
            <img id='header-logo' src='/dbk-logo.png'></img>
          </a>
          <div id='title-text'>{this.state.data.title}</div>
          <div id='blurb'>{this.state.data.blurb}</div>
        </div>
      </div>
    );
  }
}

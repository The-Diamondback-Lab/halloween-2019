import React from 'react';
import '../styles/main.css';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='header-bg'>
        <div className='header-content'>
          <div id="title-text">Little Bus of Horrors:</div>
          <div id="subtitle-text">Halloween 2019 at UMD</div>
        </div>
      </div>
    );
  }
}

import React from 'react';
import credits from '../public/credits.json';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <p className="credits">Credits</p>
        { credits.map((creditLine, idx) => <p key={`credit-${idx}`}>{creditLine}</p>) }
        <a href="http://dbknews.com" target="_blank">
          <img className="footer-logo" src="/images/dbk-logo.png"></img>
        </a>
      </footer>
    );
  }
}
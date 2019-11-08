import React from 'react';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <p className="credits">CREDITS</p>
        <p>REPORTING: Hadron Chaudhary, Christine Condon, Arya Hodjat, and Jillian Atelsek</p>
        <p>Website Design: Vishal Patel</p>
        <a href="http://dbknews.com" target="_blank">
          <img className="footer-logo" src="/images/dbk-logo.png"></img>
        </a>
      </footer>
    );
  }
}
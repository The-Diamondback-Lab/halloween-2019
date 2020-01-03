import React from 'react';

import spinnerPath from '../assets/spinner.jpg';

export default class Spinner extends React.Component {
  render() {
    let dontShow = this.props.loaded && !this.props.startFadeOut;
    let wrapperClasses = ['spinner-wrapper'];

    if (this.props.startFadeOut) {
      wrapperClasses.push('animated');
      wrapperClasses.push('fadeOut');
    }

    return (
      <div style={dontShow ? {display: 'none'} : {}}>
        <div className={wrapperClasses.join(' ')}>
          <div className="spinner-container">
            <center>
              <img className="spinner-image"
                src={spinnerPath}
                alt="A spinner animation"
              />
              <div className="preload"> <span></span> <span></span> <span></span></div>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

import React from 'react';
import '../styles/main.css';

export default class Spinner extends React.Component {
  constructor(props) {
    super(props);
  }

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
                src="https://s3.amazonaws.com/wapopartners.com/dbknews-wp/wp-content/uploads/2016/12/11225146/SpecialProject.jpg"
              />
              <div className="preload"> <span></span> <span></span> <span></span></div>
            </center>
          </div>
        </div>
      </div>
    );
  }
}
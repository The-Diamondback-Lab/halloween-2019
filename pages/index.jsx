import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Content from '../components/Content';
import'../styles/main.css';
import Spinner from '../components/Spinner';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = { loaded: false, startFadeOut: false };
  }

  componentDidMount() {
    // After main component finishes mounting, wait 500ms
    // and change "loaded" to true and "startFadeOut" to true.
    // This will cause the spinner to start fading out.
    // This setState will call another timeout (750ms later)
    // to change the loaded to true and fade out to false,
    // indicating to the spinner that it should not display

    setTimeout(() => {
      // Indicating spinner to start fading out
      this.setState({
        loaded: true,
        startFadeOut: true
      }, () => {
        // Eventually tell spinner to never display
        setTimeout(() => {
          this.setState({
            loaded: true,
            startFadeOut: false
          })
        }, 750)
      });
    }, 500);
  }

  render() {
    return (
      <div id='home'>
        <Spinner
          loaded={this.state.loaded}
          startFadeOut={this.state.startFadeOut} />
        <Head>
          <title>DBK Halloween 2019</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <Header />
        <Content />
      </div>
    );
  }
}

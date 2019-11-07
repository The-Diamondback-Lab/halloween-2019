import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Content from '../components/Content';

const Home = () => (
  <div id='home'>
    <Head>
      <title>DBK Halloween 2019</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <Header dataPath='/data-header.json' />
    <Content contentPath='/content.json' />
  </div>
);

export default Home;

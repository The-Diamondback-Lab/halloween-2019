/**
 * @typedef ImageGalleryItem
 * @property {string} original path to original, full-size photo
 * @property {string} thumbnail path to thumbnail of photo
 */

import React from 'react';
import ImageGallery from 'react-image-gallery';
/**
 * @type {string[]}
 */
import contentData from '../public/content.json';
/**
 * @type {ImageGalleryItem[]}
 */
import imageData from '../public/images.json';

export default class Content extends React.Component {
  constructor(props) {
    super(props);

    let images = imageData.map(filePath => {
      return {
        original: filePath,
        thumbnail: filePath
      }
    });

    this.state = {
      paragraphs: contentData,
      images
    };
  }

  render() {
    let imageGallery = (<ImageGallery
      items={this.state.images}
      lazyLoad={true}
      showPlayButton={false}
      showFullscreenButton={false}
      showIndex={true}
    />);

    let articleContent = this.state.paragraphs.map((para, idx) => (
      <p key={`content-paragraph-${idx}`} className='article-paragraph'>
        {para}
      </p>
    ));

    let insertIndex = Math.max(articleContent.length / 2, 0);
    articleContent.splice(insertIndex, 0, imageGallery);

    return (
      <div id='article-content'>
        {articleContent}
      </div>
    );
  }
}

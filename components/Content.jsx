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

    imageData.forEach((imgFileObj, i) => {
      if (!imgFileObj.original) {
        throw new Error(`Image ${i} does not have an original path`);
      }

      imgFileObj.originalClass = imgFileObj.originalClass || 'gallery-img';

      imgFileObj.thumbnail = imgFileObj.thumbnail || imgFileObj.original;
      imgFileObj.thumbnailClass = imgFileObj.thumbnailClass || 'gallery-thumb';
    });

    this.state = { paragraphs: contentData };
  }

  render() {
    return (
      <div id='article-content'>
        <ImageGallery
          items={imageData}
          lazyLoad={true}
          showPlayButton={false}
          showFullscreenButton={false}
        />
        {this.state.paragraphs.map((para, idx) => (
          <p key={`content-paragraph-${idx}`} className='article-paragraph'>
            {para}
          </p>
        ))}
      </div>
    );
  }
}

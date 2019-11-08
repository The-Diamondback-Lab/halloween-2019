import React from 'react';
import ImageGallery from 'react-image-gallery';
import sanitizeHtml from 'sanitize-html';
/**
 * @type {string[]}
 */
import contentData from '../public/content.json';
/**
 * @type {string[]}
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

    this.splitImages = this.splitImages.bind(this);
    this.state = {
      /**
       * @type {string[]}
       */
      paragraphs: contentData,
      /**
       * @type {string[]}
       */
      images: images
    };
  }

  /**
   * Splits this component's state images into sets.
   * @param {number} count How many sets to split the images into
   * @returns {string[][]}
   */
  splitImages(count) {
    let { images } = this.state;

    let sets = [];
    let start = 0;
    let imageCount = Math.ceil(images.length / count);

    for (let i = 0; i < count; i++) {
      sets.push(images.slice(start, start + imageCount));
      start += imageCount;
    }

    return sets;
  }

  render() {
    let { paragraphs } = this.state;

    let galleryData = paragraphs.reduce((data, para, idx) => {
      if (para === 'GALLERY::') {
        data.indices.push([idx, data.count]);
        data.count++;
      }

      return data;
    }, {
      /**
       * How many gallery indicators/directives were found in the paragraphs list
       */
      count: 0,
      /**
       * @type number[][]
       * Maps the index of a gallery directive from `paragraphs` to which directive
       * count it was (i.e. `[15,1]` indicates directive at index 15 corresponds
       * to the second gallery, zero-indexed)
       */
      indices: []
    });

    let imageSets = this.splitImages(galleryData.count);

    let galleries = imageSets.map((set, idx) => (
      <div key={`gallery-${idx}`} className="gallery-wrapper">
        <ImageGallery
          items={set}
          lazyLoad={true}
          showPlayButton={false}
          showFullscreenButton={false}
          showIndex={true}
        />
      </div>
    ));

    let articleContent = paragraphs.map((para, idx) => {
      // Find the gallery index map for this index (if any)
      let galleryIndicesMap = galleryData.indices.find(arr => arr[0] === idx);

      if (galleryIndicesMap) {
        // Found one, return the gallery at index galleryIndicesMap[1]
        return galleries[galleryIndicesMap[1]];
      }

      if (para.match(/^PERSON\:\:/)) {
        para = `<i>${para.split('::')[1]}</i>`;
      }

      return (<p key={`content-paragraph-${idx}`} className='article-paragraph' dangerouslySetInnerHTML={{__html: sanitizeHtml(para)}}></p>);
    });

    return (
      <div id='article-content'>
        {articleContent}
      </div>
    );
  }
}

import React from 'react';
import ImageGallery from 'react-image-gallery';
import Podcast from './Podcast';
import sanitizeHtml from 'sanitize-html';
/**
 * @type {string[]}
 */
import contentData from '../public/content.json';
/**
 * @type {string[]}
 */
import imageData from '../public/images.json';

/**
 * @typedef GalleryData
 * @property {number} count How many gallery indicators/directives were found in the
 * paragraphs list
 * @property {number[][]} indices Maps the index of a gallery directive from `paragraphs` to which
 * directive count it was (i.e. `[15,1]` indicates directive at index 15 corresponds to the second
 * gallery, zero-indexed)
 */

/**
 * @typedef GalleryObjects
 * @property {GalleryData} data
 * @property {JSX.Element[]} galleries
 */

export default class Content extends React.Component {
  constructor(props) {
    super(props);

    let images = imageData.map((filePath) => {
      return {
        original: filePath,
        thumbnail: filePath
      };
    });

    this.splitImages = this.splitImages.bind(this);
    this.generateGalleries = this.generateGalleries.bind(this);
    this.generateContent = this.generateContent.bind(this);

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

  /**
   * Generates data for galleries, including a `GalleryData` object and
   * a list of JSX galleries.
   *
   * @returns {GalleryObjects}
   */
  generateGalleries() {
    let { paragraphs } = this.state;

    /**
     * @type {GalleryData}
     */
    let galleryData = { count: 0, indices: [] };
    galleryData = paragraphs.reduce((data, para, idx) => {
      if (para === 'GALLERY::') {
        data.indices.push([idx, data.count]);
        data.count++;
      }

      return data;
    }, galleryData);

    let imageSets = this.splitImages(galleryData.count);

    let galleries = imageSets.map((set, idx) => (
      <div key={`gallery-${idx}`} className='gallery-wrapper'>
        <ImageGallery
          items={set}
          lazyLoad={true}
          showPlayButton={false}
          showFullscreenButton={false}
          showIndex={true}
        />
      </div>
    ));

    return {
      data: galleryData,
      galleries
    };
  }

  /**
   * Generates all article content given gallery data, galleries themselves,
   * and any podcasts to embed. If a directive is found but not handled
   * appropriately, then that directive is ignored and not generated in the
   * content.
   *
   * @param {GalleryData} galleryData
   * @param {JSX.Element[]} galleries
   * @returns {JSX.Element[]}
   */
  generateContent(galleryData, galleries) {
    let { paragraphs } = this.state;

    return paragraphs.reduce((elems, para, idx) => {
      if (para.match(/^PODCAST\:\:/)) {
        let podcastSrc = para.split('PODCAST::')[1];
        elems.push(<Podcast src={podcastSrc} />);
        return elems;
      } else if (para.match(/^GALLERY\:\:/)) {
        // Find the gallery index map for this index (if any)
        let galleryIndicesMap = galleryData.indices.find((arr) => arr[0] === idx);

        if (galleryIndicesMap) {
          // Found one, return the gallery at index galleryIndicesMap[1]
          elems.push(galleries[galleryIndicesMap[1]]);
          return elems;
        }
      } else if (para.match(/^PERSON\:\:/)) {
        para = `<i>${para.split('PERSON::')[1]}</i>`;
      } else if (para.match(/^BOLD\:\:/)) {
        para = `<b>${para.split('BOLD::')[1]}</i>`;
      } else if (para.match(/^[A-Z]+\:\:/)) {
        // Unhandled directive, skip over
        return elems;
      }

      elems.push(
        <p
          key={`content-paragraph-${idx}`}
          className='article-paragraph'
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(para) }}
        ></p>
      );

      return elems;
    }, []);
  }

  render() {
    let { paragraphs } = this.state;

    let galleryObjs = this.generateGalleries();
    let articleContent = this.generateContent(galleryObjs.data, galleryObjs.galleries);

    return <div id='article-content'>{articleContent}</div>;
  }
}

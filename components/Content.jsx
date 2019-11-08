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

    this.state = {
      paragraphs: contentData,
      images
    };
  }

  render() {
    let imageGallery = (
      <div className="gallery-wrapper">
        <ImageGallery
          items={this.state.images}
          lazyLoad={true}
          showPlayButton={false}
          showFullscreenButton={false}
          showIndex={true}
        />
      </div>
    );

    let articleContent = this.state.paragraphs.map((para, idx) => {
      if (para.match(/^PERSON\:\:/)) {
        para = `<i>${para.split('::')[1]}</i>`;
      }

      return (<p key={`content-paragraph-${idx}`} className='article-paragraph' dangerouslySetInnerHTML={{__html: sanitizeHtml(para)}}></p>);
    });

    let insertIndex = Math.max(articleContent.length / 2 - 1, 0);
    articleContent.splice(insertIndex, 0, imageGallery);

    return (
      <div id='article-content'>
        {articleContent}
      </div>
    );
  }
}

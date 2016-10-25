import Promise from 'bluebird';

export default class ImagePreloader {
  constructor(url) {
    this.url = url;
  }

  load() {
    const image = new Image;

    image.src = this.url;

    if (image.complete)
      return Promise.resolve(image);

    return new Promise((resolve, reject) => {
      image.onload = () => { resolve(image); };
      image.error = () => { reject(new Error); };
    });
  }
}

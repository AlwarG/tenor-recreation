import GifsService from "./imageService";

export default class SearchService extends GifsService {
  urlPath = 'search';
  pos = '';

  constructor(query) {
    super(arguments);
    this.query = query;
  }

  getParams() {
    return {
      limit: 50,
      q: this.query
    };
  }

  getResults() {
    const actionMap = {
      sticker: 'getStickers',
      memes: 'getImages'
    }
    return this[actionMap[this.query]]();
  }

  getStickers() {
    try {
      const params = {
        searchfilter: 'sticker'
      }
      return this.getImages(params);
    } catch (error) {
      throw error;
    }
  }

}
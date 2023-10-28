import APIService from "./apiService";

export default class ImageService extends APIService {
  urlPath = 'featured';
  pos = '';

  getParams() {
    return {
      pos: this.pos,
      limit: 50
    };
  }

  async getImages(params) {
    try {
      const data = await this.getData({
        path: this.urlPath,
        params: {
          ...this.getParams(),
          ...params
        }
      });

      if (data.next && data.next !== this.pos) {
        this.pos = data.next;
        return data.results;
      }
      return [];
    } catch (response) {
      throw response;
    }
  }
}
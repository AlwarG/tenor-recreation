import APIService from "./apiService";

export default class AutoCompleteService extends APIService {
  urlPath = 'autocomplete';

  async getSuggestions(q = '') {
    try {
      const response = await this.getData({
        path: this.urlPath,
        params: { q }
      });
      let { results } = response;
      return results?.slice(0, 5);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

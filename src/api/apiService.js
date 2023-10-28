import axios from "axios";
const baseURL = 'https://tenor.googleapis.com/v2/';

export default class APIService {
  urlPath = '';
  async axiosInstance() {
    const instance = axios.create({
      baseURL,
      timeout: 100000,
    });

    instance.interceptors.request.use((config) => {
      if (!config.params?.key) {
        config.params = {
          ...config.params,
          key: process.env.apiKey,
        };
      }
      return config;
    });

    return instance;
  }

  async getData({ path, params }) {
    try {
      const axiosInstance = await this.axiosInstance();
      const response = await axiosInstance.get(path, { params });
      return response.data;
    } catch(error) {
      console.error(error);
      throw error;
    }
  }

  changeUrlPath(path) {
    this.urlPath = path;
  }
}
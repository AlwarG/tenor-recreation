const path = require('path')
const dotenv = require("dotenv");
const { parsed: { apiKey } = {} } = dotenv.config() || {};
 
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['media.tenor.com'],
  },
  env: {
    apiKey
  }
}

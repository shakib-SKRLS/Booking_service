const dotenv = require('dotenv');
dotenv.config();

const flightServiceURL = process.env.FLIGHT_SERVICE_URL
  ? process.env.FLIGHT_SERVICE_URL.replace(/^['"]|['"]$/g, '')
  : 'http://localhost:3001';

module.exports = {
    PORT: process.env.PORT || 3002,
    flightServiceURL
};
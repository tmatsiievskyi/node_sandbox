'use strict';

const { generateCRUD } = require('../utils/generateCRUD.js');

const countryApi = generateCRUD('country');

module.exports = countryApi;

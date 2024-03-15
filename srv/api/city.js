'use strict';

const { generateCRUD } = require('../utils/generateCRUD.js');

const cityApi = generateCRUD('city');

module.exports = cityApi;

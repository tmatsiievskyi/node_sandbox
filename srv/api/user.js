'use strict';

const { generateCRUD } = require('../utils/generateCRUD.js');
const { hash } = require('../utils/hash.js');

const users = generateCRUD('users');

const userApi = {
  async read(id) {
    return await users.read(id, ['id', 'login']);
  },

  async create({ login, password }) {
    const passwordHash = await hash(password);
    return await users.create({ login, password: passwordHash });
  },

  async update(id, { login, password }) {
    const passwordHash = await hash(password);
    return await users.update(id, { login, password: passwordHash });
  },

  async delete(id) {
    return await users.delete(id);
  },
};

module.exports = userApi;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { join } = require('path');
const { readFile } = require('fs').promises;
const log = require('../utils/logger');
require('dotenv').config();

exports.hashPassword = (password) => bcrypt.hash(password, 15);

exports.verifyPassword = async (password, storedPassword) => {
  const hash = await bcrypt.compare(password, storedPassword);
  log.info(hash);
  return hash;
};

let PRIVATE_KEY;
(async () => {
  try {
    PRIVATE_KEY = await readFile(
      join(__dirname, '../certs/private_key.pem'),
      'utf8'
    );
  } catch (err) {
    log.error(err.message);
  }
})();

exports.generateToken = (uuid, email) =>
  jwt.sign({ uuid, email }, PRIVATE_KEY, {
    algorithm: 'RS512',
    expiresIn: process.env.JWT_EXPIRATION,
  });

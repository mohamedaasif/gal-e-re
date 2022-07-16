const bcrypt = require("bcrypt");

const saltRounds = 10;

exports.hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (hash) resolve(hash);
      else reject(err);
    });
  });
};

exports.comparePassword = (password, hash_password) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash_password, (err, result) => {
      if (result) resolve(result);
      else reject(result);
    });
  });
};

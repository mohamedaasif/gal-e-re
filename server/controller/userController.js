const jwt = require("jsonwebtoken");
const QUERIES = require("../constants/queries");
const bcrypt_password = require("../helperFunctions/hashPassword");

// Import Database
const db = require("../utils/database");

// Create an user account and encrypt user password
exports.addUser = async (req, res) => {
  const userid = req.body.userid;
  const password = req.body.password;
  const sql = QUERIES.USERS.ADD_USER;
  await bcrypt_password
    .hashPassword(password)
    .then((result) => {
      const hashed_password = result;
      db.query(sql, [userid, hashed_password], (err, results) => {
        if (err) res.send(false);
        if (results) res.send(true);
      });
    })
    .catch((err) => res.send(false));
};

// Check whether the user has an account with their login credentials. If yes, then create a unique JWTtoken for each user's.
exports.searchUser = (req, res) => {
  const userid = req.body.userid;
  const password = req.body.password;
  const sql = QUERIES.USERS.GET_USER_BY_ID;
  db.query(sql, [userid], async (err, results) => {
    if (err) res.json({ auth: false });
    if (results.length > 0) {
      const hash_password = results[0].password;
      await bcrypt_password
        .comparePassword(password, hash_password)
        .then((response) => {
          // JWT
          const token = jwt.sign({ userid }, process.env.SECRET_KEY);
          res.json({ token: token, auth: response, userid: userid });
        })
        .catch((response) => res.json({ auth: response }));
    } else {
      res.json({ auth: false });
    }
  });
};

// Update user password
exports.updateUser = (req, res) => {
  const userid = req.body.userid;
  const password = req.body.password;
  const sql = QUERIES.USERS.GET_USER_BY_ID;
  db.query(sql, [userid], async (err, result) => {
    if (err) res.send({ NotFound: true });
    if (result.length <= 0) {
      res.send({ NotFound: true });
    } else {
      await bcrypt_password
        .hashPassword(password)
        .then((result) => {
          const hashed_password = result;
          const sql = QUERIES.USERS.UPDATE_USER;
          db.query(sql, [hashed_password, userid], (err, result) => {
            if (err) console.log(err);
            else res.send({ PasswordChanged: true });
          });
        })
        .catch((err) => console.log(err));
    }
  });
};

// Delete an user account and all the data appropriate to it.
exports.deleteUser = (req, res) => {
  const userid = req.params["userid"];
  const password = req.body.password;
  const sql = QUERIES.USERS.GET_USER_BY_ID;
  db.query(sql, [userid], async (err, results) => {
    if (err) console.log(err);
    if (results.length > 0) {
      const hash_password = results[0].password;
      await bcrypt_password
        .comparePassword(password, hash_password)
        .then(() => {
          const sql = QUERIES.USERS.DELETE_USER;
          db.query(sql, [userid], (err, result) => {
            if (err) console.log(err);
            if (result) return result;
          });
        })
        .then(() => {
          const sql = QUERIES.POSTS.DELETE_ALL_POSTS;
          db.query(sql, [userid], (err, result) => {
            if (err) console.log(err);
            if (result) res.send(result);
          });
        })
        .catch((result) => res.send(result));
    }
  });
};

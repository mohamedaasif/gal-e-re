const jwt = require("jsonwebtoken");

exports.verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("There is no token available");
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.send({
          auth: false,
          message: "You are not allowed to access this data",
        });
      } else {
        req.userid = decoded.id;
        next();
      }
    });
  }
};

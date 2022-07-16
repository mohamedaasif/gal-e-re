const path = require("path");
const QUERIES = require("../constants/queries");

const fileHandler = require("../helperFunctions/fileHandler");

// Import Database
const db = require("../utils/database");

// Get all the user's post from the table if exists.
exports.getAllPosts = (req, res) => {
  const userid = req.params["userid"];
  const sql = QUERIES.POSTS.GET_ALL_POSTS;
  db.query(sql, [userid], (err, result) => {
    if (err) console.log(err);
    else {
      if (result.length > 0) res.send(result);
      else res.send("null");
    }
  });
};

// Create a new post
exports.uploadPost = async (req, res) => {
  const userid = req.body.userid;
  const title = req.body.title;
  const caption = req.body.caption;
  const date = req.body.date;
  const file = req.files.file;

  const imagePath = `/uploads/${file.name}`;

  let newPath = path.join(__dirname, "../../client/public/uploads");

  const sql = QUERIES.POSTS.ADD_POST;

  await fileHandler
    .moveFile(file, newPath)
    .then(() => {
      db.query(
        sql,
        [userid, imagePath, title, caption, date],
        (err, result) => {
          if (err) console.log(err);
          if (result) res.json({ status: "Successfully Uploaded" });
        }
      );
    })
    .catch((err) => console.log(err));
};

// Delete a post
exports.deletePost = (req, res) => {
  const post_id = req.params["id"];
  const sql = QUERIES.POSTS.GET_POST_BY_ID;

  db.query(sql, [post_id], async (err, result) => {
    if (err) console.log(err);
    if (result) {
      const imagePath = result[0].image_path;
      const sql = QUERIES.POSTS.DELETE_POST_BY_ID;
      const deleteFile = path.join(__dirname, "../../client/public", imagePath);

      await fileHandler
        .deleteFile(deleteFile)
        .then(() => {
          db.query(sql, [post_id], (err, result) => {
            if (err) res.json({ Deleted: false });
            if (result) res.json({ Deleted: true });
          });
        })
        .catch((err) => res.json({ Deleted: err }));
    }
  });
};

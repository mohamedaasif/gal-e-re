const queries = {
  USERS: {
    GET_ALL_USERS: "SELECT * FROM users",
    GET_USER_BY_ID: "SELECT * FROM users WHERE userid = ?",
    ADD_USER: "INSERT INTO users (userid,password) values (?,?)",
    UPDATE_USER: "UPDATE users SET password = ? WHERE userid = ?",
    DELETE_USER: "DELETE FROM users WHERE userid = ?",
  },

  POSTS: {
    GET_ALL_POSTS: "SELECT * FROM posts WHERE userid = ?",
    GET_POST_BY_ID: "SELECT image_path FROM posts WHERE id = ?",
    ADD_POST:
      "INSERT INTO posts (userid,image_path,title,caption,date) VALUES (?,?,?,?,?)",
    DELETE_ALL_POSTS: "DELETE FROM posts WHERE userid = ?",
    DELETE_POST_BY_ID: "DELETE FROM posts WHERE id = ?",
  },
};

module.exports = queries;

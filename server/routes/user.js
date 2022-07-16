const express = require("express");
const router = express.Router();

//Import Controller
const userController = require("../controller/userController");
const postController = require("../controller/postController");

// Import VerifyJWT
const token = require("../helperFunctions/verifyToken");

// Handle API request
router.post("/login", userController.searchUser);

router.post("/signup", userController.addUser);

router.put("/changepassword", userController.updateUser);

router.delete("/deleteuser/:userid", userController.deleteUser);

router.post("/createpost", postController.uploadPost);

router.get("/profile/:userid", token.verifyJWT, postController.getAllPosts);

router.delete("/profile/deletepost/:id", postController.deletePost);

module.exports = router;

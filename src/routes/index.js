const express = require("express");
const router = express.Router();

//Controller
const { register, login, checkAuth } = require("../controllers/auth");
const { getPosts, getPostDetail, addPost} = require("../controllers/posts");
const { getOrders, addOrder, getOrderById, getOfferById, updateOrder, deleteOrder} = require("../controllers/orders");
const { getProfile, editProfile, addArt } = require("../controllers/profile");
const { addProject, getProjectDetail } = require("../controllers/projects");
const { checkFollowing, getPostByFollowng, following, unfollowing } = require("../controllers/follow");

//middleware 
const {auth, userCheck} = require('../middleware/auth');
const { uploadImage } = require('../middleware/upload');

//Auth
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);

//Post
router.get("/posts", auth, getPosts);
router.get("/postsall", getPosts);
router.get("/post/:id", auth, getPostDetail);
router.post("/post/:id", uploadImage('photos', null), auth, addPost);

//Order
router.get("/orders", auth, getOrders);
router.post("/order", auth, addOrder);
router.get("/my-order/:id", auth, getOrderById);
router.get("/my-offer/:id", auth, getOfferById);
router.patch("/order/:id", auth, updateOrder);
router.delete("/order/:id", auth, deleteOrder);

//Profile 
router.get("/profile/:id", auth, getProfile );
router.put("/profile/:id", uploadImage('avatar', null), auth, editProfile);
router.post("/upload-arts/:id", uploadImage('arts', null), auth, addArt);

//Project
router.get("/project/:id", auth, getProjectDetail);
router.post("/project/:id", uploadImage('projectphotos', null), auth, addProject);

//Follow
router.get("/check-follow/:id", auth, checkFollowing);
router.get("/postbyfollow/:id", auth, getPostByFollowng);
router.post("/follow", auth, following); 
router.delete("/unfollow/:id", auth, unfollowing);
module.exports = router;

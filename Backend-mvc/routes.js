const connection = require("./connection");
const express = require("express");
const cors = require("cors");
const routes = express.Router();
const multer = require("multer");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    const userId = req.user._id; // Assuming you have user information in the request
    const userUploadsPath = `./uploads/${userId}`;

    // Ensure the directory exists or create it
    fs.mkdir(userUploadsPath, { recursive: true }, (err) => {
      if (err) {
        return cb(err, null);
      }
      cb(null, userUploadsPath);
    });
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const userController = require("./controllers/user/userController");
const fetchUserDetails = require("./middlewares/fetchUserDetails");
const menuCardController = require("./controllers/menuCardController/menuCardController");
const orderController = require("./controllers/orderControllers/orderController");
// routes.post('/register',userController.registeruser)
//userRoutes
routes.post("/register", userController.registerUser);
routes.post("/login", userController.login);
routes.get("/fetchuser", fetchUserDetails, userController.fetchUser);

//menuCardRoutes
routes.post(
  "/addMenuCard",
  fetchUserDetails,
  upload.single("image"),
  menuCardController.addMenuCard
);
routes.delete(
  "/deleteMenuCard/:id",
  fetchUserDetails,
  menuCardController.deleteMenuCard
);
routes.put(
  "/updateMenuCard/",
  fetchUserDetails,
  upload.single("image"),
  menuCardController.updateMenuCard
);
routes.get(
  "/fetchMenuCards/",
  fetchUserDetails,
  menuCardController.fetchMenuCards
);
routes.get("/fetchAllMenuCards/:userId", menuCardController.fetchAllMenuCards);
//OrderRoutes
routes.post("/createOrder", orderController.createOrder);
routes.get("/getOrder", orderController.getOrders);

module.exports = routes;

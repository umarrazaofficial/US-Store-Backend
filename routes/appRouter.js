const express = require("express");
const Route = express.Router();
const {Createuser, Getuser, Getsingleuser, Updateuser, Deleteuser} = require("../controller/userController");
const {Login} = require("../controller/authController");
const {
    Addproduct,
    Getproduct,
    Updateproduct,
    Deleteproduct,
    Getsingleproduct,
} = require("../controller/productController");
const {
    Addorder,
    Getorder,
    Getsingleorder,
    Getpendingorders,
    Getcompletedorders,
    Completeorder,
} = require("../controller/orderController");
const {Addrating, Getrating, Getproductrating, Deleterating} = require("../controller/ratingController");
const Multer = require("multer");

const storage = Multer.memoryStorage();
const upload = Multer({storage: storage});

// User Api's
Route.post("/createuser", Createuser);
Route.get("/getUser", Getuser);
Route.get("/getsingleaccount/:_id", Getsingleuser);
Route.put("/updateUser/:_id", Updateuser);
Route.delete("/deleteUser/:_id", Deleteuser);
// Product Api's
Route.post("/addProduct", upload.single("image"), Addproduct);
Route.get("/getProducts", Getproduct);
Route.get("/getProduct/:_id", Getsingleproduct);
Route.put("/updateProduct/:_id", upload.single("image"), Updateproduct);
Route.delete("/deleteProduct/:_id", Deleteproduct);
// Order Api's
Route.post("/addOrder", Addorder);
Route.get("/getOrders", Getorder);
Route.get("/getOrder/:_id", Getsingleorder);
Route.get("/getpendingorders", Getpendingorders);
Route.get("/getcompletedorders", Getcompletedorders);
Route.put("/completeOrder/:_id", Completeorder);
// Rating Api's
Route.post("/addRating", Addrating);
Route.get("/getRating", Getrating);
Route.get("/getProductrating/:_id", Getproductrating);
Route.delete("/deleteRating/:_id", Deleterating);
// Login Api's
Route.post("/login", Login);

module.exports = Route;

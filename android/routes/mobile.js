const express = require("express");
const  router = express.Router();

const {
  createMobile,
  getMobiles, 
  getMobileById,
  deleteMobile,
  MobilePhotoUpload,
  } = require("../controllers/mobile");

  const { protect } = require("../middleware/auth");

  router
  .route("/")
  .get(protect,getMobiles)
  .post(protect,createMobile);

  router
  .route("/:id/photo")
  .put(protect, MobilePhotoUpload);

  router
  .route("/:id")
  .get(protect,getMobileById)
  .delete(protect, deleteMobile);


  module.exports = router
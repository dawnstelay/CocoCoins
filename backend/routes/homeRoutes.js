const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getHomeData } = require("../controllers/homeController");

const router = express.Router();

router.get("/", protect, getHomeData);

module.exports = router;
const express = require("express");
const memeRoute = require("./meme.route");
const captureDateMiddleware = require("../../middleware/middleware");
const router = express.Router();

router.use("/memes", memeRoute);

const testRoute = require("./test.route");
router.use("/test", testRoute);

module.exports = router;
const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { login } = require("../controllers/auth.controller");

router.post("/api/login", asyncHandler(login));
router.use("/api", require("../controllers"));

module.exports = router;

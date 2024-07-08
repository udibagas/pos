const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { login } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/api/login", asyncHandler(login));
router.use(authMiddleware);
router.use("/api", require("../controllers"));

module.exports = router;

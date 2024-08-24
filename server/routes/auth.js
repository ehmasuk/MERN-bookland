const router = require("express").Router();
const { login,register } = require("../controllers/auth");
const isLogedin = require("../middlewares/isLogedin");

router.post("/login", login);
router.post("/register", register);


module.exports = router;

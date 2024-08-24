const router = require("express").Router();
const { getAllUsers, getSingleUser, createUser, getUserByToken,updateUser } = require("../controllers/users");

router.get("/", getAllUsers);
router.get("/:id", getSingleUser);
router.get("/getbytoken/info", getUserByToken);

router.post("/", createUser);
router.post("/update", updateUser);

module.exports = router;

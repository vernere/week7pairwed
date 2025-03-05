const express = require("express");
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();



router.get("/",requireAuth, getAllUsers);
router.post("/", createUser);
router.get("/:userId",requireAuth, getUserById);
router.put("/:userId",requireAuth, updateUser);
router.delete("/:userId",requireAuth, deleteUser);

module.exports = router;

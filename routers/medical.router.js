const { Router } = require("express");
const router = Router();

const {
    getUser,
    getUserId,
    postUser,
    updateUser,
    deleteUser
} = require("../controllers/medical.controller");

// GET /user 
router.get("/user", getUser);
// GET /user/:id 
router.get("/user/:id", getUserId);
// POST /create 
router.post("/create", postUser);
// PUT /update/:id
router.put("/update/:id", updateUser);
// DELETE /delete/:id 
router.delete("/delete/:id", deleteUser);

module.exports = router;
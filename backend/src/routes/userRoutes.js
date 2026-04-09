const express = require("express");
const usercontroller = require("../controllers/userController");
const authmiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", usercontroller.registerUser);

router.post("/admin-login", usercontroller.adminLogin);

router.post("/admin-signup", usercontroller.adminSignup);

router.post("/login", usercontroller.loginUser);

router.get("/profile", authmiddleware.authuser, (req, res) => {
    res.json({
        user: req.user,
    });
});

router.put("/become-seller", authmiddleware.authuser, usercontroller.becomeSeller);

module.exports = router;

const express = require('express')
const router = express.Router();
const { registerUser, loginUser, currentUser } = require('../controllers/users.controller');
const validateToken = require('../middlewares/validateToken.middleware');

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

module.exports = router;
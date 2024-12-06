"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/', (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    res.status(200).json({ message: 'user logged in' });
});
exports.default = router;

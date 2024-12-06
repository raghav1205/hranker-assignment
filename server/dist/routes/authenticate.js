"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const schema_1 = __importDefault(require("../db/schema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log(username, password);
    const userExists = yield schema_1.default.findOne({ username: username });
    if (userExists) {
        res.status(403).json({ message: "username already exists" });
    }
    else {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield schema_1.default.create({
            username,
            password: hashedPassword,
        });
        if (process.env.JWT_SECRET) {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            res.status(200).json({ token, message: "user signed up" });
        }
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield schema_1.default.findOne({ username: username });
    console.log(username, password);
    if (user) {
        const passwordMatches = yield bcrypt_1.default.compare(password, user.password);
        if (passwordMatches && process.env.JWT_SECRET) {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            res.status(200).json({ token, message: "user signed in" });
        }
        else {
            res.status(403).json({ message: "username or password incorrect" });
        }
    }
    else {
        res.status(403).json({ message: "user not found" });
    }
}));
exports.default = router;

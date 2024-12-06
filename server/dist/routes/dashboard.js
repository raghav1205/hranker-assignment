"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
router.get('/dashboard', (req, res) => {
    const items = [
        {
            name: 'item1',
            type: 'object',
            completed: false,
            id: 23
        },
        {
            name: 'item2',
            type: 'object',
            completed: false,
            id: 123
        }, {
            name: 'item3',
            type: 'object',
            completed: false,
            id: 1242134
        }
    ];
    res.status(200).json({ items });
});
exports.default = router;

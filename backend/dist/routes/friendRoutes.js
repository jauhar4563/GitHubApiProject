"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const friendController_1 = require("../controllers/friendController");
const router = (0, express_1.Router)();
router.get('/:username', friendController_1.addFriends);
exports.default = router;

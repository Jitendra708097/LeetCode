const express = require('express');
const userMiddleware = require('../middleware/userMiddleware');
const aiDsAGuru = require('../controllers/aiDsAGuru');
const DsAGuruRouter = express.Router();


DsAGuruRouter.post('/DsAGuru',userMiddleware,aiDsAGuru);

module.exports = DsAGuruRouter;
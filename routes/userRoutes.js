const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getProfile, addMoney, getTransactions, getAddMoneyRequests } = require('../controllers/userController');
const { initiateRecharge, getMyRecharges } = require('../controllers/rechargeController');
const { getPlans } = require('../controllers/planController'); // <-- ADD THIS

router.use(protect);

router.get('/profile', getProfile);
router.post('/wallet/add', addMoney);
router.post('/wallet/request', addMoney);
router.get('/wallet/requests', getAddMoneyRequests);
router.post('/recharge', initiateRecharge);
router.get('/recharges', getMyRecharges);
router.get('/transactions', getTransactions);
router.get('/plans', getPlans); // <-- ADD THIS

module.exports = router;
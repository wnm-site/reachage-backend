const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const { getStats, getUsers, getUser, updateUser, verifyUser, suspendUser, deleteUser, getAllRecharges, updateRechargeStatus, getAllTransactions, deleteTransaction, getAddMoneyRequests, createAddMoneyRequest, updateAddMoneyRequest, approveAddMoneyRequest, rejectAddMoneyRequest, deleteAddMoneyRequest } = require('../controllers/adminController');

router.use(protect);
router.use(admin);

router.get('/stats', getStats);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.put('/users/:id/verify', verifyUser);
router.put('/users/:id/suspend', suspendUser);
router.delete('/users/:id', deleteUser);
router.get('/recharges', getAllRecharges);
router.put('/recharge/:id', updateRechargeStatus);
router.get('/transactions', getAllTransactions); // Admin transactions history
router.delete('/transactions/:id', deleteTransaction); // Admin delete transaction
router.get('/addmoney', getAddMoneyRequests); // Admin add-money requests
router.post('/addmoney', createAddMoneyRequest); // Create (admin)
router.put('/addmoney/:id', updateAddMoneyRequest); // Update (admin)
router.put('/addmoney/:id/approve', approveAddMoneyRequest); // Approve → credit wallet
router.put('/addmoney/:id/reject', rejectAddMoneyRequest); // Reject
router.delete('/addmoney/:id', deleteAddMoneyRequest); // Delete (admin)

module.exports = router;
import { Router } from 'express';
import { applyVoucher, createVoucher, deleteVoucher, getAllVouchers, getVoucherByCode, updateVoucher, useVoucher } from '../controllers/voucherController.js';
const router = Router();

router.post('/voucher', createVoucher);
router.get('/vouchers', getAllVouchers);
router.get('/voucher/:code', getVoucherByCode);
router.patch('/voucher', updateVoucher);
router.delete('/voucher', deleteVoucher);
router.post('/voucher/apply', applyVoucher);
router.post('/voucher/use', useVoucher);

export default router;
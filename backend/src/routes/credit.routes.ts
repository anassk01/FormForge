import express, { RequestHandler } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';
import * as creditController from '../controllers/credit.controller';

const router = express.Router();

router.use(authMiddleware);

// Explicitly type the controller functions as RequestHandler
const getCreditBalance: RequestHandler = (req, res) => creditController.getCreditBalance(req as AuthRequest, res);
const addCredits: RequestHandler = (req, res) => creditController.addCredits(req as AuthRequest, res);
const useCredits: RequestHandler = (req, res) => creditController.useCredits(req as AuthRequest, res);
const getCreditHistory: RequestHandler = (req, res) => creditController.getCreditHistory(req as AuthRequest, res);
const purchasePackage: RequestHandler = (req, res) => creditController.purchasePackage(req as AuthRequest, res);

router.get('/balance', getCreditBalance);
router.post('/add', addCredits);
router.post('/use', useCredits);
router.get('/history', getCreditHistory);
router.post('/purchase-package', purchasePackage);

export default router;
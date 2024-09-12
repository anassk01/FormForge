// src/routes/credit-package.routes.ts

import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import * as creditPackageController from '../controllers/credit-package.controller';

const router = express.Router();

router.get('/', creditPackageController.getCreditPackages);
router.post('/', authMiddleware, creditPackageController.createCreditPackage);
router.put('/:id', authMiddleware, creditPackageController.updateCreditPackage);
router.delete('/:id', authMiddleware, creditPackageController.deleteCreditPackage);

export default router;
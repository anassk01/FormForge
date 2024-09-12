import express from 'express';
import { interpretCode } from '../controllers/code.controller';

const router = express.Router();

router.post('/interpret', interpretCode);

export default router;

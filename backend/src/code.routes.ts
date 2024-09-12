// code.routes.ts

import { Router } from 'express';
import { interpretCode } from '../src/controllers/code.controller';

const router = Router();

router.post('/interpret', interpretCode);

export default router;
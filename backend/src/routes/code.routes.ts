import express from 'express';

const router = express.Router();

router.post('/submit', (req, res) => {
  const { code } = req.body;
  console.log('Received code:', code);
  res.json({ message: 'Code received', codeLength: code.length });
});

export default router;

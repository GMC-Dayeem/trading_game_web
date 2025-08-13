// adminRoutes.mjs
import express from 'express';
import { createGame, endGame } from '../controllers/adminController.mjs';

const router = express.Router();

router.post('/create-game', createGame);
router.post('/end-game', endGame);

export default router;

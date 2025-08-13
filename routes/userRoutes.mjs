// userRoutes.mjs
import express from 'express';
import { register, login, logout, buyStock, sellStock, getPortfolio, getUserData} from '../controllers/userController.mjs';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout)
router.post('/buy/:username', buyStock);
router.post('/sell/:username', sellStock);
router.get('/portfolio/:username', getPortfolio);
router.get('/data/:username', getUserData);

export default router;

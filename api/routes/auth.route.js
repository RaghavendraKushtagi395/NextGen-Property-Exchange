import express from 'express';
import { signin, signup } from '../controllerLogic/auth.controller.js';

const router = express.Router();


router.post("/signup", signup)
router.post("/signin", signin)

export default router;  
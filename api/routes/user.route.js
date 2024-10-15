import express from 'express';
import { test } from '../controllerLogic/user.controller.js';


const router = express.Router();
router.get('/test', test);


export default router; 
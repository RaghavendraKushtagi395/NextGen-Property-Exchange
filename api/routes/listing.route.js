import expess from 'express';
import { createListing } from '../controllerLogic/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = expess.Router();


router.post('/create', verifyToken ,createListing)

export default router;
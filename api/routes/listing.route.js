import expess from 'express';
import { createListing, deleteListing } from '../controllerLogic/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = expess.Router();


router.post('/create', verifyToken ,createListing);
router.delete('/delete/:id', verifyToken, deleteListing);

export default router;
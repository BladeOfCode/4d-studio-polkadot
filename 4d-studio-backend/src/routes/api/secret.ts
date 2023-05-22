import express from 'express';
const router = express.Router();
import { getSecret } from '../../controllers/secret';
import isValidRequest from '../../middleware/isValidRequest';

router.get('/secret', isValidRequest, getSecret);

export {router}
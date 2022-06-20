import express from 'express';

import { getEmployeesList } from '../controllers/employees.js';

const router = express.Router();

router.get('/', getEmployeesList);

export default router;

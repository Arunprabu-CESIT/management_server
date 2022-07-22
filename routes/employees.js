import express from 'express';

import {
  getEmployeesList,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employees.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getEmployeesList);
router.post('/', auth, createEmployee);
router.patch('/:id', auth, updateEmployee);
router.delete('/:id', auth, deleteEmployee);

export default router;

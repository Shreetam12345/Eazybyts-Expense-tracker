// expenseRoutes.js
import express from 'express';
import { createExpenseController, getExpensesController, updateExpenseController, deleteExpenseController } from '../controllers/expenseController.js';

const router = express.Router();

router.post('/', createExpenseController);
router.get('/', getExpensesController);
router.put('/:id', updateExpenseController);
router.delete('/:id', deleteExpenseController);

export default router;

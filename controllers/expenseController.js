import { createExpense, getExpenses, updateExpense, deleteExpense } from '../models/expense.js';

export const createExpenseController = async (req, res) => {
  // try {
  //   const expense = await createExpense(req.body);
  //   res.status(201).json(expense);
  // } catch (err) {
  //   res.status(400).json({ error: err.message });
  // }
  try {
    if (req.isAuthenticated()) {
      const user_id = req.user.id;
      const expense = req.body;
      const newExpense = await createExpense(expense, user_id);
      res.json(newExpense);
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).send("Internal server error");
  }
};

export const getExpensesController = async (req, res) => {
  // try {
  //   const expenses = await getExpenses();
  //   res.status(200).json(expenses);
  // } catch (err) {
  //   res.status(400).json({ error: err.message });
  // }
  try {
    if (req.isAuthenticated()) {
      const user_id = req.user.id;
      const expenses = await getExpenses(user_id);
      res.json(expenses);
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).send("Internal server error");
  }
};

export const updateExpenseController = async (req, res) => {
  try {
    const expense = await updateExpense(req.params.id, req.body);
    res.status(200).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteExpenseController = async (req, res) => {
  try {
    await deleteExpense(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

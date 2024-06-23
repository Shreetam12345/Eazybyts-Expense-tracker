// import db from '../db.js';

// const createExpense = async (expense) => {
//   const { amount, category, date, description } = expense;
//   const result = await db.query(
//     'INSERT INTO expenses (amount, category, date, description) VALUES ($1, $2, $3, $4) RETURNING *',
//     [amount, category, date, description]
//   );
//   return result.rows[0];
// };

// const getExpenses = async () => {
//   const result = await db.query('SELECT * FROM expenses');
//   return result.rows;
// };

// const updateExpense = async (id, expense) => {
//   const { amount, category, date, description } = expense;
//   const result = await db.query(
//     'UPDATE expenses SET amount = $1, category = $2, date = $3, description = $4 WHERE id = $5 RETURNING *',
//     [amount, category, date, description, id]
//   );
//   return result.rows[0];
// };

// const deleteExpense = async (id) => {
//   await db.query('DELETE FROM expenses WHERE id = $1', [id]);
// };

// export { createExpense, getExpenses, updateExpense, deleteExpense };

import db from '../db.js';

const createExpense = async (expense, user_id) => {
  const { amount, category, date, description } = expense;
  try {
    const result = await db.query(
      'INSERT INTO expenses (amount, category, date, description, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [amount, category, date, description, user_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating expense:', error);
    throw error;
  }
};

const getExpenses = async (user_id) => {
  try {
    const result = await db.query(
      `SELECT * FROM expenses WHERE user_id = $1`,
      [user_id]
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

const updateExpense = async (id, expense) => {
  const { amount, category, date, description } = expense;
  const result = await db.query(
    'UPDATE expenses SET amount = $1, category = $2, date = $3, description = $4 WHERE id = $5 RETURNING *',
    [amount, category, date, description, id]
  );
  return result.rows[0];
};

const deleteExpense = async (id) => {
  await db.query('DELETE FROM expenses WHERE id = $1', [id]);
};

export { createExpense, getExpenses, updateExpense, deleteExpense };





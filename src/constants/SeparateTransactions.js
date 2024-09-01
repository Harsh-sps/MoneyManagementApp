// Function to separate expenses and incomes
export const separateTransactions = transactions => {
  const expenses = transactions.filter(
    transaction => transaction.moneyTransaction.tag === 'expenses',
  );

  const incomes = transactions.filter(
    transaction => transaction.moneyTransaction.tag === 'income',
  );

  return {expenses, incomes};
};

export const combineIncomeAndExpenses = transactions => {
  let totalIncome = 0;
  let totalExpenses = 0;

  if (!transactions || !Array.isArray(transactions)) {
    console.error('transactions array is undefined or not an array');
    return {
      totalIncome,
      totalExpenses,
    };
  }

  transactions.forEach(transaction => {
    const amount = parseFloat(transaction.moneyTransaction.amount); // Ensure the amount is a number
    if (transaction.moneyTransaction.tag === 'income') {
      totalIncome += amount;
    } else if (transaction.moneyTransaction.tag === 'expenses') {
      totalExpenses += amount;
    }
  });

  return {
    totalIncome,
    totalExpenses,
  };
};

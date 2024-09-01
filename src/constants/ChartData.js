export const formatData = data => {
  if (!Array.isArray(data)) {
    throw new Error('Expected data to be an array');
  }

  return data.map(transaction => {
    return {
      name: transaction.moneyTransaction.finalCategory,
      value: parseFloat(transaction.moneyTransaction.amount),
      color: transaction.moneyTransaction.color,
    };
  });
};

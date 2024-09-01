const isSameDay = (date1, date2) =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();

const getStartOfWeek = date => {
  const day = date.getDay() || 7;
  if (day !== 1) {
    date.setHours(-24 * (day - 1));
  }
  return new Date(date.setHours(0, 0, 0, 0));
};

const isSameWeek = (date1, date2) => {
  const startOfWeek1 = getStartOfWeek(new Date(date1));
  const startOfWeek2 = getStartOfWeek(new Date(date2));
  return startOfWeek1.getTime() === startOfWeek2.getTime();
};

const isSameMonth = (date1, date2) =>
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();

const isSameYear = (date1, date2) =>
  date1.getFullYear() === date2.getFullYear();

export const filterTransactions = transactions => {
  const today = new Date();

  const todayTransactions = transactions.filter(transaction =>
    isSameDay(new Date(transaction.moneyTransaction.date), today),
  );

  const weeklyTransactions = transactions.filter(transaction =>
    isSameWeek(new Date(transaction.moneyTransaction.date), today),
  );

  const monthlyTransactions = transactions.filter(transaction =>
    isSameMonth(new Date(transaction.moneyTransaction.date), today),
  );

  const yearlyTransactions = transactions.filter(transaction =>
    isSameYear(new Date(transaction.moneyTransaction.date), today),
  );

  return {
    todayTransactions,
    weeklyTransactions,
    monthlyTransactions,
    yearlyTransactions,
  };
};

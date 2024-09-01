import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'transaction.db';
const database_version = '1.0';
const database_displayname = 'Notes Database';
const database_size = 200000;
let db;

export const initDatabase = async () => {
  db = await SQLite.openDatabase(
    database_name,
    database_version,
    database_displayname,
    database_size,
  );
  await db.executeSql(
    'CREATE TABLE IF NOT EXISTS Transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, moneyTransaction TEXT);',
  );
  return db;
};

export const insertTransaction = async transaction => {
  const noteJson = JSON.stringify(transaction);
  await db.executeSql(
    'INSERT INTO Transactions (moneyTransaction) VALUES (?);',
    [noteJson],
  );
};

export const fetchTransactions = async () => {
  try {
    // Execute SQL query
    const results = await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Transactions;',
          [],
          (tx, result) => resolve(result),
          (tx, error) => reject(error),
        );
      });
    });

    // Process and return resultsx
    return results.rows.raw().map(row => ({
      ...row,
      moneyTransaction: JSON.parse(row.moneyTransaction), // Ensure moneyTransaction is a valid JSON string
    }));
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return []; // Return an empty array in case of error
  }
};

export const closeDatabase = async () => {
  if (db) {
    await db.close();
  }
};

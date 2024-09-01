import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTransactions, initDatabase} from '../database/Database';
import {setTransaction} from '../reducers/TransactionReducers';
import {filterTransactions} from '../constants/FilterTransactions';
import {formatDate} from '../components/FormatDate';

export const TopHeader = ({navigation, title}) => {
  return (
    <View style={styles.topHeader}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Image
          source={require('../assets/back_arrow.png')}
          style={styles.backIcon}></Image>
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const TransactionItem = ({item, index, listSize}) => {
  const finalTransaction = item.moneyTransaction;
  return (
    <View
      style={[
        styles.transactionItem,
        index === listSize ? {marginBottom: 180} : {marginBottom: 0},
      ]}>
      <View style={styles.topHeaderTransactionView}>
        <Text style={styles.title}>{finalTransaction.finalCategory}</Text>
        <Text style={styles.amount}>
          {finalTransaction.tag === 'expenses' ? '-' : '+'}{' '}
          {finalTransaction.amount}
        </Text>
      </View>
      <View style={styles.bottomHeaderTransactionView}>
        <Text style={styles.bottomText}>{finalTransaction.description}</Text>
        <Text style={styles.bottomText}>
          {formatDate(finalTransaction.date)}
        </Text>
      </View>
    </View>
  );
};

const FilterSection = () => {
  return (
    <View style={styles.parentFilter}>
      {/* This is monthly, yearly or daily filter */}
      <TouchableOpacity style={[styles.filterBackground]}>
        <View style={styles.montlyAndAllView}>
          <Image
            source={require('../assets/transaction_arrow.png')}
            style={styles.icon}></Image>
          <Text style={styles.filterText}>Month</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const TransactionScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions);

  useEffect(() => {
    const getTransactions = async () => {
      await initDatabase();
      const allTransactions = await fetchTransactions();
      dispatch(setTransaction(allTransactions));
    };
    getTransactions();
  }, [dispatch]);

  const {
    todayTransactions,
    weeklyTransactions,
    monthlyTransactions,
    yearlyTransactions,
  } = filterTransactions(transactions);

  if (!weeklyTransactions || weeklyTransactions.length === 0) {
    return (
      <View style={styles.emptyView}>
        <Text>No transactions available</Text>
      </View>
    );
  }

  return (
    <View style={styles.parentView}>
      <TopHeader navigation={navigation} title={'Transactions'}></TopHeader>
      <FilterSection />
      <FlatList
        data={weeklyTransactions}
        renderItem={({item, index}) => (
          <TransactionItem
            item={item}
            index={index}
            listSize={weeklyTransactions.length - 1}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parentView: {backgroundColor: '#FFF6E5', flex: 1},
  parentFilter: {
    flexDirection: 'row',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  backIcon: {
    height: 32,
    width: 32,
    marginStart: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    width: '75%',
  },
  filterBackground: {
    borderRadius: 40,
    borderWidth: 1,
    borderBlockColor: '#02021A',
    height: 40,
    justifyContent: 'center',
    marginStart: 20,
    marginTop: 20,
  },
  montlyAndAllView: {
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#7F3DFF',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212325',
    marginStart: 5,
  },
  transactionItem: {
    borderRadius: 20,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
  },
  topHeaderTransactionView: {
    marginHorizontal: 20,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#292B2D',
    fontSize: 16,
    fontWeight: '500',
  },
  amount: {
    color: '#FD3C4A',
    fontWeight: '600',
    fontSize: 16,
  },
  bottomHeaderTransactionView: {
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomText: {
    fontSize: 13,
    color: '#91919F',
    fontWeight: '500',
  },
  emptyView: {
    backgroundColor: '#FFF6E5',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

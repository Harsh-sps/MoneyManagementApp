import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const TransactionData = [
  {
    id: 1,
    type: 'Expenses',
    amount: 15000,
    title: 'Shopping',
    description: 'Buy some grocery',
    time: '10:00 AM',
  },
  {
    id: 2,
    type: 'Expenses',
    amount: 533,
    title: 'Food',
    description: 'Arabian Hut',
    time: '12:00 AM',
  },
  {
    id: 3,
    type: 'Income',
    amount: 5000,
    title: 'Salary',
    description: 'Salary for a month',
    time: '1:00 PM',
  },
  {
    id: 4,
    type: 'Expenses',
    amount: 699,
    title: 'Subscription',
    description: 'Netflix',
    time: '2:00 PM',
  },
  {
    id: 5,
    type: 'Expenses',
    amount: 1565,
    title: 'Cinema',
    description: 'Elante Mall',
    time: '3:52 PM',
  },
  {
    id: 6,
    type: 'Expenses',
    amount: 1232,
    title: 'Fuel',
    description: 'HP Pertrol',
    time: '4:30 PM',
  },
];

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

const TransactionItem = ({item, index}) => {
  return (
    <View
      style={[
        styles.transactionItem,
        index === TransactionData.length - 1
          ? {marginBottom: 180}
          : {marginBottom: 0},
      ]}>
      <View style={styles.topHeaderTransactionView}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.amount}>
          {item.type === 'Expenses' ? '-' : '+'} {item.amount}
        </Text>
      </View>

      <View style={styles.bottomHeaderTransactionView}>
        <Text style={styles.bottomText}>{item.description}</Text>
        <Text style={styles.bottomText}>{item.time}</Text>
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

      {/* This is monthly, yearly or daily filter */}
      <TouchableOpacity style={[styles.filterBackground]}>
        <View style={styles.montlyAndAllView}>
          <Image
            source={require('../assets/transaction_arrow.png')}
            style={styles.icon}
          />
          <Text style={styles.filterText}>All</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const TransactionScreen = ({route, navigation}) => {
  return (
    <View style={styles.parentView}>
      <TopHeader navigation={navigation} title={'Transactions'}></TopHeader>
      <FilterSection></FilterSection>
      <FlatList
        data={TransactionData}
        renderItem={({item, index}) => (
          <TransactionItem item={item} index={index} />
        )}
        keyExtractor={item => item.id.toString()}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  parentView: {backgroundColor: '#FFF6E5'},
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
});

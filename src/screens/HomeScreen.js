import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';

const TransactionData = [
  {
    id: 1,
    type: 'Income',
    amount: 15000,
    title: 'Income',
  },
  {
    id: 2,
    type: 'Expenses',
    amount: 6000,
    title: 'Food',
  },
  {
    id: 3,
    type: 'Income',
    amount: 5000,
    title: 'Income',
  },
  {
    id: 4,
    type: 'Expenses',
    amount: 4000,
    title: 'Fuel',
  },
  {
    id: 5,
    type: 'Expenses',
    amount: 3000,
    title: 'Shopping',
  },
  {
    id: 6,
    type: 'Income',
    amount: 3000,
    title: 'Income',
  },
];

const BalanceComponent = () => {
  return (
    <View style={{marginTop: 40, alignItems: 'center'}}>
      <Text
        style={{
          textTransform: 'capitalize',
          fontSize: 14,
          fontWeight: '500',
          color: '#91919F',
        }}>
        Account Balance
      </Text>

      <Text
        style={{
          textTransform: 'capitalize',
          fontSize: 40,
          fontWeight: '600',
          color: '#161719',
          marginTop: 20,
        }}>
        9400.0
      </Text>

      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
          marginTop: 40,
        }}>
        <IncomeComponent />
        <ExpenseComponent />
      </View>
    </View>
  );
};

const IncomeComponent = () => {
  return (
    <View flexDirection="row" style={[styles.box, styles.incomeBox]}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          height: 48,
          width: 48,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/down_arrow.png')}
          style={{width: 10, height: 10}}></Image>

        <Image
          source={require('../assets/expense.png')}
          style={{width: 24, height: 16, marginTop: 5}}></Image>
      </View>

      <View style={{marginStart: 10}}>
        <Text style={{fontWeight: '500', fontSize: 14, color: '#FCFCFC'}}>
          Income
        </Text>
        <Text style={{fontWeight: '500', fontSize: 22, color: '#FCFCFC'}}>
          25000
        </Text>
      </View>
    </View>
  );
};

const ExpenseComponent = () => {
  return (
    <View flexDirection="row" style={[styles.box, styles.expenseBox]}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          height: 48,
          width: 48,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/top_arrow.png')}
          style={{width: 10, height: 10}}></Image>

        <Image
          source={require('../assets/expense.png')}
          style={{
            width: 24,
            height: 16,
            marginTop: 5,
            tintColor: '#FD3C4A',
          }}></Image>
      </View>

      <View style={{marginStart: 10}}>
        <Text style={{fontWeight: '500', fontSize: 14, color: '#FCFCFC'}}>
          Expenses
        </Text>
        <Text style={{fontWeight: '500', fontSize: 22, color: '#FCFCFC'}}>
          11200
        </Text>
      </View>
    </View>
  );
};

const TransactionItem = ({title, type, amount, index}) => {
  return (
    <View
      flexDirection="row"
      style={{
        backgroundColor: '#D9D9D9',
        opacity: type === 'Income' ? 0.5 : 1,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 20,
        marginTop: 20,
        height: 54,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: index === TransactionData.length - 1 ? 100 : 0,
      }}>
      <View flexDirection="row" style={{alignItems: 'center'}}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 30,
            backgroundColor: type === 'Income' ? '#00A86B' : '#FD3C4A',
            alignItems: 'center',
            justifyContent: 'center',
            marginStart: 10,
          }}>
          <Image
            source={
              type === 'Income'
                ? require('../assets/trans_top_arrow.png')
                : require('../assets/trans_down_arrow.png')
            }
            style={{tintColor: 'white', width: 20, height: 20}}></Image>
        </View>

        <Text
          style={{
            fontWeight: '400',
            color: 'black',
            fontSize: 22,
            marginStart: 10,
          }}>
          ₹ {amount}
        </Text>
      </View>

      <Text
        style={{
          fontWeight: '400',
          color: '#767474',
          fontSize: 15,
          marginEnd: 10,
        }}>
        {title}
      </Text>
    </View>
  );
};

const FirstRoute = () => (
  <View style={{flex: 1}}>
    <FlatList
      data={TransactionData}
      renderItem={({item, index}) => (
        <TransactionItem
          title={item.title}
          type={item.type}
          amount={item.amount}
          index={index}
        />
      )}
      keyExtractor={item => item.id.toString()}></FlatList>
  </View>
);

const SecondRoute = () => <View style={{flex: 1}} />;

const renderScene = SceneMap({
  today: FirstRoute,
  week: SecondRoute,
  month: FirstRoute,
  year: SecondRoute,
});

const CustomTabView = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'today', title: 'Today'},
    {key: 'week', title: 'Week'},
    {key: 'month', title: 'Month'},
    {key: 'year', title: 'Year'},
  ]);

  const renderTabBar = props => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 34,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#FCFCFC',
        marginHorizontal: 10,
      }}>
      {props.navigationState.routes.map((route, i) => {
        const isFocused = props.navigationState.index === i;
        return (
          <TouchableOpacity
            key={i}
            style={[styles.tabItem, isFocused ? styles.tabItemFocused : null]}
            onPress={() => setIndex(i)}>
            <Text style={isFocused ? styles.tabLabelFocused : styles.tabLabel}>
              {route.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}></TabView>
  );
};

const HomeScreen = () => {
  return (
    <View style={styles.parentContainer}>
      <View style={styles.topContainer}>
        <View style={styles.topHeader}>
          <Text
            style={{
              textTransform: 'capitalize',
              fontSize: 14,
              fontWeight: '400',
            }}>
            Monday 9 November
          </Text>
          <View flexDirection="row" style={{alignItems: 'center'}}>
            <Image
              source={require('../assets/close.png')}
              style={{
                borderRadius: 35,
                height: 32,
                width: 32,
                backgroundColor: 'black',
              }}></Image>

            <Text
              style={{
                textTransform: 'capitalize',
                fontSize: 14,
                fontWeight: '400',
                marginStart: 20,
              }}>
              HARSH
            </Text>
          </View>
        </View>

        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginHorizontal: 10,
            marginTop: 10,
          }}
        />

        <BalanceComponent />
      </View>

      <View style={styles.bottomContainer}>
        <CustomTabView></CustomTabView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: '#A89696',
  },
  topContainer: {
    flex: 1,
    backgroundColor: '#F8EDD8',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    width: '100%',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#A89696',
    marginTop: 30,
  },
  topHeader: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    marginTop: 10,
    alignItems: 'center',
  },

  box: {
    flex: 1,
    height: 100,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  incomeBox: {
    backgroundColor: '#00A86B',
    marginStart: 10,
    marginEnd: 5,
  },
  expenseBox: {
    backgroundColor: '#FD3C4A',
    marginStart: 5,
    marginEnd: 10,
  },
  tabItem: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemFocused: {
    borderRadius: 30,
    backgroundColor: 'black',
  },
  tabLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  tabLabelFocused: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default HomeScreen;

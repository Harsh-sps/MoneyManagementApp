import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {SceneMap, TabView} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import {DonutChart} from 'rn-circular-chart';
import {separateTransactions} from '../constants/SeparateTransactions';
import {TopHeader} from './Transaction';
import {formatData} from '../constants/ChartData';
import {combineIncomeAndExpenses} from '../constants/IncomeAndExpenses';

const Chart = ({transaction, totalLabel}) => {
  if (!transaction || transaction.length === 0) {
    return (
      <View style={styles.donutView}>
        <Text>No transactions data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.donutView}>
      <DonutChart
        data={formatData(transaction)}
        strokeWidth={15}
        radius={80}
        containerHeight={105 * 2}
        containerWidth={105 * 2}
        type="round"
        startAngle={0}
        endAngle={360}
        animationType="slide"
        centerLabel={{
          label: '',
          labelValue: totalLabel,
        }}></DonutChart>
    </View>
  );
};

const CategoryItem = ({color, totalAmount, currentAmount, category}) => {
  return (
    <View style={styles.categoryItemParentView}>
      <View style={styles.categoryTopView}>
        <View style={styles.categoryView}>
          <View
            style={[
              {backgroundColor: color, borderRadius: 10},
              styles.bulletView,
            ]}
          />
          <Text style={styles.categoryText}>{category}</Text>
        </View>
        <Text style={styles.amountText}>{currentAmount}</Text>
      </View>
      <CommonProgressBar
        current={currentAmount}
        total={totalAmount}
        color={color}
      />
    </View>
  );
};

const FirstRoute = ({transaction, isExpenses}) => {
  if (!transaction || transaction.length === 0) {
    return (
      <View style={styles.emptyView}>
        <Text>
          {isExpenses
            ? 'No expense data available'
            : 'No income data available'}
        </Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={transaction}
        renderItem={({item, index}) => (
          <CategoryItem
            color={item.moneyTransaction.color}
            totalAmount={50000}
            currentAmount={item.moneyTransaction.amount}
            category={item.moneyTransaction.finalCategory}
          />
        )}
        keyExtractor={item => item.id.toString()}></FlatList>
    </View>
  );
};

const CustomTabView = ({transactions, index, setIndex}) => {
  const renderScene = SceneMap({
    expenses: () => <FirstRoute transaction={transactions} isExpenses={true} />,
    income: () => <FirstRoute transaction={transactions} isExpenses={false} />,
  });

  const layout = useWindowDimensions();
  // const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'expenses', title: 'Expense'},
    {key: 'income', title: 'Income'},
  ]);

  const renderTabBar = props => (
    <View style={styles.customTabParentView}>
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

const CommonProgressBar = ({current, total, color}) => {
  const progress = total ? current / total : 0;
  return (
    <Progress.Bar
      progress={progress} // This is 60%, adjust based on your needs
      width={null}
      height={15}
      color={color}
      unfilledColor="white"
      borderRadius={10}
      borderWidth={0}
      style={styles.categoryProgressBar}
    />
  );
};

const StatiticsScreen = ({route, navigation}) => {
  const transactions = useSelector(state => state.transactions);
  const {expenses, incomes} = separateTransactions(transactions);
  const [index, setIndex] = useState(0);
  const {totalIncome = 0, totalExpenses = 0} =
    combineIncomeAndExpenses(transactions);
  return (
    <View style={styles.parentView}>
      <View style={styles.topContainer}>
        <TopHeader navigation={navigation} title={'Financial Report'} />
        <Chart
          transaction={index === 0 ? expenses : incomes}
          totalLabel={totalIncome - totalExpenses}
        />
      </View>
      <View style={styles.bottomContainer}>
        <CustomTabView
          transactions={index === 0 ? expenses : incomes}
          index={index}
          setIndex={setIndex}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentView: {
    backgroundColor: '#FFF6E5',
    flex: 1,
  },
  donutView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    flex: 1,
  },
  topContainer: {
    flex: 0.5,
  },
  bottomContainer: {
    flex: 0.5,
  },
  tabItem: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemFocused: {
    borderRadius: 30,
    backgroundColor: '#FD3C4A',
  },
  tabLabel: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
  tabLabelFocused: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  customTabParentView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 59,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#FCFCFC',
    marginHorizontal: 10,
    backgroundColor: '#FFFEFE',
  },
  categoryItemParentView: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  categoryTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryView: {
    flexDirection: 'row',
    borderRadius: 32,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  bulletView: {
    height: 15,
    width: 15,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212325',
    marginStart: 5,
  },
  categoryProgressBar: {
    marginTop: 10,
  },
  amountText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#FD3C4A',
  },
  emptyView: {
    backgroundColor: '#FFF6E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
});

export default StatiticsScreen;

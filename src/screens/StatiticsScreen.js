import React, {useState} from 'react';
import {
  ProgressBarAndroidBase,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {DonutChart} from 'rn-circular-chart';
import {TopHeader} from './Transaction';
import {SceneMap, TabView} from 'react-native-tab-view';
import * as Progress from 'react-native-progress';

const Data = [
  {name: 'my Name', value: 1000, color: '#AA86F7'},
  {name: 'Name', value: 3000, color: '#94D5FA'},
  {name: 'ac Name', value: 4000, color: '#8F9FF5'},
];

const Chart = () => {
  return (
    <View style={styles.donutView}>
      <DonutChart
        data={Data}
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
          labelValue: '₹94000.0',
        }}></DonutChart>
    </View>
  );
};

const CategoryItem = ({color, totalAmount, currentAmount}) => {
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
          <Text style={styles.categoryText}>Subscription</Text>
        </View>
        <Text style={styles.amountText}>5210</Text>
      </View>
      <CommonProgressBar
        current={currentAmount}
        total={totalAmount}
        color={color}
      />
    </View>
  );
};

const FirstRoute = () => {
  return (
    <View>
      <CategoryItem
        color={'#FCAC12'}
        totalAmount={10000}
        currentAmount={5000}
      />
      <CategoryItem
        color={'#7F3DFF'}
        totalAmount={10000}
        currentAmount={5000}
      />
      <CategoryItem
        color={'#FD3C4A'}
        totalAmount={10000}
        currentAmount={5000}
      />
      <CategoryItem
        color={'#FCAC12'}
        totalAmount={10000}
        currentAmount={5000}
      />
    </View>
  );
};
const renderScene = SceneMap({
  expenses: FirstRoute,
  income: FirstRoute,
});

const CustomTabView = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
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
  return (
    <View style={styles.parentView}>
      <View style={styles.topContainer}>
        <TopHeader navigation={navigation} title={'Financial Report'} />
        <Chart></Chart>
      </View>
      <View style={styles.bottomContainer}>
        <CustomTabView></CustomTabView>
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
});

export default StatiticsScreen;

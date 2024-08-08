import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import {TransactionScreen} from '../screens/Transaction';
import StatiticsScreen from '../screens/StatiticsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const ProfileScreen = () => {
  return <View></View>;
};

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Main"
        component={BottomTabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const CustomTabBarButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        top: -10,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow,
      }}
      onPress={onPress}
      activeOpacity={0.8}>
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 35,
          backgroundColor: '#7F3DFF',
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {...styles.outerContainer},
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/home.png')}
                style={{
                  width: 26,
                  height: 26,
                  tintColor: focused ? '#7F3DFF' : '#C6C6C6',
                }}></Image>

              <Text
                style={{color: focused ? '#7F3DFF' : '#C6C6C6', fontSize: 10}}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TransactionScreen"
        component={TransactionScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/transaction.png')}
                resizeMode="contain"
                style={{
                  width: 26,
                  height: 26,
                  tintColor: focused ? '#7F3DFF' : '#C6C6C6',
                }}></Image>

              <Text
                style={{color: focused ? '#7F3DFF' : '#C6C6C6', fontSize: 10}}>
                Transaction
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="AddTransactionScreen"
        component={AddTransactionScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/close.png')}
              style={{
                width: 26,
                height: 26,
                tintColor: '#FFFFFF',
              }}></Image>
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="StatiticsScreen"
        component={StatiticsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/pie-chart.png')}
                resizeMode="contain"
                style={{
                  width: 26,
                  height: 26,
                  tintColor: focused ? '#7F3DFF' : '#C6C6C6',
                }}></Image>

              <Text
                style={{color: focused ? '#7F3DFF' : '#C6C6C6', fontSize: 10}}>
                Statitics
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={StatiticsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/user.png')}
                resizeMode="contain"
                style={{
                  width: 26,
                  height: 26,
                  tintColor: focused ? '#7F3DFF' : '#C6C6C6',
                }}></Image>

              <Text
                style={{color: focused ? '#7F3DFF' : '#C6C6C6', fontSize: 10}}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    elevation: 20,
    height: 60,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default AppStack;

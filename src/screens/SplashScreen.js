import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const SplashScreen = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/splash_logo.png')}
        style={styles.topContainer}></Image>

      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Simple solution for your budget.</Text>
        <Text style={styles.content}>
          Counter and distribute the income correctly...
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Main')}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer: {
    flex: 0.5,
    width: '100%',
    resizeMode: 'stretch',
  },
  bottomContainer: {
    flex: 0.5,
    width: '100%',
    // alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  title: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 30,
    marginHorizontal: 20,
  },
  content: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 19,
    marginHorizontal: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 5,
    elevation: 5,
    marginTop: 50,
    width: '50%',
    height: 42,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default SplashScreen;

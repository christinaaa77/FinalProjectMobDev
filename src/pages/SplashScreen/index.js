import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Logo } from '../../assets/icons';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulating an HTTP request to http://192.168.1.13:3000/users
    fetch('http://192.168.1.13:3000/users')
      .then(response => response.json())
      .then(data => {
        if (data && data.id) {
          navigation.replace('Home');
        } else {
          setTimeout(() => {
            navigation.replace('Welcome');
          }, 3000);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setTimeout(() => {
          navigation.replace('Welcome');
        }, 3000);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Reminder App</Text>
      <Logo style={styles.logo} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A9D8F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontFamily: 'CircullarStd-Bold',
    color: '#EBFAF8',
  },
  logo: {
    color: '#EBFAF8',
  },
});

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Gap, Header } from '../../Components';
import { Bell, Off, Ringing, Vibrate, On } from '../../assets/icons';

const NotificationSet = ({ navigation }) => {
  const [isOff1, setIsOff1] = useState(true);
  const [isOff2, setIsOff2] = useState(true);
  const [isOff3, setIsOff3] = useState(true);
  const [isUserDataFilled, setIsUserDataFilled] = useState(false);

  useEffect(() => {
    fetch('http://192.168.1.13:3000/users')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setIsUserDataFilled(true);
        } else {
          setIsUserDataFilled(false);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const toggleSwitch1 = () => {
    setIsOff1(!isOff1);
  };

  const toggleSwitch2 = () => {
    setIsOff2(!isOff2);
  };

  const toggleSwitch3 = () => {
    setIsOff3(!isOff3);
  };

  const handleBackNavigation = () => {
    if (isUserDataFilled) {
      navigation.navigate('Profil');
    } else {
      navigation.navigate('Welcome');
    }
  };

  return (
    <View style={styles.page}>
      <Header title="Notifications" onBack={handleBackNavigation} />
      <View style={styles.contentWrapper}>
        <View style={styles.content}>
          <View style={styles.wrapper}>
            <View style={styles.iconContainer}>
              <Bell style={styles.icon} />
            </View>
            <Text style={styles.notificationText}>Notification</Text>
          </View>
          <TouchableOpacity onPress={toggleSwitch1}>
            {isOff1 ? <Off /> : <On />}
          </TouchableOpacity>
        </View>
        <Gap height={24} />
        <View style={styles.content}>
          <View style={styles.wrapper}>
            <View style={styles.iconContainer}>
              <Ringing style={styles.icon} />
            </View>
            <Text style={styles.notificationText}>Sound</Text>
          </View>
          <TouchableOpacity onPress={toggleSwitch2}>
            {isOff2 ? <Off /> : <On />}
          </TouchableOpacity>
        </View>
        <Gap height={24} />
        <View style={styles.content}>
          <View style={styles.wrapper}>
            <View style={styles.iconContainer}>
              <Vibrate style={styles.icon} />
            </View>
            <Text style={styles.notificationText}>Vibrate</Text>
          </View>
          <TouchableOpacity onPress={toggleSwitch3}>
            {isOff3 ? <Off /> : <On />}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.button}>
        <Button
          title="Continue"
          onPress={() => navigation.navigate('PersonalInfo')}
        />
      </View>
    </View>
  );
};

export default NotificationSet;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentWrapper: {
    marginTop: 24,
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#EBFAF8',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationText: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: 'white',
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
});

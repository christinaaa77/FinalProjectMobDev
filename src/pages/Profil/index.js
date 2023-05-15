import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BottomNavigation, Gap, Header, Photo } from '../../Components';
import { About, Arrow, Bell } from '../../assets/icons';

const Profil = ({ navigation }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('http://192.168.1.13:3000/users')
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          setName(data[0].name);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <View style={styles.page}>
      <View>
        <Header title="Profil" />
        <Gap height={24} />
        <Text style={styles.textHeader}>Account</Text>
        <Gap height={10} />
        <View style={styles.content}>
          <View style={styles.box}>
            <Photo />
            <View style={styles.text}>
              <Text>Personal Info</Text>
              <Text>{name}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('PersonalInfo')}>
            <Arrow />
          </TouchableOpacity>
        </View>
        <Gap height={24} />
        <Text style={styles.textHeader}>Settings</Text>
        <Gap height={10} />
        <View style={styles.content}>
          <View style={styles.wrapper}>
            <View style={styles.iconContainer}>
              <Bell style={styles.icon} />
            </View>
            <Text style={styles.notificationText}>Notification</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('NotificationSet')}>
            <Arrow />
          </TouchableOpacity>
        </View>
        <Gap height={10} />
        <View style={styles.content}>
          <View style={styles.wrapper}>
            <View style={styles.iconContainer}>
              <About style={styles.icon} />
            </View>
            <Text style={styles.notificationText}>About</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('About')}>
            <Arrow />
          </TouchableOpacity>
        </View>
      </View>
      <BottomNavigation />
    </View>
  );
};

export default Profil;

const styles = StyleSheet.create({
  page:{
    flex:1,
    backgroundColor:'white',
    justifyContent:'space-between',
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
  },
  content: {
    paddingHorizontal: 24,
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
  textHeader: {
    marginLeft: 24,
    color:'black',
  },
});

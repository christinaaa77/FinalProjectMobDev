import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { Add, HomeIcon, User } from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';

const HomeNavigation = () => {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate('Home'); // Ganti 'Home' dengan nama halaman Home yang sebenarnya
  };

  const goToProfile = () => {
    navigation.navigate('Profil'); // Ganti 'Profile' dengan nama halaman Profil yang sebenarnya
  };

  const goToAdd = () => {
    navigation.navigate('AddReminder'); // Ganti 'Add' dengan nama halaman Add yang sebenarnya
  };

  return (
    <View style={styles.navigation}>
      <View style={styles.container}>
        <TouchableOpacity onPress={goToHome}>
          <HomeIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToProfile}>
          <User />
        </TouchableOpacity>
      </View>
      <View style={styles.addIconContainer}>
        <TouchableOpacity onPress={goToAdd}>
          <Add style={styles.addIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeNavigation;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  navigation: {
    position: 'relative',
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 7,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  addIconContainer: {
    position: 'absolute',
    top: -20,
    left: windowWidth / 2 - 20, // Setengah dari lebar container minus setengah dari lebar addIconContainer
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addIcon: {
    width: 24,
    height: 24,
  },
});

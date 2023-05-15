import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {IconBack} from '../../../assets/icons';

const Header = ({title, onBack, hidden}) => {
  return (
    <View style={styles.container}>
      {onBack && (
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <IconBack/>
        </TouchableOpacity>
      )}
      <Text style={styles.text}>{title}</Text>
      {onBack && !hidden ? <View style={styles.placeholder} /> : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    backgroundColor: '#2A9D8F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flex: 1,
    fontSize: 27,
    fontFamily: 'CircullarStd-Bold',
    textAlign: 'center',
    color:'#EBFAF8',
  },
  backButton: {
    padding: 10,
  },
  placeholder: {
    width: 50, // Ubah lebar sesuai kebutuhan Anda
  },
});

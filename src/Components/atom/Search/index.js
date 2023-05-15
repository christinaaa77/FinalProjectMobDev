import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { SearchIcon } from '../../../assets/icons';

const Search = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <SearchIcon style={styles.Icon} />
        <TextInput style={styles.textInput} placeholder="Search your reminder" />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#020202',
    borderRadius: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  Icon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
  },
});


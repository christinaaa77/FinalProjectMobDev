import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Location, Repeat, RepeatOnce } from '../../../assets/icons';
import axios from 'axios';

const Reminders = ({ reminder }) => {
  return (
    <TouchableOpacity>
      <View style={styles.page}>
        <View style={styles.border}>
          <Text style={styles.input}>{reminder.title}</Text>
          <TextInput
            style={styles.input1}
            multiline={true}
            numberOfLines={4}
            value={reminder.description}
            editable={false}
          />
          <View style={styles.Location}>
            <Location />
            <Text style={styles.Text}>{reminder.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Reminders;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
  },
  border: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  input: {
    color: 'black',
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
  input1:{
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
  Location: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  Text: {
    color: 'black',
  },
});

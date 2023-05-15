import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {Button, Header} from '../../Components';
import {Location, Repeat, RepeatOnce} from '../../assets/icons';
import axios from 'axios';
import {ReminderContext} from '../../ReminderContext';

const AddReminder = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [repeat, setRepeat] = useState('once');
  const {addReminder} = useContext(ReminderContext);

  const handleSaveReminder = () => {
    const reminder = {
      title,
      description,
      location,
      repeat,
    };

    axios
      .post('http://192.168.1.13:3000/reminder', reminder)
      .then(response => {
        console.log('Reminder saved successfully:', response.data);
        // Reset the form fields
        setTitle('');
        setDescription('');
        setLocation('');
        setRepeat('once');
        addReminder(reminder);
        // Navigate to Home
        navigation.navigate('Home');
      })
      .catch(error => {
        console.error('Error saving reminder:', error);
      });
  };

  return (
    <View style={styles.page}>
      <View>
        <Header title="Add Reminder" />
        <View style={styles.containerContent}>
          <Text style={styles.text}>Title</Text>
          <View style={styles.border}>
            <TextInput
              style={styles.input}
              placeholder="Type Your Title here"
              value={title}
              onChangeText={text => setTitle(text)}
            />
          </View>
          <View style={styles.textDesc}>
            <Text style={styles.text}>Description</Text>
            <Text style={styles.text1}>(optional)</Text>
          </View>
          <View style={styles.border}>
            <TextInput
              style={styles.input}
              multiline={true}
              numberOfLines={4}
              placeholder="Type Your Description here"
              value={description}
              onChangeText={text => setDescription(text)}
            />
          </View>
          <Text style={styles.text}>Location</Text>
          <View style={styles.border}>
            <View style={styles.textInputContainer}>
              <Location style={styles.Icon} />
              <TextInput
                placeholder="location"
                value={location}
                onChangeText={text => setLocation(text)}
              />
            </View>
          </View>
          <Text style={styles.text}>Repeat</Text>
          <View style={styles.repeatContainer}>
            <TouchableOpacity
              style={
                repeat === 'once'
                  ? styles.repeatBorderActive
                  : styles.repeatBorder
              }
              onPress={() => setRepeat('once')}>
              <RepeatOnce />
              <Text>Once</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                repeat === 'everyday'
                  ? styles.repeatBorderActive
                  : styles.repeatBorder
              }
              onPress={() => setRepeat('everyday')}>
              <Repeat />
              <Text>Everyday</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.button}>
        <Button title="Save Changes" onPress={handleSaveReminder} />
      </View>
    </View>
  );
};

export default AddReminder;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'space-between',
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
  text: {
    color: 'black',
    marginRight: 10,
    paddingVertical: 10,
  },
  text1: {
    paddingVertical: 10,
  },
  textDesc: {
    flexDirection: 'row',
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
  containerContent: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  repeatBorder: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1,
    width: 120,
    height: 60,
    borderRadius: 20,
    borderColor: 'black',
  },
  repeatContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingBottom: 24,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
});

import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BottomNavigation,
  Gap,
  Header,
  Reminders,
  Search,
} from '../../Components';
import axios from 'axios';

const Triggered = ({navigation}) => {
  const [triggeredReminderList, setTriggeredReminderList] = useState([]);

  useEffect(() => {
    fetchTriggeredReminders();
  }, []);

  const fetchTriggeredReminders = () => {
    axios
      .get('http://192.168.1.13:3000/triggered')
      .then(response => {
        setTriggeredReminderList(response.data);
      })
      .catch(error => {
        console.error('Error fetching triggered reminders:', error);
      });
  };

  return (
    <View style={styles.page}>
      <View>
        <Header title="Triggered" onBack={() => navigation.navigate('Home')} />
        <Gap height={10} />
        <View style={styles.search}>
          <Search />
        </View>
        <View style={styles.reminder}>
          <ScrollView style={styles.verticalScrollView}>
            {triggeredReminderList.map((reminder, index) => (
              <View
                key={reminder.id}
                style={[
                  styles.reminderItem,
                  index !== 0 && styles.reminderItemMarginTop,
                ]}>
                <Reminders reminder={reminder} />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  reminder: {
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  verticalScrollView: {
    height: 500,
  },
  search: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  reminderItem: {
    marginBottom: 10,
  },
  reminderItemMarginTop: {
    marginTop: 10,
  },
});

export default Triggered;

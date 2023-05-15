import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import {Gap, Photo, Reminders, Search} from '../../Components';
import HomeNavigation from '../../Components/molecules/bottomNavigation';
import {ReminderContext} from '../../ReminderContext';
import Swipeable from 'react-native-swipeable';

const Home = ({navigation}) => {
  const [photoUri, setPhotoUri] = useState(null);
  const [reminderList, setReminderList] = useState([]);
  const [triggeredReminderList, setTriggeredReminderList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const {reminders, addReminder} = useContext(ReminderContext);
  const [name, setName] = useState('');

  const handlePhotoChange = uri => {
    setPhotoUri(uri);
  };

  const fetchReminders = () => {
    axios
      .get('http://192.168.1.13:3000/reminder')
      .then(response => {
        setReminderList(response.data);
      })
      .catch(error => {
        console.error('Error fetching reminders:', error);
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

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

  const fetchName = () => {
    axios
      .get('http://192.168.1.13:3000/users')
      .then(response => {
        if (response.data && response.data.length > 0) {
          setName(response.data[0].name);
        }
      })
      .catch(error => {
        console.error('Error fetching name:', error);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchReminders();
    fetchTriggeredReminders();
  };

  const markAsDone = reminder => {
    axios
      .get('http://192.168.1.13:3000/triggered')
      .then(response => {
        const triggeredReminders = response.data;

        // Cek apakah terdapat tabrakan ID dengan triggered reminders
        const collidedID = triggeredReminders.find(
          triggeredReminder => triggeredReminder.id === reminder.id,
        );

        if (collidedID) {
          // Terdapat tabrakan ID, cari ID yang tersedia dengan melakukan perulangan
          let newID = reminder.id + 1;
          while (
            triggeredReminders.find(
              triggeredReminder => triggeredReminder.id === newID,
            )
          ) {
            newID++;
          }

          // Update ID pada reminder
          const updatedReminder = {...reminder, id: newID, status: 'triggered'};

          axios
            .post('http://192.168.1.13:3000/triggered', updatedReminder)
            .then(response => {
              console.log('Reminder marked as done:', response.data);
              axios
                .delete(`http://192.168.1.13:3000/reminder/${reminder.id}`)
                .then(deleteResponse => {
                  console.log('Reminder deleted:', deleteResponse.data);
                  setReminderList(prevList =>
                    prevList.filter(item => item.id !== reminder.id),
                  );
                  addReminder(updatedReminder);
                })
                .catch(error => {
                  console.error('Error deleting reminder:', error);
                });
            })
            .catch(error => {
              console.error('Error marking reminder as done:', error);
            });
        } else {
          // Tidak ada tabrakan ID, langsung tandai reminder sebagai "triggered"
          const updatedReminder = {...reminder, status: 'triggered'};

          axios
            .post('http://192.168.1.13:3000/triggered', updatedReminder)
            .then(response => {
              console.log('Reminder marked as done:', response.data);
              axios
                .delete(`http://192.168.1.13:3000/reminder/${reminder.id}`)
                .then(deleteResponse => {
                  console.log('Reminder deleted:', deleteResponse.data);
                  setReminderList(prevList =>
                    prevList.filter(item => item.id !== reminder.id),
                  );
                  addReminder(updatedReminder);
                })
                .catch(error => {
                  console.error('Error deleting reminder:', error);
                });
            })
            .catch(error => {
              console.error('Error marking reminder as done:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error fetching triggered reminders:', error);
      });
  };

  const deleteReminder = reminder => {
    axios
      .delete(`http://192.168.1.13:3000/reminder/${reminder.id}`)
      .then(response => {
        console.log('Reminder deleted:', response.data);
        setReminderList(prevList =>
          prevList.filter(item => item.id !== reminder.id),
        );
      })
      .catch(error => {
        console.error('Error deleting reminder:', error);
      });
  };

  const renderReminderItem = (reminder, swipeable = true) => {
    const swipeRightContent = (
      <TouchableOpacity
        style={styles.markAsDoneButton}
        onPress={() => markAsDone(reminder)}>
        <Text style={styles.markAsDoneButtonText}>Mark as Done</Text>
      </TouchableOpacity>
    );

    const swipeLeftContent = (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteReminder(reminder)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    );

    return (
      <Swipeable
        rightContent={swipeable ? swipeRightContent : null}
        leftContent={swipeable ? swipeLeftContent : null}
        onRightActionRelease={() => markAsDone(reminder)}
        onLeftActionRelease={() => deleteReminder(reminder)}
        animationOptions={{
          useNativeDriver: true,
        }}
        key={reminder.id}>
        <View style={styles.reminderBox}>
          <Reminders reminder={reminder} />
        </View>
      </Swipeable>
    );
  };

  useEffect(() => {
    fetchReminders();
    fetchTriggeredReminders();
    fetchName();
  }, []);

  return (
    <View style={styles.page}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.containerHome}>
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>Hi, {name}</Text>
              <Text style={styles.subtitle}>What plans do you have today?</Text>
            </View>
            <Photo onPhotoChange={handlePhotoChange} />
          </View>
          <Gap height={20} />
          <View style={styles.search}>
            <Search />
          </View>
        </View>
        <View style={styles.containerScroller}>
          <View style={styles.container}>
            <Text style={styles.Text}>Triggered Reminder</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Triggered')}>
              <Text style={styles.Text}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} style={styles.ScrollViewRow}>
            {triggeredReminderList.map(reminder =>
              renderReminderItem(reminder, false),
            )}
          </ScrollView>
        </View>
        <View style={styles.containerScroller}>
          <View style={styles.container}>
            <Text style={styles.Text}>Not Yet Triggered</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Reminder')}>
              <Text style={styles.Text}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.verticalScrollView}>
            {reminderList.map(reminder => renderReminderItem(reminder, true))}
          </ScrollView>
        </View>
      </ScrollView>
      <HomeNavigation />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#EBFAF8',
    justifyContent: 'space-between',
  },
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 24,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Text: {
    color: 'black',
  },
  title: {
    fontSize: 27,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  addPhoto: {
    height: 50,
    width: 50,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoText: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    maxWidth: 40,
    textAlign: 'center',
  },
  containerHome: {
    paddingBottom: 20,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  containerScroller: {
    backgroundColor: '#EBFAF8',
  },
  containerReminder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 10,
    backgroundColor: 'white',
  },
  ScrollViewRow: {
    flexDirection: 'row',
    width: 500,
  },
  verticalScrollView: {
    height: 228,
  },
  search: {
    paddingHorizontal: 24,
  },
  reminderBox: {
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
});

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, Header, Photo, TextInput} from '../../Components';
import {Male, Female} from '../../assets/icons';

const PersonalInfo = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetch('http://192.168.1.13:3000/users')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && data.length === 0) {
          setEditMode(true);
        } else if (data && data.length > 0) {
          const user = data.find(u => u.id === 1);
          setName(user.name);
          setEmail(user.email);
          setGender(user.gender);
          setUserData(user);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSaveChanges = () => {
    const user = {
      id: 1,
      name: name,
      email: email,
      gender: gender,
    };

    const endpoint = userData
      ? 'http://192.168.1.13:3000/users/1'
      : 'http://192.168.1.13:3000/users';

    const method = userData ? 'PUT' : 'POST';

    fetch(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        console.log('User updated successfully:', {...user, ...data});
        setUserData({...user, ...data});
        setEditMode(false);

        if (userData) {
          navigation.navigate('Home');
        }
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  const handleGenderPress = selectedGender => {
    if (editMode) {
      setGender(selectedGender);
    }
  };

  return (
    <View style={styles.page}>
      <Header
        title="PersonalInfo"
        onBack={() => {
          if (userData) {
            navigation.navigate('Profil');
          } else {
            navigation.navigate('NotificationSet');
          }
        }}
      />
      <View style={styles.containerContent}>
        <View style={styles.avatarWrapper}>
          <Photo />
        </View>

        <TextInput
          title="Name"
          placeholder="Type your name here"
          value={name}
          onChangeText={text => setName(text)}
          editable={editMode}
        />
        <TextInput
          title="Email address"
          placeholder="Type your email here"
          value={email}
          onChangeText={text => setEmail(text)}
          editable={editMode}
        />

        <Text style={styles.genderText}>Gender</Text>
        <View style={styles.genderContainer}>
          {!editMode && (
            <TouchableOpacity style={styles.genderBorder} disabled>
              {gender === 'Male' ? <Male /> : <Female />}
              <Text>{gender}</Text>
            </TouchableOpacity>
          )}
          {editMode && (
            <TouchableOpacity
              style={[
                styles.genderBorder,
                gender === 'Male' ? styles.selectedGender : null,
              ]}
              onPress={() => handleGenderPress('Male')}
              disabled={!editMode}>
              <Male />
              <Text>Male</Text>
            </TouchableOpacity>
          )}
          {editMode && (
            <TouchableOpacity
              style={[
                styles.genderBorder,
                gender === 'Female' ? styles.selectedGender : null,
              ]}
              onPress={() => handleGenderPress('Female')}
              disabled={!editMode}>
              <Female />
              <Text>Female</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.button}>
        {editMode ? (
          <Button title="Save Changes" onPress={handleSaveChanges} />
        ) : (
          <Button title="Edit" onPress={handleEdit} />
        )}
      </View>
    </View>
  );
};
export default PersonalInfo;
const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  containerContent: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  genderText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 6,
    color: 'black',
  },
  avatarWrapper: {
    alignItems: 'center',
  },
  button: {
    alignSelf: 'flex-end',
  },
  genderBorder: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1,
    width: 120,
    height: 60,
    borderRadius: 20,
    borderColor: 'black',
  },
  genderContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingBottom: 24,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
});

import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Photo = ({ onPhotoChange }) => {
  const [avatarUri, setAvatarUri] = useState(null);

  useEffect(() => {
    getSavedImage();
  }, []);

  const getSavedImage = async () => {
    try {
      const uri = await AsyncStorage.getItem('avatarUri');
      setAvatarUri(uri);
    } catch (error) {
      console.error('Error retrieving saved image:', error);
    }
  };

  const handleAvatarClick = () => {
    if (avatarUri) {
      // Ask for confirmation before deleting the photo
      Alert.alert(
        'Delete Photo',
        'Are you sure you want to delete your photo?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: deleteAvatar,
          },
        ],
      );
    } else {
      ImagePicker.openPicker({
        mediaType: 'photo',
        multiple: false,
        includeBase64: true,
        compressImageQuality: 1,
        compressImageMaxWidth: 300,
        compressImageMaxHeight: 300,
      })
        .then(response => {
          if (!response.cancelled) {
            const uri = `data:${response.mime};base64,${response.data}`;
            setAvatarUri(uri);
            saveAvatarToServer(response.data);
            saveAvatarUriToStorage(uri);
            onPhotoChange(uri); // Invoke the callback function in the parent component
          }
        })
        .catch(error => {
          console.log('Image picker error:', error);
        });
    }
  };

  const deleteAvatar = async () => {
    try {
      await AsyncStorage.removeItem('avatarUri');
      setAvatarUri(null);
      console.log('Avatar deleted successfully');
    } catch (error) {
      console.error('Error deleting avatar:', error);
    }
  };

  const saveAvatarToServer = (base64Data) => {
    const photos = {
      avatar: base64Data,
    };

    fetch('http://192.168.1.13:3000/photos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(photos),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Avatar saved successfully:', data);
      })
      .catch(error => {
        console.error('Error saving avatar:', error);
      });
  };

  const saveAvatarUriToStorage = async (uri) => {
    try {
      await AsyncStorage.setItem('avatarUri', uri);
      console.log('Avatar URI saved successfully');
    } catch (error) {
      console.error('Error saving avatar URI:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleAvatarClick}>
        <View style={styles.border}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
          ) : (
            <View style={styles.addPhoto}>
              <Text style={styles.addPhotoText}>Add Photo</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Photo;


const styles = StyleSheet.create({
  addPhoto: {
    height: 90,
    width: 90,
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
  border: {
    borderWidth: 1,
    borderColor: '#8D92A3',
    width: 110,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

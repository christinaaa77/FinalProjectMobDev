import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Header } from '../../Components';

const WelcomingScreen = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header title='Welcome'/>
      <View style={styles.containerText}>
        <Text style={styles.title}>Welcome To Reminder App</Text>
        <Text style={styles.subtitle}>Salam! ReminderApp hadir untuk membantu Anda menjaga waktu dan meraih keberhasilan.</Text>
      </View>
      <View style={styles.containerButton}>
      <Button title='Get Started' onPress={() => navigation.navigate('NotificationSet')}/>
      </View>
    </View>
  )
}

export default WelcomingScreen;

const styles = StyleSheet.create({
    page:{
        flex:1,
        justifyContent:'space-between',
        backgroundColor:'white',
    },
    containerText:{
        paddingHorizontal:24,
        paddingVertical:20,
        justifyContent:'center',
        alignItems:'center',
    },
    containerButton:{
        paddingHorizontal:24,
        paddingVertical:20,
    },
    title:{
        color:'black',
        fontSize:24,
        paddingBottom:20,
    },
})
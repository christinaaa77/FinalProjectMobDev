import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header } from '../../Components';
import HomeNavigation from '../../Components/molecules/bottomNavigation';

const About = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header title='Welcome'onBack={() => navigation.navigate('Profil')}/>
      <View style={styles.containerText}>
        <Text style={styles.title}>About</Text>
        <Text style={styles.subtitle}>Reminder App adalah sebuah aplikasi yang dirancang untuk membantu pengguna mengatur dan mengingat berbagai tugas, acara, atau kegiatan penting dalam kehidupan sehari-hari. Aplikasi ini menyediakan fitur untuk membuat, mengatur, dan mengelola daftar pengingat dengan mudah.</Text>
      </View>
      <HomeNavigation/>
    </View>
  )
}

export default About;

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
    title:{
        color:'black',
        fontSize:24,
        paddingBottom:20,
    },
})
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, ImageBackground } from 'react-native';
import { TouchableOpacity, Image } from 'react-native'; 
export default function Home({navigation}) {
    return (
       <ImageBackground style = {{
           width : '100%',
           height : '100%',
       }} source = {require("../assets/bg.jpg")}>
            <View style = {styles.container}>
            <TouchableOpacity style = {styles.opacity}
            onPress={() => navigation.navigate('Dashboard')}>
                <Text>Dashboard</Text>
                </TouchableOpacity> 
            
        </View>
       </ImageBackground>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
     // backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    opacity: {
        height: 40,
        width: 100,
        backgroundColor: 'lightgreen',
        alignItems: 'center',
        justifyContent: 'center',
    }
  });
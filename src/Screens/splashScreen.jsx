import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LoginScreen'); 
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <FontAwesome5 name="money-bill-wave" size={100} color="#2ecc71" />
      <Text style={styles.text}> Welcome To Coro</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34495e',
  },
});

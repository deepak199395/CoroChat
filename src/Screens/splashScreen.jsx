import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LoginScreen');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYTkpDt7RrI8-Wy1ns7CM6Kgwb9wJ3vsDadA&s',
        }}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome to Coro App</Text>

      {/* Subtitle fixed at bottom */}
      <View style={styles.footer}>
        <Text style={styles.subtitle}>Powered by Deepak Yadav and Team</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  logo: {
    width: 250,
    height: 250,
  },
  title: {
    marginTop: 30,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#7f8c8d',
  },
});

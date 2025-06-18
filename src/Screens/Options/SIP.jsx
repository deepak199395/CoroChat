import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const SIP = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIP</Text>
      <Text style={styles.subtitle}>Coming Soon...</Text>
    </View>
  );
};

export default SIP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
  },
});

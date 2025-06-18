import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ITR = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Income Tax Return</Text>
      <Text style={styles.comingSoon}>Coming Soon...</Text>
    </View>
  );
};

export default ITR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  comingSoon: {
    fontSize: 18,
    color: '#888',
    fontStyle: 'italic',
  },
});

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const BankDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bank Details</Text>
      <Text style={styles.subtitle}>Coming Soon...</Text>
    </View>
  );
};

export default BankDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    justifyContent: 'center',
    alignItems: 'center',
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

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Linking,
} from 'react-native';
import React, { useState } from 'react';

const ITR = () => {
  const [panInput, setPanInput] = useState('');

  const openITRWebsite = () => {
    const url = 'https://www.incometax.gov.in/iec/foportal';
    Linking.openURL(url).catch(err =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Income Tax Return</Text>
      <Text style={styles.comingSoon}>Coming Soon...</Text>

      <TextInput
        placeholder="Enter your PAN"
        value={panInput}
        onChangeText={setPanInput}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={openITRWebsite}>
        <Text style={styles.buttonText}>Visit Income Tax Website</Text>
      </TouchableOpacity>
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
    padding: 20,
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
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2980b9',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

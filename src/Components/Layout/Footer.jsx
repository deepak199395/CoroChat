import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();

  const handleHomeScreen = () => {
    navigation.navigate("home");
  };

  const handlePackegeScreen = () => {
    navigation.navigate("Packege");
  };

  const handleSavingScreen = () => {
    navigation.navigate("Saving");
  };

  const handleOptionScreen = () => {
    navigation.navigate("Options");
  };

  return (
    <View style={styles.MainFooterContainer}>
      <TouchableOpacity style={styles.footerButton} onPress={handleHomeScreen}>
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerButton} onPress={handlePackegeScreen}>
        <Text style={styles.footerText}>Package</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerButton} onPress={handleSavingScreen}>
        <Text style={styles.footerText}>Saving</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerButton} onPress={handleOptionScreen}>
        <Text style={styles.footerText}>Options</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  MainFooterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  footerButton: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  footerText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
});

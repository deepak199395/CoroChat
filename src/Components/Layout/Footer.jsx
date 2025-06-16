import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

<FontAwesomeIcon name="money" size={30} color="green" />

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
        <Icon name="home" size={30} color="#900" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerButton} onPress={handlePackegeScreen}>
        <FontAwesomeIcon name="money" size={30} color="green" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerButton} onPress={handleSavingScreen}>
        <FontAwesome5Icon name="piggy-bank" size={30} color="green" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerButton} onPress={handleOptionScreen}>
        <MaterialIcon name="settings" size={30} color="#000" />

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

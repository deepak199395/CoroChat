import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import Home from "../../Assets/home.png";
import Packege from "../../Assets/pockete.png";
import saving from "../../Assets/save.png";
import Options from "../../Assets/Options.png";
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
    const navigation = useNavigation();

  const handleHomeScreen=()=>{
    navigation.navigate("home")
  }
  const handlePackegeScreen=()=>{
    navigation.navigate("Packege")

  }
  const handleSavigScreen=()=>{
    navigation.navigate("Saving")

  }
  const handleOptionScreen=()=>{
    navigation.navigate("Options")

  }

  return (
    <View style={styles.MainFooterContainer}>
      <TouchableOpacity style={styles.footerButton} onPress={handleHomeScreen}>
        <Image source={Home} style={styles.iconStyle} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerButton} onPress={handlePackegeScreen}>
        <Image source={Packege} style={styles.iconStyle} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerButton} onPress={handleSavigScreen}>
        <Image source={saving} style={styles.iconStyle} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerButton} onPress={handleOptionScreen}>
        <Image source={Options} style={styles.iconStyle} />
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
    marginBottom: 0,
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
  iconStyle: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

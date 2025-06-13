import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View style={styles.MainHeaderContainer}>
      <View style={styles.profileContainer}>
       <Text>Frofile</Text>
        <Text>Deepak yadav</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  MainHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    width:"98%",
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderWidth: 1, 
    borderRadius: 10,
    borderColor: '#ccc',
    marginTop:5,
    marginLeft:5,   
   },
  profileContainer: {
    flexDirection:"row",
    justifyContent: 'center',
    alignItems: 'center',
    gap:15
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  button: {
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'Black',
  },
});

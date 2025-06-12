import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Footer from '../../Components/Layout/Footer';
import { useNavigation } from '@react-navigation/native';

const Packege = () => {
    const navigation = useNavigation();
    
    const handleCreateForm=()=>{
    navigation.navigate('CreateDueForm')
    }
  return (
    <View style={styles.Container}>
      <View style={styles.PackegeContainer}>
        <TouchableOpacity style={styles.CreateDue} onPress={handleCreateForm}>
          <Text style={styles.buttonText}>Create Due</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.CreateDue}>
          <Text style={styles.buttonText}>View Due</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
};

export default Packege;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  PackegeContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
  },
  CreateDue: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '60%',
    alignItems: 'center',
    elevation: 3, // adds Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

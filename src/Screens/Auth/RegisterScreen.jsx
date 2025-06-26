import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    age: '',
    citizenship: '',
    address: '',
    role: 'user',
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    // basic validation
    const {
      name,
      email,
      password,
      phone,
      gender,
      age,
      address,
    } = formData;

    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !gender ||
      !age ||
      !address
    ) {
      Alert.alert('Validation Error', 'Please fill all required fields');
      return;
    }
try {
      const response = await fetch(
        'https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/createcoroUser/Create-CoroUser/api31',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log(data);

      if (data.flage === 'Y') {
        Alert.alert('Success', 'User registered successfully', [
          {
            text: 'Go to Login',
            onPress: () => navigation.navigate('LoginScreen'),
          },
        ]);
        setFormData({
          name: '',
          email: '',
          password: '',
          phone: '',
          gender: '',
          age: '',
          citizenship: '',
          address: '',
          role: 'user',
        });
      } else {
        Alert.alert('Error', data.message || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#666"
        value={formData.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#666"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#666"
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry
      />
     <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#666"
        value={formData.phone}
        onChangeText={(text) => handleChange('phone', text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        placeholderTextColor="#666"
        value={formData.gender}
        onChangeText={(text) => handleChange('gender', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        placeholderTextColor="#666"
        value={formData.age}
        onChangeText={(text) => handleChange('age', text)}
        keyboardType="number-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Citizenship"
        placeholderTextColor="#666"
        value={formData.citizenship}
        onChangeText={(text) => handleChange('citizenship', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#666"
        value={formData.address}
        onChangeText={(text) => handleChange('address', text)}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#eaf6f6',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0a3d62',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#16a085',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

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
    const { name, email, password, phone, gender, age, address } = formData;

    if (!name || !email || !password || !phone || !gender || !age || !address) {
      Alert.alert('Validation Error', 'Please fill all required fields');
      return;
    }

    try {
      const response = await fetch(
        'https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/createcoroUser/Create-CoroUser/api31',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

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
    <ImageBackground
      source={{ uri: 'https://i.ibb.co/3WkZWvM/bg-gradient2.jpg' }}
      resizeMode="cover"
      style={styles.background}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.formBox}>
            <Text style={styles.title}>📝 Create New Account</Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#999"
              value={formData.name}
              onChangeText={(text) => handleChange('name', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => handleChange('password', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(text) => handleChange('phone', text)}
            />

            <Text style={styles.label}>Gender</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.gender}
                onValueChange={(value) => handleChange('gender', value)}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>

            <Text style={styles.label}>Age</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.age}
                onValueChange={(value) => handleChange('age', value)}
              >
                <Picker.Item label="Select Age" value="" />
                {Array.from({ length: 83 }, (_, i) => (
                  <Picker.Item key={i} label={`${i + 18}`} value={`${i + 18}`} />
                ))}
              </Picker>
            </View>

            <Text style={styles.label}>Citizenship</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.citizenship}
                onValueChange={(value) => handleChange('citizenship', value)}
              >
                <Picker.Item label="Select Citizenship" value="" />
                <Picker.Item label="Indian" value="Indian" />
                <Picker.Item label="American" value="American" />
                <Picker.Item label="Canadian" value="Canadian" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>

            <Text style={styles.label}>City</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.address}
                onValueChange={(value) => handleChange('address', value)}
              >
                <Picker.Item label="Select City" value="" />
                <Picker.Item label="Mumbai" value="Mumbai" />
                <Picker.Item label="Delhi" value="Delhi" />
                <Picker.Item label="Bangalore" value="Bangalore" />
                <Picker.Item label="Hyderabad" value="Hyderabad" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>🚀 Register</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => navigation.navigate('LoginScreen')}
            >
              <Text style={styles.loginText}>Already have an account? <Text style={styles.loginBold}>Login</Text></Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default RegisterScreen;
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 20,
    justifyContent: 'center',
  },
  formBox: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: '#555',
    fontSize: 16,
  },
  loginBold: {
    color: '#e74c3c',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

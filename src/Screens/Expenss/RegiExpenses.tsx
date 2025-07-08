import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';

const RegiExpenses = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    income: '',
    bank: '',
    pan: '',
    limit: '',
    address: '',
    folioNumber: ''
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleRegister = async () => {
    const { name, email, income, bank, pan, limit, address,folioNumber } = form;
    if (!name || !email || !income || !bank || !pan || !limit || !address || !folioNumber) {
      Alert.alert("Please fill all the fields");
      return;
    }

    try {
      const response = await fetch(
        'https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/createExpessDiary/expess-diry/api37',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        }
      );

      const data = await response.json();
      if (data.success) {
        Alert.alert("Expense profile registered successfully!");
        setForm({
          name: '',
          email: '',
          income: '',
          bank: '',
          pan: '',
          limit: '',
          address: '',
          folioNumber: ''
        });
      } else {
        Alert.alert("Failed to register expense profile. Please try again.");
      }

    } catch (error) {
      console.error("Error registering expense profile:", error);
      Alert.alert("An error occurred while registering. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Register Expense Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your Name"
        placeholderTextColor="#999"
        value={form.name}
        onChangeText={(text) => handleChange('name', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your Email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Monthly Income"
        keyboardType="numeric"
        placeholderTextColor="#999"
        value={form.income}
        onChangeText={(text) => handleChange('income', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Bank Name"
        placeholderTextColor="#999"
        value={form.bank}
        onChangeText={(text) => handleChange('bank', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your PAN Number"
        placeholderTextColor="#999"
        autoCapitalize="characters"
        value={form.pan}
        onChangeText={(text) => handleChange('pan', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Set your limit for expenses"
        keyboardType="numeric"
        placeholderTextColor="#999"
        value={form.limit}
        onChangeText={(text) => handleChange('limit', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your Address"
        placeholderTextColor="#999"
        value={form.address}
        onChangeText={(text) => handleChange('address', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Your Folio Number"
        keyboardType="numeric"
        placeholderTextColor="#999"
        value={form.folioNumber}
        onChangeText={(text) => handleChange('folioNumber', text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegiExpenses;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

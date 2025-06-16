import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    occupation: "",
    workExperience: "",
    salary: "",
    currentfirm: "",
    address: ""
  });
   const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
   const handleSubmit = async () => {
    try {
      const response = await fetch("https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/profileDetails/Create-Profile/api25",{
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData)
      });
     const data = await response.json();
     console.log(data);
     
      if (data.success) {
        Alert.alert("Success", "Loan Due Created Successfully", [
          {
            text: "Allow to submit details",
            onPress: () => navigation.navigate("UserProfile", { loan: data.data })
          }
        ]);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          dob: "",
          occupation: "",
          workExperience: "",
          salary: "",
          currentfirm: "",
          address: ""
        });
      } else {
        Alert.alert("Error", "Failed to submit User Details");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register your self</Text>

      <TextInput
        style={styles.input}
        placeholder=" Name"
        placeholderTextColor="#666"
        value={formData.firstName}
        onChangeText={(text) => handleChange('firstName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="#666"
        value={formData.lastName}
        onChangeText={(text) => handleChange('lastName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="DOB (YYYY-MM-DD)"
        placeholderTextColor="#666"
        value={formData.dob}
        onChangeText={(text) => handleChange('dob', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#666"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Occupations"
        placeholderTextColor="#666"
        value={formData.occupation}
        onChangeText={(text) => handleChange('occupation', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Work Experince"
        keyboardType="numeric"
        placeholderTextColor="#666"
        value={formData.workExperience}
        onChangeText={(text) => handleChange('workExperience', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Monthly Salary"
        keyboardType="numeric"
        placeholderTextColor="#666"
        value={formData.salary}
        onChangeText={(text) => handleChange('salary', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Current Working Firm Name"
        placeholderTextColor="#666"
        value={formData.currentfirm}
        onChangeText={(text) => handleChange('currentfirm', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#666"
        value={formData.address}
        onChangeText={(text) => handleChange('address', text)}
      />

      {/* Upload Image feature can go here later */}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
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
    fontSize: 24,
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
    marginBottom: 12,
    backgroundColor: '#ffffff',
    color: '#333',
  },
  uploadButton: {
    backgroundColor: '#2980b9',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  uploadText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
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

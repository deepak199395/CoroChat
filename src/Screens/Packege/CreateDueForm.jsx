import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
//mport * as DateTimePicker from '@react-native-community/datetimepicker';
//import DateTimePicker from '@react-native-community/datetimepicker';

const CreateDueForm = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    loanId: '',
    email: '',
    loanAmount: '',
    loanStartDate: '',
    loanEndDate: '',
    loanDurationInMonth: '',
    loanInterestRate: '',
    loanStatus: '',
    loanPaymentStatus: '',
    loanPaymentMode: '',
    payedEMInumber: '',
    payedEMIAmount: '',
    RemainingEMInumber: '',
    EmiAmmount: '',
    RemainingEmiAmmount: ''
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleDateChange = (event, selectedDate, key) => {
    const currentDate = selectedDate || formData[key];
    if (Platform.OS === 'android') {
      key === 'loanStartDate'
        ? setShowStartDatePicker(false)
        : setShowEndDatePicker(false);
    }
    const formatted = new Date(currentDate).toISOString().split('T')[0];
    handleChange(key, formatted);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/loans/Create-LoanDue/api22", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          loanAmount: parseFloat(formData.loanAmount),
          loanDurationInMonth: parseInt(formData.loanDurationInMonth),
          loanInterestRate: parseFloat(formData.loanInterestRate),
          payedEMInumber: parseInt(formData.payedEMInumber),
          payedEMIAmount: parseFloat(formData.payedEMIAmount),
          RemainingEMInumber: parseInt(formData.RemainingEMInumber),
          EmiAmmount: parseFloat(formData.EmiAmmount),
          RemainingEmiAmmount: parseFloat(formData.RemainingEmiAmmount),
        })
      });

      const data = await response.json();

      if (data?.success) {
        Alert.alert("Success", "Loan Due Created Successfully", [
          {
            text: "View Loan",
            onPress: () => navigation.navigate("Showloan", { loan: data.data })
          }
        ]);
        setFormData({
          loanId: '',
          email: '',
          loanAmount: '',
          loanStartDate: '',
          loanEndDate: '',
          loanDurationInMonth: '',
          loanInterestRate: '',
          loanStatus: '',
          loanPaymentStatus: '',
          loanPaymentMode: '',
          payedEMInumber: '',
          payedEMIAmount: '',
          RemainingEMInumber: '',
          EmiAmmount: '',
          RemainingEmiAmmount: ''
        });
      } else {
        Alert.alert("Error", data?.message || "Submission failed");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎯 Create Loan Due</Text>

      {[
        { key: 'loanId', label: 'Finance Company Name' },
        { key: 'email', label: 'Email' },
        { key: 'loanAmount', label: 'Loan Amount', keyboardType: 'numeric' },
        { key: 'loanDurationInMonth', label: 'Loan Duration (Months)', keyboardType: 'numeric' },
        { key: 'loanInterestRate', label: 'Interest Rate (%)', keyboardType: 'numeric' },
        { key: 'payedEMInumber', label: 'Paid EMI Count', keyboardType: 'numeric' },
        { key: 'payedEMIAmount', label: 'Paid EMI Amount', keyboardType: 'numeric' },
        { key: 'RemainingEMInumber', label: 'Remaining EMI Count', keyboardType: 'numeric' },
        { key: 'EmiAmmount', label: 'Monthly EMI Amount', keyboardType: 'numeric' },
        { key: 'RemainingEmiAmmount', label: 'Remaining EMI Amount', keyboardType: 'numeric' },
      ].map((input) => (
        <TextInput
          key={input.key}
          style={styles.input}
          placeholder={input.label}
          placeholderTextColor="#888"
          keyboardType={input.keyboardType || 'default'}
          value={formData[input.key]}
          onChangeText={(text) => handleChange(input.key, text)}
        />
      ))}

      {/* Start Date */}
      <TouchableOpacity style={styles.input} onPress={() => setShowStartDatePicker(true)}>
        <Text style={{ color: formData.loanStartDate ? '#000' : '#999' }}>
          {formData.loanStartDate || '📅 Select Start Date'}
        </Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker.default
          value={formData.loanStartDate ? new Date(formData.loanStartDate) : new Date()}
          mode="date"
          display="default"
          onChange={(e, date) => handleDateChange(e, date, 'loanStartDate')}
        />
      )}

      {/* End Date */}
      <TouchableOpacity style={styles.input} onPress={() => setShowEndDatePicker(true)}>
        <Text style={{ color: formData.loanEndDate ? '#000' : '#999' }}>
          {formData.loanEndDate || '📅 Select End Date'}
        </Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker.default
          value={formData.loanEndDate ? new Date(formData.loanEndDate) : new Date()}
          mode="date"
          display="default"
          onChange={(e, date) => handleDateChange(e, date, 'loanEndDate')}
        />
      )}

      {/* Pickers */}
      <RNPickerSelect
        style={pickerSelectStyles}
        value={formData.loanStatus}
        onValueChange={(value) => handleChange('loanStatus', value)}
        placeholder={{ label: '📌 Select Loan Status', value: '' }}
        items={[
          { label: 'Active', value: 'Active' },
          { label: 'Closed', value: 'Closed' }
        ]}
      />

      <RNPickerSelect
        style={pickerSelectStyles}
        value={formData.loanPaymentStatus}
        onValueChange={(value) => handleChange('loanPaymentStatus', value)}
        placeholder={{ label: '📍 Select Payment Status', value: '' }}
        items={[
          { label: 'Pending', value: 'Pending' },
          { label: 'Completed', value: 'Completed' }
        ]}
      />

      <RNPickerSelect
        style={pickerSelectStyles}
        value={formData.loanPaymentMode}
        onValueChange={(value) => handleChange('loanPaymentMode', value)}
        placeholder={{ label: '💳 Select Payment Mode', value: '' }}
        items={[
          { label: 'EMI', value: 'EMI' },
          { label: 'Online', value: 'Online' },
          { label: 'Cheque', value: 'Cheque' }
        ]}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>🚀 Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateDueForm;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9fb',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 14,
    backgroundColor: '#ffffff',
    color: '#2c3e50',
    elevation: 1,
  },
  submitButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 25,
    elevation: 3,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 10,
    color: '#2c3e50',
    backgroundColor: '#fff',
    marginBottom: 14,
  },
  inputAndroid: {
    fontSize: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 10,
    color: '#2c3e50',
    backgroundColor: '#fff',
    marginBottom: 14,
  },
});

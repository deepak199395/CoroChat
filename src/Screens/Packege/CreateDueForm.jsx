import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const CreateDueForm = () => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        loanId: "",
        loanAmount: "",
        loanStartDate: "",
        loanEndDate: "",
        loanDurationInMonth: "",
        loanInterestRate: "",
        loanStatus: "",
        loanPaymentStatus: "",
        loanPaymentMode: "",
    });

    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/loans/Create-LoanDue/api22", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    loanAmount: parseFloat(formData.loanAmount),
                    loanDurationInMonth: parseInt(formData.loanDurationInMonth),
                    loanInterestRate: parseFloat(formData.loanInterestRate),
                }),
            });

            const data = await response.json();
            if (data.success) {
                Alert.alert("Success", "Loan Due Created Successfully",[
                    {
                         text: "allow to summit Details",
                         onPress: () =>navigation.navigate("Showloan",{loan: data.data})
                    }
                ]);
                setFormData({
                    loanId: "",
                    loanAmount: "",
                    loanStartDate: "",
                    loanEndDate: "",
                    loanDurationInMonth: "",
                    loanInterestRate: "",
                    loanStatus: "",
                    loanPaymentStatus: "",
                    loanPaymentMode: "",
                });
            } else {
                Alert.alert("Failed", data.message || "Something went wrong");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to submit loan due");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create Loan Due</Text>

            <TextInput style={styles.input}
                placeholder="Loan ID"
                placeholderTextColor="#666"
                value={formData.loanId}
                onChangeText={(text) => handleChange('loanId', text)}
            />
            <TextInput style={styles.input}
                placeholder="Loan Amount"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={formData.loanAmount}
                onChangeText={(text) => handleChange('loanAmount', text)}
            />
            <TextInput style={styles.input}
                placeholder="Start Date (YYYY-MM-DD)"
                placeholderTextColor="#666"
                value={formData.loanStartDate}
                onChangeText={(text) => handleChange('loanStartDate', text)}
            />
            <TextInput style={styles.input}
                placeholder="End Date (YYYY-MM-DD)"
                placeholderTextColor="#666"
                value={formData.loanEndDate}
                onChangeText={(text) => handleChange('loanEndDate', text)}
            />
            <TextInput style={styles.input}
                placeholder="Loan Duration (in months)"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={formData.loanDurationInMonth}
                onChangeText={(text) => handleChange('loanDurationInMonth', text)}
            />
            <TextInput style={styles.input}
                placeholder="Interest Rate (%)"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={formData.loanInterestRate}
                onChangeText={(text) => handleChange('loanInterestRate', text)}
            />
            <TextInput style={styles.input}
                placeholder="Loan Status (e.g. Active)"
                placeholderTextColor="#666"
                value={formData.loanStatus}
                onChangeText={(text) => handleChange('loanStatus', text)}
            />
            <TextInput style={styles.input}
                placeholder="Payment Status (e.g. Pending)"
                placeholderTextColor="#666"
                value={formData.loanPaymentStatus}
                onChangeText={(text) => handleChange('loanPaymentStatus', text)}
            />
            <TextInput style={styles.input}
                placeholder="Payment Mode (e.g. EMI)"
                placeholderTextColor="#666"
                value={formData.loanPaymentMode}
                onChangeText={(text) => handleChange('loanPaymentMode', text)}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default CreateDueForm;

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
    submitButton: {
        backgroundColor: '#16a085',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 25,
    },
    submitText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

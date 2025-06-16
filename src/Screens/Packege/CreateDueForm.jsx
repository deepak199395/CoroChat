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
        payedEMInumber: "",
        payedEMIAmount: "",
        RemainingEMInumber: "",
        EmiAmmount: "",
        RemainingEmiAmmount: ""
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
                    payedEMInumber: parseInt(formData.payedEMInumber),
                    payedEMIAmount: parseFloat(formData.payedEMIAmount),
                    RemainingEMInumber: parseInt(formData.RemainingEMInumber),
                    EmiAmmount: parseFloat(formData.EmiAmmount),
                    RemainingEmiAmmount: parseFloat(formData.RemainingEmiAmmount),
                }),
            });

            const data = await response.json();
            if (data?.success) {
                Alert.alert("Success", "Loan Due Created Successfully", [
                    {
                        text: "Allow to submit details",
                        onPress: () => navigation.navigate("Showloan", { loan: data.data })
                    }
                ]);
                // Reset form
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
                console.log("Submission failed:", data);
                Alert.alert("Error", data?.message || "Failed to submit loan due");
            }

        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to submit loan due");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create Loan Due</Text>

            <TextInput style={styles.input} placeholder="Finance Company Name" placeholderTextColor="#666"
                value={formData.loanId} onChangeText={(text) => handleChange('loanId', text)} />
            <TextInput style={styles.input} placeholder="Total Loan Amount" keyboardType="numeric"
                placeholderTextColor="#666" value={formData.loanAmount}
                onChangeText={(text) => handleChange('loanAmount', text)} />
            <TextInput style={styles.input} placeholder="Start Date (YYYY-MM-DD)" placeholderTextColor="#666"
                value={formData.loanStartDate} onChangeText={(text) => handleChange('loanStartDate', text)} />
            <TextInput style={styles.input} placeholder="End Date (YYYY-MM-DD)" placeholderTextColor="#666"
                value={formData.loanEndDate} onChangeText={(text) => handleChange('loanEndDate', text)} />
            <TextInput style={styles.input} placeholder="Loan Duration (in months)" keyboardType="numeric"
                placeholderTextColor="#666" value={formData.loanDurationInMonth}
                onChangeText={(text) => handleChange('loanDurationInMonth', text)} />
            <TextInput style={styles.input} placeholder="Interest Rate (%)" keyboardType="numeric"
                placeholderTextColor="#666" value={formData.loanInterestRate}
                onChangeText={(text) => handleChange('loanInterestRate', text)} />
            <TextInput style={styles.input} placeholder="Loan Status (e.g. Active)" placeholderTextColor="#666"
                value={formData.loanStatus} onChangeText={(text) => handleChange('loanStatus', text)} />
            <TextInput style={styles.input} placeholder="Payment Status (e.g. Pending)" placeholderTextColor="#666"
                value={formData.loanPaymentStatus} onChangeText={(text) => handleChange('loanPaymentStatus', text)} />
            <TextInput style={styles.input} placeholder="Payment Mode (e.g. EMI)" placeholderTextColor="#666"
                value={formData.loanPaymentMode} onChangeText={(text) => handleChange('loanPaymentMode', text)} />
            <TextInput style={styles.input} placeholder="Paid EMI Count" keyboardType="numeric"
                placeholderTextColor="#666" value={formData.payedEMInumber}
                onChangeText={(text) => handleChange('payedEMInumber', text)} />
            <TextInput style={styles.input} placeholder="Paid EMI Amount" keyboardType="numeric"
                placeholderTextColor="#666" value={formData.payedEMIAmount}
                onChangeText={(text) => handleChange('payedEMIAmount', text)} />
            <TextInput style={styles.input} placeholder="Remaining EMI Count" keyboardType="numeric"
                placeholderTextColor="#666" value={formData.RemainingEMInumber}
                onChangeText={(text) => handleChange('RemainingEMInumber', text)} />
            <TextInput style={styles.input} placeholder="Monthly EMI Amount" keyboardType="numeric"
                placeholderTextColor="#666" value={formData.EmiAmmount}
                onChangeText={(text) => handleChange('EmiAmmount', text)} />
            <TextInput style={styles.input} placeholder="Remaining EMI Amount" keyboardType="numeric"
                placeholderTextColor="#666" value={formData.RemainingEmiAmmount}
                onChangeText={(text) => handleChange('RemainingEmiAmmount', text)} />

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

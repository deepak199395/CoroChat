import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
    Linking,
} from 'react-native';

const SplitBillScreen = () => {
    const [billAmount, setBillAmount] = useState('');
    const [memberCount, setMemberCount] = useState('');
    const [friendNames, setFriendNames] = useState([]);
    const [step, setStep] = useState(1);
    const [perHead, setPerHead] = useState(0);

    const handleMemberInput = () => {
        const count = parseInt(memberCount);
        if (isNaN(count) || count <= 0) {
            Alert.alert('Invalid input', 'Please enter a valid number of people.');
            return;
        }
        const temp = Array(count).fill('').map((_, i) => ({ name: '', id: i }));
        setFriendNames(temp);
        setStep(3);
    };

    const handleNameChange = (text, index) => {
        const updated = [...friendNames];
        updated[index].name = text;
        setFriendNames(updated);
    };

    const handleSplit = () => {
        const total = parseFloat(billAmount);
        if (isNaN(total)) {
            Alert.alert('Invalid amount', 'Please enter a valid bill amount.');
            return;
        }
        const each = (total / friendNames.length).toFixed(2);
        setPerHead(each);
        setStep(4);
    };

    const handleShareWhatsApp = () => {
        let message = `💸 *Split Bill Details*\n\nTotal Amount: ₹${billAmount}\nEach person owes: ₹${perHead}\n\n`;
        friendNames.forEach((friend, index) => {
            message += `${friend.name || `Person ${index + 1}`}: ₹${perHead}\n`;
        });

        const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
        Linking.openURL(url).catch(() => {
            Alert.alert('Error', 'WhatsApp is not installed');
        });
    };

    const handleUPIPayment = () => {
        const upiLink = `upi://pay?pa=your-upi-id@bank&pn=Your Name&am=${perHead}&cu=INR`;
        Linking.openURL(upiLink).catch(() => {
            Alert.alert('Error', 'No UPI app found');
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>💸 Split Bill With Friends</Text>

            {step === 1 && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter total bill amount"
                        keyboardType="numeric"
                        value={billAmount}
                        onChangeText={setBillAmount}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => setStep(2)}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </>
            )}

            {step === 2 && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="How many people? (including you)"
                        keyboardType="numeric"
                        value={memberCount}
                        onChangeText={setMemberCount}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleMemberInput}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </>
            )}

            {step === 3 && (
                <>
                    <Text style={styles.subHeading}>Enter names of people:</Text>
                    {friendNames.map((friend, index) => (
                        <TextInput
                            key={index}
                            style={styles.input}
                            placeholder={`Person ${index + 1}`}
                            value={friend.name}
                            onChangeText={(text) => handleNameChange(text, index)}
                        />
                    ))}
                    <TouchableOpacity style={styles.button} onPress={handleSplit}>
                        <Text style={styles.buttonText}>Calculate Split</Text>
                    </TouchableOpacity>
                </>
            )}

            {step === 4 && (
                <>
                    <Text style={styles.resultTitle}>Each person pays: ₹{perHead}</Text>
                    {friendNames.map((item, index) => (
                        <Text key={index} style={styles.friendItem}>
                            {item.name || `Person ${index + 1}`}: ₹{perHead}
                        </Text>
                    ))}

                    <TouchableOpacity style={styles.button} onPress={handleShareWhatsApp}>
                        <Text style={styles.buttonText}>📤 Share on WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleUPIPayment}>
                        <Text style={styles.buttonText}>💰 Pay via GPay / PhonePe</Text>
                    </TouchableOpacity>
                </>
            )}
        </ScrollView>
    );
};

export default SplitBillScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f1f4f9',
        minHeight: '100%',
    },
    heading: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#2c3e50',
    },
    subHeading: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
        color: '#34495e',
    },
    input: {
        height: 50,
        borderColor: '#dcdde1',
        borderWidth: 1,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        fontSize: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    button: {
        backgroundColor: '#6a11cb',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#6a11cb',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
        letterSpacing: 0.5,
    },
    resultTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginVertical: 16,
        color: '#27ae60',
        textAlign: 'center',
    },
    friendItem: {
        fontSize: 16,
        padding: 12,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        color: '#2c3e50',
    },
});

import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TotalAmount = () => {
  const [loanData, setLoanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  const getUserDetails = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        setUserEmail(user.email);
        setUserName(user.name || user.email.split('@')[0]);
      } else {
        console.log('User not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Failed to get user details:', error);
    }
  };

  const fetchLoans = async () => {
    try {
      const response = await fetch(
        'https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/loans/GetLoanDue-list/api23'
      );
      const result = await response.json();
      if (result.success) {
        setLoanData(result.data);
      } else {
        console.log('Failed to fetch loans');
      }
    } catch (error) {
      console.error('Error fetching loans:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if (userEmail) {
      fetchLoans();
    }
  }, [userEmail]);

  const totalLoanAmount = loanData
    .filter((item) => item.email?.toLowerCase() === userEmail.toLowerCase())
    .reduce((sum, item) => {
      const amount = parseFloat(item.RemainingEmiAmmount) || 0;
      return sum + amount;
    }, 0);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0d6efd" />
      ) : (
        <View style={styles.totalCard}>
          <Text style={styles.totalText}>
            Total Remaining EMI for <Text style={styles.name}>{userName}</Text>
          </Text>
          <Text style={styles.amount}>₹{totalLoanAmount.toFixed(2)}</Text>
        </View>
      )}
    </View>
  );
};

export default TotalAmount;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f7fa',
    justifyContent: 'center',
    padding: 10,
  },
  totalCard: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    borderLeftWidth: 6,
    borderLeftColor: '#0d6efd',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  name: {
    fontWeight: '800',
    color: '#0d6efd',
  },
  amount: {
    fontSize: 28,
    fontWeight: '800',
    color: '#28a745',
  },
});

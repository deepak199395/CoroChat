import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const MainFile = () => {
  const navigation = useNavigation();
  const [loanData, setLoanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [name, setName] = useState('');
  const [user, setUser] = useState({});

  const fetchUserAndLoans = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (!userString) return;

      const user = JSON.parse(userString);
      setUser(user);
      setUserEmail(user.email);

      const extractedName = user.name || user.email.split('@')[0];
      setName(extractedName);

      const response = await fetch("https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/loans/GetLoanDue-list/api23");
      const result = await response.json();

      if (result.success) {
        const filteredLoans = result.data.filter(item => item.email === user.email);
        setLoanData(filteredLoans);
      } else {
        console.log("Failed to fetch loans");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace("LoginScreen");
  };

  useEffect(() => {
    fetchUserAndLoans();
  }, []);

  const handleLoan = (item) => {
    navigation.navigate('DetailsLoanFile', { loan: item });
  };

  const renderLoanItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleLoan(item)}>
      <Text style={styles.label}>Loan ID: <Text style={styles.value}>{item.loanId}</Text></Text>
      <Text style={styles.label}>Total Amount: <Text style={styles.value}>₹{item.loanAmount}</Text></Text>
      <Text style={styles.label}>Remaining Amount: <Text style={styles.value}>₹{item.RemainingEmiAmmount}</Text></Text>
      <Text style={styles.label}>Duration: <Text style={styles.value}>{item.loanDurationInMonth} months</Text></Text>
      <Text style={styles.label}>Remaining Months: <Text style={styles.value}>{item.RemainingEMInumber}</Text></Text>
      <Text style={styles.label}>
        Status:{' '}
        <Text style={[styles.value, { color: item.loanStatus.trim().toLowerCase() === 'active' ? '#28a745' : '#dc3545' }]}>
          {item.loanStatus}
        </Text>
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Loan Summary for {name}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0d6efd" />
      ) : loanData.length === 0 ? (
        <Text style={styles.noData}>No loans found for this user.</Text>
      ) : (
        <FlatList
          data={loanData}
          keyExtractor={(item) => item._id}
          renderItem={renderLoanItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default MainFile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f5',
    paddingHorizontal: 16,
    paddingTop: 4,
    marginBottom: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0d6efd',
    marginBottom: 16,
    textAlign: 'center',
  },
  noData: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
    color: '#6c757d',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 6,
    borderLeftColor: '#0d6efd',
  },
  label: {
    fontSize: 15,
    color: '#333',
    marginBottom: 6,
    fontWeight: '600',
  },
  value: {
    fontWeight: '500',
    color: '#000',
  },
});

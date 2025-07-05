import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const MainFile = () => {
  const navigation = useNavigation();
  const [loanData, setLoanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  const fetchUserAndLoans = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (!userString) return;

      const user = JSON.parse(userString);
      setUserEmail(user.email);

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
      <Text style={styles.label}>Finance: <Text style={styles.value}>{item.loanId}</Text></Text>
      <Text style={styles.label}>Total Due: <Text style={styles.value}>₹{item.loanAmount}</Text></Text>
      <Text style={styles.label}>Remaining Due: <Text style={styles.value}>₹{item.RemainingEmiAmmount}</Text></Text>
      <Text style={styles.label}>Duration: <Text style={styles.value}>{item.loanDurationInMonth} months</Text></Text>
      <Text style={styles.label}>Remaining Months: <Text style={styles.value}>{item.RemainingEMInumber}</Text></Text>
      <Text style={styles.label}>Status: <Text style={[styles.value, { color: item.loanStatus.trim().toLowerCase() === 'active' ? 'green' : 'red' }]}>{item.loanStatus}</Text></Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.title}>Loan Dues for {userEmail}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
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
    backgroundColor: '#f0f4f7',
    paddingHorizontal: 16,
    paddingTop: 20,
    marginBottom: 60
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  logout: {
    color: 'red',
    fontWeight: 'bold',
    marginRight: 10,
  },
  noData: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
    color: '#999',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 4,
    borderLeftWidth: 6,
    borderLeftColor: '#4CAF50',
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
    fontWeight: '600',
  },
  value: {
    fontWeight: '500',
    color: '#000',
  },
});

import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

const MainFile = () => {
  const [loanData, setLoanData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLoans = async () => {
    try {
      const response = await fetch("https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/loans/GetLoanDue-list/api23");
      const result = await response.json();
      if (result.success) {
        setLoanData(result.data);
      } else {
        console.log("Failed to fetch loans");
      }
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const renderLoanItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.label}>Loan ID: <Text style={styles.value}>{item.loanId}</Text></Text>
      <Text style={styles.label}>Amount: <Text style={styles.value}>₹{item.loanAmount}</Text></Text>
      <Text style={styles.label}>Duration: <Text style={styles.value}>{item.loanDurationInMonth} months</Text></Text>
      <Text style={styles.label}>Status: <Text style={[styles.value, { color: item.loanStatus === 'Active' ? 'green' : 'red' }]}>{item.loanStatus}</Text></Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loan Dues</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
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
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
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
    fontWeight: '400',
    color: '#000',
  },
});

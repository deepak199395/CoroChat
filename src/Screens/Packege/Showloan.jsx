import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

const Showloan = () => {
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
      <Text style={styles.loanId}>Loan ID: {item.loanId}</Text>
      <Text>Amount: ₹{item.loanAmount}</Text>
      <Text>Start Date: {item.loanStartDate}</Text>
      <Text>End Date: {item.loanEndDate}</Text>
      <Text>Duration: {item.loanDurationInMonth} months</Text>
      <Text>Interest Rate: {item.loanInterestRate}%</Text>
      <Text>Status: {item.loanStatus}</Text>
      <Text>Payment Status: {item.loanPaymentStatus}</Text>
      <Text>Payment Mode: {item.loanPaymentMode}</Text>
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
export default Showloan;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f7f6',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  loanId: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#4CAF50',
  },
});

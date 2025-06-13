import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

const TotalAmount = () => {
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

  // Safely parse and sum RemainingEmiAmmount
  const totalLoanAmount = loanData.reduce((sum, item) => {
    const amount = parseFloat(item.RemainingEmiAmmount) || 0;
    return sum + amount;
  }, 0);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <View style={styles.totalCard}>
          <Text style={styles.totalText}>
            Total Remaining EMI: ₹{totalLoanAmount.toFixed(2)}
          </Text>
        </View>
      )}
    </View>
  );
};

export default TotalAmount;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
  },
  totalCard: {
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1B5E20',
  },
});

import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const TotalExpenses = ({ reload }) => {
  const navigation = useNavigation();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchTotalExpenses = async () => {
    try {
      const response = await fetch(
        'https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/getExpress/get-Express/api28'
      );
      const result = await response.json();

      if (result.success && result.data) {
        const totalSum = result.data.reduce(
          (sum, item) => sum + parseFloat(item.DayAmmount || 0),
          0
        );
        setTotal(totalSum);
      }
    } catch (error) {
      console.error('Error fetching total:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalExpenses();
  }, [reload]);

  const handleShowExpense = () => {
    navigation.navigate('ShoWexpances');
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.card} onPress={handleShowExpense}>
              <Text style={styles.title}>📊 Total Monthly Expenses</Text>

        {loading ? (
          <ActivityIndicator size="small" color="#0d6efd" />
        ) : (
          <Text style={styles.amount}>₹{total.toFixed(2)}</Text>
        )}
        <Text style={styles.linkText}>View All Expenses</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TotalExpenses;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 4,
    paddingHorizontal: 10,
    
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0d6efd',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    paddingVertical: 7,
    paddingHorizontal: 40,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderLeftWidth: 6,
    borderLeftColor: '#0d6efd',
    paddingBottom:5
  },
  amount: {
    fontSize: 26,
    fontWeight: '800',
    color: '#28a745',
    marginBottom: 6,
  },
  linkText: {
    fontSize: 14,
    color: '#0d6efd',
    textDecorationLine: 'underline',
    marginTop: 4,
  },
});

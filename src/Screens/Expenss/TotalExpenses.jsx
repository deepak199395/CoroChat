import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const TotalExpenses = () => {
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
  }, []);

  const handleShowExpense = () => {
    navigation.navigate('ShoWexpances');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Monthly Expenses</Text>

      <TouchableOpacity style={styles.button} onPress={handleShowExpense}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.totalText}>₹{total.toFixed(2)}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TotalExpenses;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#27ae60',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS
    shadowOpacity: 0.3, // iOS
    shadowRadius: 3, // iOS
  },
  totalText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});

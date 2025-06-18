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
    marginTop: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  button: {
    backgroundColor: '#E8F5E9',
    paddingVertical: 14,
    paddingHorizontal: 130,
    borderRadius: 10,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3, 
    shadowRadius: 3, 
  },
  totalText: {
    fontSize: 22,
    color: '#1B5E20',
    fontWeight: 'bold',
  },
});

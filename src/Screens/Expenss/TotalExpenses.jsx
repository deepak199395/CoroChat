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
  const handleCreateExpense = () => {
    navigation.navigate('RegiExpenses');
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.card} onPress={handleCreateExpense}>
        <Text>Create Expenses Diary </Text>
        </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={handleShowExpense}>
              <Text style={styles.title}>📊 Total Monthly Expenses</Text>

        {loading ? (
          <ActivityIndicator size="small" color="#0d6efd" />
        ) : (
          <Text style={styles.amount}>₹{total.toFixed(2)}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TotalExpenses;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 16,
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0d6efd',
    marginBottom: 6,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#0d6efd',
  },
  amount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#28a745',
    marginTop: 4,
  },
  linkText: {
    fontSize: 14,
    color: '#0d6efd',
    textDecorationLine: 'underline',
    marginTop: 6,
  },
});

import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

const ShoWexpances = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const descriptionOptions = ['Food', 'Petrol','Medicine ', 'Drink', 'Breakfast', 'EMI', 'Travel', 'grocery', 'shopping'];

  const fetchExpenses = async () => {
    try {
      const response = await fetch(
        'https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/getExpress/get-Express/api28'
      );
      const result = await response.json();
      if (result.success && result.data) {
        setExpenses(result.data);
      }
    } catch (err) {
      console.error('Error fetching expenses:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryTotals = () => {
    const totals = {};
    descriptionOptions.forEach((desc) => {
      totals[desc] = 0;
    });

    expenses.forEach((item) => {
      const desc = item.description;
      const amount = parseFloat(item.DayAmmount || 0);
      if (totals.hasOwnProperty(desc)) {
        totals[desc] += amount;
      }
    });

    return Object.entries(totals).filter(([_, amt]) => amt > 0);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const totalsList = getCategoryTotals();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Expense Summary</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : totalsList.length === 0 ? (
        <Text style={styles.noData}>No expenses to show.</Text>
      ) : (
        <FlatList
          data={totalsList}
          keyExtractor={([desc]) => desc}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.desc}>{item[0]}</Text>
              <Text style={styles.amount}>₹{item[1].toFixed(2)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ShoWexpances;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#eafaf1',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  desc: {
    fontSize: 16,
    fontWeight: '500',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#27ae60',
  },
  noData: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});

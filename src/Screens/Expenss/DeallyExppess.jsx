import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DailyExpenseTracker = () => {
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const descriptionOptions = ['Food', 'Petrol', 'Medicine ', 'Drink', 'Breakfast', 'EMI', 'Travel', 'grocery', 'shopping'];

  const getToday = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/getExpress/get-Express/api28');
      const result = await response.json();
      if (result.success && result.data) {
        setExpenses(result.data);
      }
    } catch (err) {
      console.log('Error fetching expenses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateExpense = async () => {
    if (!amount || !desc) return Alert.alert('Please fill all fields');

    const expenseData = {
      DayAmmount: amount,
      date: getToday(),
      description: desc,
    };

    try {
      const url = editMode
        ? `https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/putDeallyExpess/put-dellyExpensess/api29/${editId}`
        : 'https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/createEexpess/Create-Express/api27';

      const method = editMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData),
      });

      const result = await response.json();
      if (result.success) {
        setAmount('');
        setDesc('');
        setEditMode(false);
        setEditId(null);
        fetchExpenses();
      } else {
        Alert.alert('Failed to save expense');
      }
    } catch (error) {
      console.log('Error saving expense:', error);
      Alert.alert('Server error');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/deleteDeallyExpess//put-dellyExpenses/api30/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        fetchExpenses();
      } else {
        Alert.alert('Delete failed');
      }
    } catch (error) {
      console.log('Error deleting expense:', error);
      Alert.alert('Server error');
    }
  };

  const handleEdit = (item) => {
    setAmount(item.DayAmmount);
    setDesc(item.description);
    setEditId(item._id);
    setEditMode(true);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const totalAllExpenses = expenses.reduce(
    (sum, e) => sum + parseFloat(e.DayAmmount || 0),
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Expense Tracker</Text>

      <TextInput
        placeholder="Enter Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.input}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: desc ? '#000' : '#888' }}>
          {desc ? desc : 'Select Description'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAddOrUpdateExpense} style={styles.button}>
        <Text style={styles.buttonText}>{editMode ? 'Update Expense' : 'Add Expense'}</Text>
      </TouchableOpacity>

      <Text style={styles.totalText}>
        Total Expenses: ₹{totalAllExpenses.toFixed(2)}
      </Text>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <View>
              <Text style={styles.expenseDesc}>{item.description}</Text>
              <Text style={styles.expenseAmt}>₹{item.DayAmmount}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Icon name="edit" size={22} color="blue" style={{ marginHorizontal: 8 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item._id)}>
                <Icon name="delete" size={22} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select Description</Text>
            {descriptionOptions.map((option, index) => (
              <Pressable
                key={index}
                style={styles.modalOption}
                onPress={() => {
                  setDesc(option);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalText}>{option}</Text>
              </Pressable>
            ))}
            <Pressable
              onPress={() => setModalVisible(false)}
              style={[styles.modalOption, { backgroundColor: '#eee' }]}
            >
              <Text style={{ color: 'red' }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DailyExpenseTracker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 60,
    backgroundColor: '#fefefe',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 6,
    padding: 12,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#27ae60',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: '600',
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eafaf1',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  expenseDesc: {
    fontSize: 16,
  },
  expenseAmt: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  modalText: {
    fontSize: 16,
  },
});

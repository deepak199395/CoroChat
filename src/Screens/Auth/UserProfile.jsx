import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../../Components/Layout/Footer';

const UserProfile = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (!storedUser) {
        Alert.alert("Error", "No user data found in storage");
        setLoading(false);
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      const response = await fetch(
        'https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/getcoroUser/get-CoroUser/api32'
      );
      const json = await response.json();

      if (json.flage === "Y") {
        const matchedUser = json.data.find(u => u.email === parsedUser.email);
        if (matchedUser) {
          setUserDetails(matchedUser);
        } else {
          Alert.alert("User not found in API response");
        }
      } else {
        Alert.alert("Error", "Failed to fetch users");
      }
    } catch (err) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    Alert.alert('Logout', 'You have been logged out.');
    navigation.replace('LoginScreen');
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#16a085" />
      </View>
    );
  }

  if (!userDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>User not found</Text>
        <TouchableOpacity onPress={fetchUserDetails} style={styles.retryBtn}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>👤 Your Profile</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>{userDetails.name}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{userDetails.email}</Text>

          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{userDetails.phone}</Text>

          <Text style={styles.label}>Gender</Text>
          <Text style={styles.value}>{userDetails.gender}</Text>

          <Text style={styles.label}>Age</Text>
          <Text style={styles.value}>{userDetails.age}</Text>

          <Text style={styles.label}>City</Text>
          <Text style={styles.value}>{userDetails.address}</Text>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>🚪 Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

export default UserProfile;
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#ecf0f3',
  },
  container: {
    padding: 24,
    paddingBottom: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#2c3e50',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#555',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    color: '#2d3436',
    marginTop: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f3',
  },
  retryBtn: {
    marginTop: 20,
    padding: 14,
    backgroundColor: '#2980b9',
    borderRadius: 10,
    alignItems: 'center',
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutBtn: {
    marginTop: 30,
    paddingVertical: 15,
    backgroundColor: '#e74c3c',
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});

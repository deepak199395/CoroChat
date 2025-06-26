import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  TouchableOpacity
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
        <ActivityIndicator size="large" color="#007bff" />
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
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text style={styles.label}>Name: <Text style={styles.value}>{userDetails.name}</Text></Text>
      <Text style={styles.label}>Email: <Text style={styles.value}>{userDetails.email}</Text></Text>
      <Text style={styles.label}>Phone: <Text style={styles.value}>{userDetails.phone}</Text></Text>
      <Text style={styles.label}>Gender: <Text style={styles.value}>{userDetails.gender}</Text></Text>
      <Text style={styles.label}>Age: <Text style={styles.value}>{userDetails.age}</Text></Text>
      <Text style={styles.label}>Address: <Text style={styles.value}>{userDetails.address}</Text></Text>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
     <View style={styles.footer}>
        <Footer  />
     </View>
      
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    color: '#555',
  },
  value: {
    fontWeight: '400',
    color: '#000',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryBtn: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutBtn: {
    marginTop: 30,
    padding: 12,
    backgroundColor: '#ff4444',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer:{
    width:"120%",
    flex:1,
    position: 'absolute',
    bottom: 0,
  }
  
});

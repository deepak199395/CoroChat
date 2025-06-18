import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Header = ({ onReload }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
      const response = await fetch("https://shop999backend.vercel.app/back-end/rest-API/Secure/api/v1/getProfile/get-profile/api26");
      const result = await response.json();
      console.log("Fetched result ===>", result);

      if (result.success) {
        setUserData(result.ProfileDetails[0]);
      } else {
        console.log("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const HandleClickuser = () => {
    navigation.navigate('UserProfile');
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View style={styles.MainHeaderContainer}>
      {/* Left side: Profile info */}
      <View style={styles.profileContainer}>
        <FontAwesome5Icon name="user-circle" size={30} color="#000" />
        <Text style={styles.profileName}>
          {loading
            ? "Loading..."
            : userData
            ? `${userData.firstName} ${userData.lastName}`
            : "No Data"}
        </Text>
        <MaterialIcon name="verified-user" size={22} color="green" />
      </View>

      {/* Right side: Action buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={HandleClickuser}>
          <FontAwesome5Icon name="user-alt" size={28} color="#000" />
        </TouchableOpacity>

        {/* 🔁 Reload button */}
        <TouchableOpacity style={styles.button} onPress={onReload}>
          <MaterialIcon name="refresh" size={28} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <MaterialIcon name="login" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  MainHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    width: "98%",
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    marginTop: 5,
    marginLeft: 5,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  profileName: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  button: {
    marginHorizontal: 5,
  },
});

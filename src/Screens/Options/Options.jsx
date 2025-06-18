import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React from 'react';
import Footer from '../../Components/Layout/Footer';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Options = () => {
  const navigation = useNavigation();

  const menuOptions = [
    { label: 'Dashboard', screen: 'DashBoard', icon: 'view-dashboard-outline' },
    { label: 'Documents', screen: 'Documents', icon: 'file-document-outline' },
    { label: 'Expenses', screen: 'Expenses', icon: 'currency-inr' },
    { label: 'Loan Records', screen: 'LoanRecord', icon: 'file-cabinet' },
    { label: 'Bank Details', screen: 'BankDetails', icon: 'bank' },
    { label: 'SIP', screen: 'SIP', icon: 'chart-line' },
    { label: 'ITR', screen: 'ITR', icon: 'file-document-edit-outline' },
    { label: 'NetWorth Tracker', screen: 'NetWorthTracker', icon: 'chart-areaspline' },
    { label: 'Legal', screen: 'Legal', icon: 'gavel' },
    { label: 'Log Out', screen: 'LogOut', icon: 'logout' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {menuOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionCard}
            onPress={() => navigation.navigate(option.screen)}
          >
            <View style={styles.iconLabelRow}>
              <MaterialCommunityIcons
                name={option.icon}
                size={22}
                color="#2c3e50"
                style={styles.icon}
              />
              <Text style={styles.optionText}>{option.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.bottomNotice}>
          <Text style={styles.footerText}>© All rights reserved by Deepak Yadav</Text>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default Options;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    marginTop: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  optionCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  iconLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 18,
    color: '#34495e',
    fontWeight: '500',
  },
  bottomNotice: {
    alignItems: 'center',
    marginTop: 30,
    paddingVertical: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});

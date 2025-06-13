import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const DetailsLoanFile = ({ route }) => {
  const { loan } = route.params;

  const monthBoxes = Array.from({ length: loan.loanDurationInMonth }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loan Details</Text>

      {/* Card Info */}
      <View style={styles.card}>
        <Text style={styles.label}>Finance: <Text style={styles.value}>{loan.loanId}</Text></Text>
        <Text style={styles.label}>Amount: <Text style={styles.value}>₹{loan.loanAmount}</Text></Text>
        <Text style={styles.label}>Start Date: <Text style={styles.value}>{loan.loanStartDate}</Text></Text>
        <Text style={styles.label}>End Date: <Text style={styles.value}>{loan.loanEndDate}</Text></Text>
        <Text style={styles.label}>Duration: <Text style={styles.value}>{loan.loanDurationInMonth} months</Text></Text>
        <Text style={styles.label}>Interest Rate: <Text style={styles.value}>{loan.loanInterestRate}%</Text></Text>
        <Text style={styles.label}>EMIs Paid: <Text style={styles.value}>{loan.payedEMInumber}</Text></Text>
      </View>

      {/* Box Grid for Duration */}
      <Text style={styles.durationTitle}>Monthly Installments</Text>
      <View style={styles.boxContainer}>
        {monthBoxes.map((month) => {
          const isPaid = month <= loan.payedEMInumber;
          return (
            <View
              key={month}
              style={[
                styles.monthBox,
                { backgroundColor: isPaid ? '#4CAF50' : '#BDBDBD' }, // green if paid, gray if not
              ]}
            >
              <Text style={styles.monthText}>{month}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default DetailsLoanFile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0a3d62',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f4f4f4',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  value: {
    fontWeight: 'normal',
    color: '#111',
  },
  durationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  monthBox: {
    width: 40,
    height: 40,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    elevation: 2,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

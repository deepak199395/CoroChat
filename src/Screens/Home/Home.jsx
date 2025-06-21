import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../Components/Layout/Header';
import Footer from '../../Components/Layout/Footer';
import MainFile from '../MaineFiles/MainFile';
import TotalAmount from '../MaineFiles/TotalAmount';
import DeallyExppess from '../Expenss/DeallyExppess';
import TotalExpenses from '../Expenss/TotalExpenses';
import BillSlid from '../../Components/Layout/BillSplid/BillSlid';

const Home = () => {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    // Toggle reload value
    setReload((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Header onReload={handleReload} />
      <TotalAmount reload={reload} />
      <TotalExpenses reload={reload} />
      <MainFile reload={reload} />
      <Footer />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

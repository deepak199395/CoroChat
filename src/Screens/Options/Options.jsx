import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Footer from '../../Components/Layout/Footer';
import Header from '../../Components/Layout/Header';

const Options = () => {
  return (
    <View style={styles.container}>
      <Text>Option</Text>
        

      <Footer />
    </View>
  );
};

export default Options;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',

  },

});

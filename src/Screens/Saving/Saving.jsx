import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Footer from '../../Components/Layout/Footer'
import DailyExpenseTracker from '../Expenss/DeallyExppess'

const Saving = () => {
  return (
    <View style={styles.Container}>
      <DailyExpenseTracker/>
      <Footer/>
    </View>
  )
}

export default Saving

const styles = StyleSheet.create({
  Container:{
    flex:1,
  }
})
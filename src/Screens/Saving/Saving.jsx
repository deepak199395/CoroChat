import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Footer from '../../Components/Layout/Footer'

const Saving = () => {
  return (
    <View style={styles.Container}>
      <Text>Saving</Text>
      <Footer/>
    </View>
  )
}

export default Saving

const styles = StyleSheet.create({
  Container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})
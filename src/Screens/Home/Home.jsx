import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../Components/Layout/Header'
import Footer from '../../Components/Layout/Footer'
import MainFile from '../MaineFiles/MainFile'

const Home = () => {
  return (
    <View style={styles.container}>
     <Header/>
     <MainFile/>
     <Footer/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }

})
import React from 'react'
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native'
import styles from '@Styles'
import storage from '@Utils/storage'

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props)
    this._bootstrapAsync()
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await storage.get('userToken')
    const userId = await storage.get('userId')

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    setTimeout(() => {
      this.props.navigation.navigate(userToken && userId ? 'App' : 'Login')
    }, 500)
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={[viewStyles.container, viewStyles.horizontal]}>
        <ActivityIndicator size="large" color="#52C9C2" />
        <StatusBar barStyle="light-content" />
      </View>
    )
  }
}

const viewStyles = StyleSheet.create({
  container: {
    ...styles.container,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
})

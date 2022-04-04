import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withStore } from 'retalk'
import config from '@Config'
import styles from '@Styles'
import { Button,View, StyleSheet } from 'react-native'
class SettingsScreen extends PureComponent {
  static navigationOptions = _ => {
    return {
      ...config.defaultNavigation,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#333',
      title: '设置',
    }
  }

  onPressLogout = async () => {
    await this.props.userLogout(() =>
      this.props.navigation.navigate('AuthLoading'),
    )
  }

  clearStorage = async () => {
    await this.props.clearStorage(() =>
      this.props.navigation.navigate('AuthLoading'),
    )
  }

  render() {
    return (
      <View style={viewStyles.container}>
        <Button
          onPress={this.onPressLogout}
          title='退出登录'
        />
      </View>
    )
  }
}

export default connect(...withStore('app'))(SettingsScreen)

const viewStyles = StyleSheet.create({
  container: {
    ...styles.container,
  }
})

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withStore } from 'retalk'
import config from '@Config'
import styles from '@Styles'
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  Platform,
} from 'react-native'
import { List } from '@ant-design/react-native';
const Item = List.Item;

class SystemScreen extends PureComponent {
  static navigationOptions = _ => {
    return {
      ...config.defaultNavigation,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#333',
      title: '系统',
    }
  }

  appMessage = () => {
    // 和 code-push 推送版本号 同步
    let version = 'v1.0.0'
    if (Platform.OS === 'android') {
      version = 'v1.0.0'
    } else {
      version = 'v1.0.0'
    }
    Alert.alert(
      '提示',
      `系统版本 ${version}`,
      [
        {
          text: '取消',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: '确定', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    )
  }

  render() {
    return (
      <List style={viewStyles.container}>
        <TouchableWithoutFeedback onPress={this.appMessage}>
          <Item thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" arrow="horizontal">
            关于应用
          </Item>
        </TouchableWithoutFeedback>
      </List>
    )
  }
}

export default connect(...withStore('app'))(SystemScreen)

const viewStyles = StyleSheet.create({
  container: {
    ...styles.container,
  },
  listItem: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  titleStyle: {
    color: '#333',
    fontSize: 15,
  },
})

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import store from '@Store'
import styles from '@Styles'
import { Provider } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import CodePush from 'react-native-code-push'
import AppContainer from '@Navigators'
import {StyleSheet} from 'react-native'

class App extends Component{
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    CodePush.sync({
      // updateDialog: true,
      // ON_NEXT_RESUME 下次恢复到前台时
      // ON_NEXT_RESTART 下一次重启时
      // IMMEDIATE 马上更新
      installMode: CodePush.InstallMode.ON_NEXT_RESUME,
      // 对话框
      // updateDialog: {
      //   // 是否显示更新描述
      //   appendReleaseDescription: true,
      //   // 更新描述的前缀。 默认为"Description"
      //   descriptionPrefix: '更新内容：',
      //   // 强制更新按钮文字，默认为continue
      //   mandatoryContinueButtonLabel: '立即更新',
      //   // 强制更新时的信息. 默认为"An update is available that must be installed."
      //   mandatoryUpdateMessage: '必须更新后才能使用',
      //   // 非强制更新时，按钮文字,默认为"ignore"
      //   optionalIgnoreButtonLabel: '稍后',
      //   // 非强制更新时，确认按钮文字. 默认为"Install"
      //   optionalInstallButtonLabel: '后台更新',
      //   // 非强制更新时，检查到更新的消息文本
      //   optionalUpdateMessage: '有新版本了，是否更新？',
      //   // Alert窗口的标题
      //   title: '更新提示'
      // },
    })

    setTimeout(() => {
      SplashScreen.hide()
    }, 1500)

  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }

}

/**
 * Configured with a MANUAL check frequency for easy testing. For production apps, it is recommended to configure a
 * different check frequency, such as ON_APP_START, for a 'hands-off' approach where CodePush.sync() does not
 * need to be explicitly called. All options of CodePush.sync() are also available in this decorator.
 */
// 设置检查更新的频率
// ON_APP_RESUME APP恢复到前台的时候
// ON_APP_START APP开启的时候
// MANUAL 手动检查
const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
}

export default CodePush(codePushOptions)(App)

const viewStyles = StyleSheet.create({
  app: {
    ...styles.app,
  },
})


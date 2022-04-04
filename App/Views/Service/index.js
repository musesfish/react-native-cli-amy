import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withStore } from 'retalk'
import config from '@Config'
import {
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native'
import PropTypes from 'prop-types'

class ServiceScreen extends PureComponent {
  static navigationOptions = _ => {
    return {
      ...config.defaultNavigation,
      headerStyle: {
        backgroundColor: '#52C9C2',
      },
      headerTintColor: '#fff',
      title: '客服',
    }
  }

  componentDidMount = async () => {
    await this.props.getUserInfo()
    await this.props.getIndexMenus()
  }

  _navigate = jumpUrl => {
    this.props.navigation.navigate(jumpUrl)
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this._navigate.bind(this, 'User')} key="1">
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <Text>客服</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default connect(...withStore('app'))(ServiceScreen)

ServiceScreen.defaultProps = {
  sections: [],
}

ServiceScreen.propTypes = {
  sections: PropTypes.array,
}



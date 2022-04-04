import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStore } from 'retalk'
import config from '@Config'
import styles from '@Styles'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import { Avatar } from 'react-native-elements';
import { List } from '@ant-design/react-native';
const Item = List.Item;

class UserScreen extends PureComponent {
  static navigationOptions = _ => {
    return {
      ...config.defaultNavigation,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#333',
      title: '我的',
    }
  }

  constructor() {
    super()
    this.menuList = [
      {
        title: '系统',
        icon: 'verified-user',
        color: '#0c9',
        type: 'material',
        onPress() {
          this.props.navigation.navigate('System')
        },
      },
      {
        title: '设置',
        icon: 'settings',
        color: '#29A6F1',
        type: 'material',
        onPress() {
          this.props.navigation.navigate('Settings')
        },
      },
    ]
  }

  componentDidMount = async () => {
    await this.props.getUserInfo()
  }

  render() {
    const {
      userName,
      headImgUrl,
    } = this.props.user
    return (
      <View style={viewStyles.container}>
        <View style={viewStyles.userInfo}>
          <View style={viewStyles.main}>
            <View style={viewStyles.infoContent}>
              <Avatar
                activeOpacity={0.7}
                title={
                  userName !== '' && userName !== null && userName
                    ? '苏'
                    : null
                }
                containerStyle={viewStyles.imgStyle}
                size={64}
                rounded
                source={{
                  uri:
                    headImgUrl === null || headImgUrl === ''
                      ? 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/1281.jpg'
                      : `${config.devImgUrl}/headImgUrl`,
                }}
              />
              <View style={viewStyles.messageCard}>
                <Text style={viewStyles.userName}>姓名</Text>
                <Text
                  style={viewStyles.userDepartment}
                >所属部门</Text>
                <Text style={viewStyles.userCompany}>所在分公司</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          {this.menuList.map((item, i) => (
            <View key={i}>
              <TouchableWithoutFeedback onPress={item.onPress.bind(this)}>
                <Item thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" arrow="horizontal">
                {item.title}
                </Item>
              </TouchableWithoutFeedback>
            </View>
          ))}
        </View>
      </View>
    )
  }
}

export default connect(...withStore('app','user'))(UserScreen)

UserScreen.defaultProps = {
  nick_name: '',
  department: '',
  company: '',
  avatar_url: '',
}

UserScreen.propTypes = {
  nick_name: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  avatar_url: PropTypes.string.isRequired,
}

const viewStyles = StyleSheet.create({
  container: {
    ...styles.container,
  },
  main: {
    ...styles.main,
  },
  userInfo: {
    backgroundColor: '#fbfbfb',
    paddingTop: 15,
    paddingBottom: 22,
  },
  infoContent: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingLeft: 15,
    paddingRight: 15,
    shadowColor: '#a8a8a8',
    shadowOpacity: 0.18,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  messageCard: {
    flexGrow: 1,
  },
  imgStyle: {
    width: 64,
    height: 64,
    marginRight: 10,
  },
  userName: {
    fontSize: 20,
    color: '#000',
    paddingBottom: 6,
  },
  userDepartment: {
    fontSize: 11,
    color: '#666',
    paddingBottom: 4,
  },
  userCompany: {
    fontSize: 11,
    color: '#666',
    paddingBottom: 4,
  },
  listItem: {
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: '#EBEAEB',
    backgroundColor: '#fff',
  },
  listItemTitle: {
    fontSize: 15,
  },
})

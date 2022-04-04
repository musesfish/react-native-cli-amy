import React, { PureComponent } from 'react'
import config from '@Config'
import styles from '@Styles'
import {Image,View, StyleSheet, TouchableWithoutFeedback, Alert,Text,TextInput } from 'react-native'
import {List,InputItem,Button} from '@ant-design/react-native'
import Tools from '@Utils/tools'
import storage from '@Utils/storage'
import Loading from '@Components/Loading'
import fetch from '@Network'

const rString = Tools.randomString(
  32,
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
)

class LoginScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
      passWord: '',
      loading: false,
      issubmit: false,
      code: '',
      num: Math.random(),
      token: rString,
      api: 'api/other/captch/imageCaptcha',
    }
  }

  _onPressLogIn = async () => {
    const { phone, passWord, code, token } = this.state
    if (this._checkData(phone, passWord, code)) {
      this.setState({
        loading: true,
        label: '登录中...',
      })
      const { data } = await fetch.post(
        `/app/user/login?account=${phone}&passWord=${passWord}&imgCode=${code}&imgToken=${token}`,
      )
      if (data.ret === 100) {
        this.setState({
          type: 'success',
          label: '登录成功',
          issubmit: false
        })
        storage.save('userToken', data.token)
        storage.save('userId', data.userId)
        setTimeout(() => {
          this.setState({
            loading: false,
          })
          this._clearData()
          this._updateCaptcha()
          this.props.navigation.navigate('AuthLoading')
        }, 2000)
      } else {
        this.setState({
          loading: true,
          label: '登录失败',
          issubmit: false
        })
        Alert.alert(
          '提示',
          data.msg,
          [
            {
              text: '确定',
              onPress: () => {
                this._updateCaptcha()
                this.setState({
                  loading: false,
                })
              },
            },
          ],
          { cancelable: false },
        )
      }
    } else {
      await this._checkData(phone, passWord, code)
    }
  }

  componentDidMount() {
    const { api, num, token } = this.state
    const imageCaptcha = `${config.devBaseUrl}/${api}?token=${token}&num=${num}`
    this.setState({
      num: num + 1,
      imageCaptcha: imageCaptcha,
    })
  }

  _updateCaptcha = () => {
    const { api, token, num } = this.state
    const imageCaptcha = `${config.devBaseUrl}/${api}?token=${token}&num=${num}`
    this.setState({
      num: num + 1,
      imageCaptcha: imageCaptcha,
    })
  }

  _checkData = (phone, passWord, code) => {
    if (!Tools.isPhoneNumber(phone)) {
      Alert.alert('手机号码有误！');
      return false
    }

    if (!Tools.isPassWord(passWord)) {
      Alert.alert('密码错误');
      return false
    }

    if (code === '') {
      Alert.alert('验证码不能为空');
      return false
    }
    this.setState({
      issubmit: true
    })
    return true;
  }

  _clearData = async () => {
    this.setState({
      phone: '',
      passWord: '',
      code: '',
      issubmit:true
    })
  }

  render() {
    const {
      code,
      phone,
      passWord,
      issubmit
    } = this.state
    return (
      <View style={viewStyles.container}>
        <TouchableWithoutFeedback>
          <List style={viewStyles.main}>
            <Text h4 style={viewStyles.titleStyle}>登录</Text>
            <InputItem
              clear
              value={phone}
              onChange={value => {
                this.setState({
                  phone: value,
                });
              }}
              placeholder='请输入手机号码'
            />
            <InputItem
              clear
              type="password"
              value={passWord}
              onChange={value => {
                this.setState({
                  passWord: value,
                });
              }}
              placeholder='请输入密码'
            />
            <View style={{flexDirection:"row",justifyContent:"flex-start",paddingLeft:18}}> 
              <TextInput
                style={{height:48,borderColor: '#eef', borderBottomWidth: 1,width:100,fontSize:16,flexGrow:1,marginTop:2}}
                onChangeText={value => {
                  this.setState({
                    code: value,
                  });
                }}
                onFocus={this._clearErrorMsg}
                placeholder="验证码"
                maxLength={4}
                value={code}
              />
              <Image
                source={{ uri: this.state.imageCaptcha }}
                style={{ width: 100, height: 40,marginLeft:5,marginTop:5 }}
              />
              <Button
                onPress={this._updateCaptcha}
                style={{ width: 60, height: 40 ,marginLeft:5,marginTop:5}}
                size="small"
              >
                换一个
              </Button>
            </View>
            <Button onPress={this._onPressLogIn} style={{marginTop:20}} disabled={issubmit} type="primary">
              登录
            </Button>
          </List>
        </TouchableWithoutFeedback>
        {this.state.loading === true ? (
          <Loading label={this.state.label} type={this.state.type} />
        ) : null}
      </View>
    )
  }
}

export default LoginScreen

const viewStyles = StyleSheet.create({
  container: {
    ...styles.container,
    backgroundColor: '#fff',
  },
  main: {
    ...styles.main,
  },
  containerStyleInput: {
    marginBottom: 10,
    marginTop: 0,
    paddingHorizontal: 0,
  },
  inputStyle: {
    fontSize: 14,
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
  },
  errorStyle: {
    fontSize: 16,
    color: 'red',
  },
  titleStyle: {
    fontSize: 20,
    paddingTop: 140,
    paddingLeft: 18,
    paddingBottom: 40,
  },
  myinput:{
    borderWidth:1,
    borderColor:"red"
  }
})

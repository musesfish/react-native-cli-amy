import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withStore } from 'retalk'
import config from '@Config'
import Swiper from 'react-native-swiper';
import {
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions
} from 'react-native'
const {width} = Dimensions.get('window');  //解构赋值 获取屏幕宽度

class HomeScreen extends PureComponent {
  static navigationOptions = _ => {
    return {
      ...config.defaultNavigation,
      headerStyle: {
        backgroundColor: '#52C9C2',
      },
      headerTintColor: '#fff',
      title: '首页',
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      items:[
        {imgurl:require("@assets/images/ad1.png"),target:'Mall'},
        {imgurl:require("@assets/images/ad2.png"),target:'Mall'},
        {imgurl:require("@assets/images/ad1.png"),target:'Mall'}
      ]
    }
  }

  _jump = (tar) => {
    this.props.navigation.navigate(tar)
  }

  render() {
    const {items} = this.state
    return (
      <ScrollView>
        <View style={viewStyles.banner}>
          <Swiper autoplay loop
            removeClippedSubviews={false}
            dot={<View style={{backgroundColor: 'rgba(255,255,255,.6)',width: 8,height: 8,borderRadius: 4,marginLeft: 3, marginRight: 3, marginTop: 3,marginBottom: 3}} />}        
            activeDot={<View style={{backgroundColor: '#52C9C2', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
            paginationStyle={{
                bottom: 12
            }}
          >
            {items.map((item,ind) =>  
              <TouchableWithoutFeedback style={viewStyles.slide} onPress={this._jump.bind(this,item.target)} key={ind}>
                <Image resizeMode='stretch' style={viewStyles.bannerimg} source={item.imgurl} />
              </TouchableWithoutFeedback>
            )}
          </Swiper>
        </View>
        <View style={viewStyles.adbox}>
          <Text style={viewStyles.adtitle}>热门推荐</Text>
          {items.map((item,ind) =>  
            <TouchableWithoutFeedback onPress={this._jump.bind(this,item.target)}>
              <Image resizeMode='stretch' source={item.imgurl} style={viewStyles.adimg} key={ind}/>
            </TouchableWithoutFeedback>
          )}
        </View>
      </ScrollView>
    )
  }
}

export default connect(...withStore('home'))(HomeScreen)

const viewStyles = StyleSheet.create({
  banner:{
    height:220
  },
  slide: {
    flex: 1
  },
  bannerimg:{
    width:width,
    flex: 1
  },
  adbox:{
    margin:10
  },
  adtitle:{
    fontSize:18,
    paddingBottom:10,
    paddingTop:10
  },
  adimg:{
    marginBottom:10,
    height:150,
    flex:1,
    width:'100%'
  }
})

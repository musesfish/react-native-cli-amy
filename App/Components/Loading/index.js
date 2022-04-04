import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
  Image,
} from 'react-native'
import PropTypes from 'prop-types'
import SUBMIT from '@assets/images/submit.png'

export default class LoadingComponent extends PureComponent {
  render() {
    const { label, type } = this.props
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          hardwareAccelerated={true}
          visible={true}
        >
          <TouchableWithoutFeedback>
            <View style={viewStyles.container}>
              <View style={viewStyles.main}>
                {type === 'success' ? (
                  <Image source={SUBMIT} style={{ alignSelf: 'center' }} />
                ) : (
                  <ActivityIndicator size="large" color="#52C9C2" />
                )}
                <Text style={viewStyles.text}>{label}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    )
  }
}

LoadingComponent.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
}

const viewStyles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    width: 160,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#a8a8a8',
    shadowOpacity: 0.18,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    height: 'auto',
  },
  text: {
    alignSelf: 'center',
    color: '#333',
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 4,
  },
})

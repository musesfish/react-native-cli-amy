import config from '@Config'

export default {
  app:{
    color:"#333",
    fontSize:22
  },
  container: {
    flex: 1,
    backgroundColor: config.viewsBackgroundColor,
  },
  main: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonTitleStyle: {
    fontSize: 16,
    color: '#fff',
  },
  buttonStyle: {
    marginTop: 34,
    borderRadius: 23,
    height: 46,
    backgroundColor: '#52C9C2',
  },
  disabledStyle: {
    backgroundColor: '#AAA9AA',
  },
  disabledTitleStyle: {
    color: '#fff',
  },
}

const Skin = {
    mainColor: '#52C9C2',
    viewsBackgroundColor: '#F5F5F5',
}
  
const App = {
    devBaseUrl: 'xxx',
    devUploadUrl: 'xxx',
    devImgUrl: 'xxx',
    prodBaseUrl: 'xxx',
    defaultNavigation: {
            headerStyle: {
            backgroundColor: '#fff',
            borderColor: '#E9E9E9',
            borderBottomWidth: 1,
            elevation: 0,
        },
            headerTintColor: '#333',
            headerTitleStyle: {
            flex: 1,
            fontSize: 18,
            fontWeight: 'normal',
        },
    },
}
  
export default {
    ...App,
    ...Skin,
}
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['import', { libraryName: '@ant-design/react-native' }],
    [
      'module-resolver',
      {
        root: ['./App'],
        alias: {
          '@Components': './App/Components',
          '@Config': './App/Config',
          '@Network': './App/Network',
          '@Styles': './App/Styles',
          '@Utils': './App/Utils',
          '@Views': './App/Views',
          '@Store': './App/Store',
          '@assets': './App/assets',
          '@Navigators': './App/Navigators'
        }
      }
    ]
  ]
}

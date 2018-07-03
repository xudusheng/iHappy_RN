import { AppRegistry } from 'react-native';
import App from './App';
// AppRegistry.registerComponent('iHappy', () => App);
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


import QRoot from './q2002/root';
AppRegistry.registerComponent('iHappy', () => QRoot);
// AppRegistry.registerComponent('iHappy', () => App);


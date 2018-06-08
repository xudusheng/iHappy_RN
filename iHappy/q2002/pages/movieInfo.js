import React, {Component} from 'react';
import {
    StyleSheet,
    WebView,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    requireNativeComponent,
} from 'react-native';


var DomParser = require('react-native-html-parser').DOMParser;

export default class MovieInfo extends Component{
    static navigationOptions = ({navigation}) => ({
        // 展示数据 "`" 不是单引号
        title: navigation.state.params.movieInfo.title,

    });
    render() {

        const movieInfo = this.props.navigation.state.params.movieInfo;
        console.log(movieInfo);
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit App.js
                </Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
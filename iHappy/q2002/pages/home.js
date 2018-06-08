import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity,
    InteractionManager,
    RecyclerViewBackedScrollView,
    RefreshControl,
} from 'react-native';
import * as GlobleConst from './p.const';

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

let DomParser = require('react-native-html-parser').DOMParser;

// import MovieList from "./movieList"

type Props = {};
export default class Home extends Component<Props> {

    constructor() {
        super();

        this.typeList = [
            {
                typeName: '电影',
                typeHref: 'http://www.q2002.com/type/1.html',
            },

            {
                typeName: '电视剧',
                typeHref: 'http://www.q2002.com/type/2.html',
            },

            {
                typeName: '动漫',
                typeHref: 'http://www.q2002.com/type/7.html',
            },

            {
                typeName: '音乐',
                typeHref: 'http://www.q2002.com/type/6.html',
            },

            {
                typeName: '综艺',
                typeHref: 'http://www.q2002.com/type/4.html',
            },

            {
                typeName: '福利',
                typeHref: 'http://www.q2002.com/type/3.html',
            },
        ];
    }

    render() {
        return (
            <View style={HomeStyles.containerStyle}>

                <ScrollableTabView
                    renderTabBar={() =>
                        <DefaultTabBar
                            tabStyle={HomeStyles.tabStyle}
                            textStyle={HomeStyles.textStyle}
                        />
                    }
                    tabBarBackgroundColor="#fcfcfc"
                    tabBarUnderlineStyle={HomeStyles.tabBarUnderline}
                    tabBarActiveTextColor="#3e9ce9"
                    tabBarInactiveTextColor="#aaaaaa"
                >
                    <MovieList {...this.props} style={{backgroundColor:"red", flex:1}}  tabLabel="电影" movieRef="http://www.q2002.com/type/1"> </MovieList>
                    <MovieList {...this.props} style={{backgroundColor:"green", flex:1}} tabLabel="电视剧" movieRef="http://www.q2002.com/type/2"> </MovieList>
                    <MovieList {...this.props} style={{backgroundColor:"blue", flex:1}} tabLabel={"动漫"} movieRef="http://www.q2002.com/type/7"> </MovieList>
                    <MovieList {...this.props} style={{backgroundColor:"blue", flex:1}} tabLabel={"综艺"} movieRef="http://www.q2002.com/type/4"> </MovieList>
                    <MovieList {...this.props} style={{backgroundColor:"blue", flex:1}} tabLabel={"音乐"} movieRef="http://www.q2002.com/type/6"> </MovieList>
                    <MovieList {...this.props} style={{backgroundColor:"blue", flex:1}} tabLabel={"福利"} movieRef="http://www.q2002.com/type/3"> </MovieList>

                </ScrollableTabView>

            </View>
        );
    }


    homeViews(){

    }
}

let col = 3;//列数
let margin_gap = 15;//间距
import Dimensions from 'Dimensions';
import MovieList from "./movieList";
let screenWidth = Dimensions.get('window').width;
let cellWidth = (screenWidth - margin_gap * (col + 1)) / col;
let cellHeight = cellWidth / 0.6;
const HomeStyles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor:"#F5FCFF"
    },
    listViewStyle: {
        flex: 1,
    },
    listViewContentContainerStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    sectionHeaderViewStyle: {
        backgroundColor: '#eeeeee',
        width: screenWidth,
        justifyContent: 'center',
    },
    sectionHeaderTitleStyle: {
        marginLeft: margin_gap,
        width:screenWidth,
        color: 'red',
    },
    cellContentViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: cellWidth,
        height: cellHeight,
        marginTop: 10,
        marginLeft: margin_gap,
    },

    imageStyle: {
        width: cellWidth,
        height: cellHeight,

    },
    textViewStyle: {
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        bottom: 0,
        left: 0,
        right: 0,
    },
    titleStyle: {
        flex: 1,
        color: 'white',
    },
    moneyStyle: {
        flex: 1,
        color: 'red',
    },


    tabStyle: {
        paddingBottom: 0,
        height:30
    },
    textStyle: {
        fontSize: 16
    },
    tabBarUnderline: {
        backgroundColor: '#3e9ce9',
        height: 1.5,
    },
});

import React, {Component} from 'react';
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
import App from '../../App';

type Props = {};
export default class Home extends Component<Props> {

    constructor() {
        super();
        $rootURL = 'http://localhost/iHappy/query';
        this.typeList = [
            {
                typeName: '电影',
                typeHref: '1',
            },

            {
                typeName: '电视剧',
                typeHref: '2',
            },

            {
                typeName: '动漫',
                typeHref: '7',
            },

            {
                typeName: '音乐',
                typeHref: '6',
            },

            {
                typeName: '综艺',
                typeHref: '4',
            },

            {
                typeName: '福利',
                typeHref: '13',
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
                    <MovieList {...this.props} style={{backgroundColor: "red", flex: 1}} tabLabel="电影"
                               movieRef="http://localhost/iHappy/query" type={1}> </MovieList>
                    <MovieList {...this.props} style={{backgroundColor: "green", flex: 1}} tabLabel="电视剧"
                               movieRef="http://localhost/iHappy/query" type={2}> </MovieList>
                    <MovieList {...this.props} style={{backgroundColor: "blue", flex: 1}} tabLabel={"动漫"}
                               movieRef="http://localhost/iHappy/query" type={7}> </MovieList>
                    <MovieList {...this.props} style={{backgroundColor: "blue", flex: 1}} tabLabel={"综艺"}
                               movieRef="http://localhost/iHappy/query" type={4}> </MovieList>
                    <MovieList {...this.props} style={{backgroundColor: "blue", flex: 1}} tabLabel={"音乐"}
                               movieRef="http://localhost/iHappy/query" type={6}> </MovieList>
                    <MovieList {...this.props} style={{backgroundColor: "blue", flex: 1}} tabLabel={"福利"}
                               movieRef="http://localhost/iHappy/query" type={13}> </MovieList>

                </ScrollableTabView>
            </View>
        );
    }


    homeViews() {

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
        backgroundColor: "#F5FCFF"
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
        width: screenWidth,
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
        height: 30
    },
    textStyle: {
        fontSize: 16
    },
    tabBarUnderline: {
        backgroundColor: '#3e9ce9',
        height: 1.5,
    },
});

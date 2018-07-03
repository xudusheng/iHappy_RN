import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    View,
    ScrollView,
    WebView
} from 'react-native';

var DomParser = require('react-native-html-parser').DOMParser;
import * as GlobleConst from './p.const';
// const playerHtml = (Platform.OS == 'ios') ? require('./pages/demo.html') : { uri: 'file:///android_asset/pages/demo.html' }
const playerHtml = require('./player.html');
import 'whatwg-fetch';
import QResourceListView from './resourceListView';


export default class MovieInfo extends Component {
    static navigationOptions = ({navigation}) => ({
        // 展示数据 "`" 不是单引号
        title: navigation.state.params.movieInfo.name,

    });

    constructor() {
        super();
        this.state = {
            movieDetailInfo: null,
            selectedMovie: null,
            playerSource: null
        };
    }

    componentWillMount() {
        this.movieInfo = this.props.navigation.state.params.movieInfo;
    }

    componentDidMount() {
        console.log(this.movieInfo);
        this.fetchMovieInfo();
    }

    render() {

        if (this.state.movieDetailInfo) {
            return (
                this.createMovieDetailInfoView()
            );

        } else {
            return (
                <View style={{backgroundColor: "red", flex: 1}}/>
            );
        }
    }

    createMovieDetailInfoView() {
        // movieDetailInfo.title = title;
        // movieDetailInfo.info = detailInfoArr;
        // movieDetailInfo.sumary = sumaryValue;
        // movieDetailInfo.resourceList = resourceList;
        let title = this.state.movieDetailInfo.title;
        let image = this.state.movieDetailInfo.image;
        let detailInfoArr = this.state.movieDetailInfo.info;
        let sumary = this.state.movieDetailInfo.sumary;
        let resourceList = this.state.movieDetailInfo.resourceList;
        let player;
        if (this.state.playerSource) {
            let headers = {Referer: this.movieInfo.href};
            let uri = this.state.playerSource;
            player =
                <View style={movieInfoStyles.playerStyle}>
                    <WebView
                        source={{
                            uri: uri,
                            headers: headers
                        }}
                        // source={playerHtml}
                        style={{flex: 1}}
                        // javaScriptEnabled={true}
                        // domStorageEnabled={true}
                        // decelerationRate="normal"
                        startInLoadingState={true}
                        scalesPageToFit={true}
                    />
                </View>
        } else {
            player = (<View style={movieInfoStyles.playerStyle}></View>);
        }

        let containerView =
            <View style={movieInfoStyles.container}>
                <ScrollView>
                    {player}
                    {/*//TODO:集数列表*/}
                    <QResourceListView
                        resourceList={resourceList}
                        selectedMovie={this.state.selectedMovie}
                        onClickButton={(selectedMovie) => {
                            this.setState({
                                ...this.state,
                                selectedMovie: selectedMovie,
                            });
                            this.fetchPlayerInfo();
                        }}/>
                </ScrollView>

            </View>;

        return containerView;
    }

    fetchMovieInfo() {
        // this.doXMLHttpRequest();
        // return;

        // this.doPhpRequestTest();
        // return;

        let md5key = this.movieInfo.md5key;
        let href = "http://localhost/iHappy/querydetail?md5key=" + md5key;

        console.log("href = " + href);
        fetch(href, {}).then((response) => {

            return response.text();
        }).then((detailData) => {
            var containerInfo = {};

            let responsejson = JSON.parse(detailData);
            let result = responsejson.result;
            console.log(result);
            //获取标题
            let title = this.movieInfo.name;
            //获取标题图片
            let imageHref = this.movieInfo.image_src;
            //获取影片信息


            //获取影片简介
            let sumaryValue = this.movieInfo.summary;

            //获取影片集数以及对应的播放地址
            var resourceList = [];
            let selectedMovie = null;
            for (var i = 0; i < result.length; i++) {
                console.log('[[[[[[[[[[[[[[[[[[[[');
                let oneResourcList = result[i];
                let headerTitle = " " + i + 1 + ". 在线视频 (支持手机)高清资源 - 在线播放 - 如果不能播放先刷新试试";
                let helpContent = "1、有个别电影打开后播放需要等待。\n" +
                    "2、如果电影打开不能播放请留言给我们，我们更换资源。\n" +
                    "3、有的播放不了请多刷新几下，试试。";
                resourceList.push({
                    headerTitle: headerTitle,
                    sourceList: oneResourcList,
                    footerTitle: helpContent,
                });

                if (selectedMovie == null) {
                    selectedMovie = oneResourcList[0];
                }
            }


            containerInfo.title = title;
            containerInfo.image = imageHref;
            containerInfo.info = [];
            containerInfo.sumary = sumaryValue;
            containerInfo.resourceList = resourceList;

            this.setState({
                movieDetailInfo: containerInfo,
                selectedMovie: selectedMovie,
                playerSource: null,
            });

            //加载播放器
            this.fetchPlayerInfo();

        }).catch((error) => {
            alert(error);
        })
    }

    fetchPlayerInfo() {
        let selectedMovie = this.state.selectedMovie;
        if (selectedMovie == null) {
            return;
        }
        let ekey = selectedMovie.ekey;
        if (ekey.length < 1) {
            return;
        }
        let url = "http://localhost/iHappy/queryplayer?ekey=" + ekey;
        console.log('url = ' + url);
        fetch(url)
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                let player = JSON.parse(data);
                let playerurl = player.playerurl;
                console.log('playerurl = ' + playerurl);

                this.setState({
                    ...this.state,
                    playerSource: playerurl,
                });
            })
            .catch((error) => {
                // alert(error);
            })
    }
}


import Dimensions from 'Dimensions';

let screenWidth = Dimensions.get('window').width;
let playerHeight = screenWidth * 9.0 / 16.0;
const movieInfoStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    playerStyle: {
        flex: 1,
        backgroundColor: "black",
        height: playerHeight,
    }
});
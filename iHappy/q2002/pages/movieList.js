import React, {Component} from 'react';
import PropTypes from 'prop-types';

var DomParser = require('react-native-html-parser').DOMParser;
import * as STATUS from '../actions/netStatus';
import * as GlobleConst from './p.const';

import {
    StyleSheet,
    View,
    TouchableOpacity,
    RecyclerViewBackedScrollView,
    RefreshControl,
    Image,
    Text,
    ListView,
} from 'react-native';
import fetchMovieList from "../actions/movie"

export default class MovieList extends Component {

    static propTypes = {
        movieRef: PropTypes.string,
        type: PropTypes.number,
    };

    constructor() {
        super();
        // 初始化数据源(rowHasChanged是优化的一种手段，只有当r1 !== r2的时候才会重新渲染)
        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.isLoading = false;
        let movie = {
            currentPage: 1,
            isLoading: false,
            netStatus: STATUS.FETCH_DONE,
            movieList: []
        };
        this.state = {
            movie: movie,
        }

    }

    render() {
        console.log('=------------' + this.props.movieRef);

        let movie = this.state.movie;


        console.log('*****************' + this.props.movieRef);
        console.log("\\\\\\\\\\" + movie.isLoading);

        if (movie.movieList.length < 1) {
            switch (movie.netStatus) {
                case STATUS.FETCH_DONE: {
                    //正在加载
                    return (
                        <View style={movieListStyles.container}>
                            <Text> 暂无数据 </Text>
                        </View>);
                }
                case STATUS.FETCH_ERROE: {
                    //请求异常
                    return (
                        <View style={movieListStyles.container}>
                            <Text> 网络异常，稍后刷新重试 </Text>
                        </View>);
                }
                default: {
                    return (
                        <View style={movieListStyles.container}>
                        </View>);
                }
            }
        } else {
            return (
                <View style={movieListStyles.container}>
                    <ListView
                        style={movieListStyles.listViewStyle}
                        dataSource={this.dataSource.cloneWithRows(movie.movieList)}
                        renderRow={this.renderRow.bind(this)}
                        initialListSize={10}
                        contentContainerStyle={movieListStyles.listViewContentContainerStyle}
                        onEndReached={() => this.fetchNextPageMovies()}
                        onEndReachedThreshold={10}
                        refreshControl={
                            <RefreshControl
                                refreshing={movie.isLoading}
                                onRefresh={() => this.fetchFirstMovieList()}
                                title="Loading..."
                                colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
                            />
                        }
                    />;
                </View>
            );
        }

    }

//TODO:ListViewCell
    renderRow(rowData, sectionID, rowID, highlightRow) {
        let view =
            <TouchableOpacity
                onPress={() => this.pressCell(rowData)}
                style={movieListStyles.cellContentViewStyle}
            >
                <Image source={{uri: rowData.image_src}} style={movieListStyles.imageStyle}/>
                <View style={movieListStyles.textViewStyle}>
                    <Text style={movieListStyles.titleStyle} numberOfLines={1}>{rowData.name}</Text>
                </View>
            </TouchableOpacity>;
        return view;
    }

    componentDidMount() {
        this.fetchFirstMovieList();
    }

    fetchFirstMovieList() {
        let fetchurl = this.props.movieRef + '?type=' + this.props.type + '&page=' + 1;
        this.fetchlocalserverdata(fetchurl, 1);
    }


    fetchNextPageMovies() {
        let currentPage = this.state.movie.currentPage;
        let nextPage = currentPage + 1;
        let fetchurl = this.props.movieRef + '?type=' + this.props.type + '&page=' + nextPage;
        this.fetchlocalserverdata(fetchurl, nextPage);
    }

    pressCell(rowData) {
        // this.fetchNextPageMovies();
        console.log(rowData);
        console.log(this.props);
        const {navigate} = this.props.navigation;
        navigate("MovieInfo", {movieInfo: rowData});
    }


    searchMovieList(key, page = 1) {//搜索
        let fetchurl = this.props.movieRef + '?keyword=' + key;
        this.fetchlocalserverdata(fetchurl);//
    }

    //TODO:网络请求
    fetchlocalserverdata(fetchurl, page = 1) {
        let isLoadMore = (page > 1);
        let isRefreshing = !isLoadMore;

        var movie = this.state.movie;

        movie.isLoading = true;
        movie.netStatus = STATUS.FETCH_DOING;
        this.setState({
            movie: movie,
        });
        fetch(fetchurl, {
            // method: 'GET'

        }).then((response) => {

            return response.text();
        }).then((data) => {
            movie.currentPage = page;
            movie.isLoading = false;
            movie.netStatus = STATUS.FETCH_DONE;

            $result = JSON.parse(data);
            movie.movieList = this.state.movie.movieList.concat($result.result);

            this.setState({
                movie: movie,
            });

        }).catch((error) => {
            //登陆失败
            alert(error.message);

            movie.isLoading = false;
            movie.netStatus = STATUS.FETCH_DONE;
            if (movie.movieList.length < 1) {
                movie.netStatus = STATUS.FETCH_ERROE;
            }
            this.setState({
                movie: movie,
            });
        });
    }
}


let col = 3;//列数
let margin_gap = 5;//间距
import Dimensions from 'Dimensions';
import MovieInfo from "./movieInfo";

let screenWidth = Dimensions.get('window').width;
let cellWidth = (screenWidth - margin_gap * (col + 1)) / col;
let cellHeight = cellWidth / 0.6;
const movieListStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    listViewStyle: {
        flex: 1,
        backgroundColor: 'red',
    },
    listViewContentContainerStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: "#eeeeee",
    },

    listViewStyle: {
        flex: 1,
    },
    cellContentViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: cellWidth,
        height: cellHeight,
        marginTop: 5,
        marginLeft: margin_gap,
    },

    imageStyle: {
        width: cellWidth,
        height: cellHeight,
        backgroundColor: "#eeeeee"
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
        textAlign: 'center',
    },
});

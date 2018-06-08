import React, {Component} from 'react';
import PropTypes from 'prop-types';

var DomParser = require('react-native-html-parser').DOMParser;
import * as STATUS from '../actions/netStatus';
import * as GlobleConst from './p.const';

import {
    StyleSheet,
    View,
    ListView,
    TouchableOpacity,
    RecyclerViewBackedScrollView,
    RefreshControl,
    Image,
    Text,
} from 'react-native';
import fetchMovieList from "../actions/movie"

export default class MovieList extends Component {

    static propTypes = {
        movieRef: PropTypes.string,
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
        console.log('*****************' + this.props.movieRef);
        console.log(this.props.movie);

        let movie = this.state.movie;
        if (movie.movieList.length < 1) {
            return (<View style={movieListStyles.container}/>);
        } else {
            return (
                <View style={movieListStyles.container}>
                    <ListView
                        style={movieListStyles.listViewStyle}
                        dataSource={this.dataSource.cloneWithRows(movie.movieList)}
                        renderRow={this.renderRow.bind(this)}
                        initialListSize={10}
                        // renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
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
                <Image source={{uri: rowData.imageurl}} style={movieListStyles.imageStyle}/>
                <View style={movieListStyles.textViewStyle}>
                    <Text style={movieListStyles.titleStyle} numberOfLines={1}>{rowData.title}</Text>
                </View>
            </TouchableOpacity>;
        return view;
    }

    componentDidMount() {
        this.fetchFirstMovieList();
    }

    fetchFirstMovieList() {
        this.fetchMovieList(this.props.movieRef);
    }


    fetchNextPageMovies() {
        let currentPage = this.state.movie.currentPage;
        this.fetchMovieList(this.props.movieRef, currentPage + 1);
    }

    pressCell(rowData) {
        // this.fetchNextPageMovies();
        console.log(rowData);
        const { navigate } = this.props.navigation;
        navigate("MovieInfo", {movieInfo:rowData});
    }


    fetchMovieList(fetchurl = GlobleConst.FetchURL, page = 1) {
        if (fetchurl.length) {
            // http://www.q2002.com/type/1/2.html
            fetchurl = fetchurl + '/' + page + '.html';
        }
        console.log(fetchurl);
        console.log(this.state.movie.currentPage + "-----------");
        this.htmlRequest(fetchurl, page);
    }

    searchMovieList(key, page = 1) {//搜索
        // http://www.q2002.com/search?wd=风花雪月;
        var fetchurl = GlobleConst.FetchURL;
        // fetchurl += ('search?wd=' + key);

        // http://www.q2002.com/s/%E8%8B%B1%E9%9B%84/2.html
        fetchurl += ('/s/' + key + '/' + page + '.html');
        this.htmlRequest(fetchurl, page);//
    }


//TODO:网络请求
    htmlRequest(fetchurl, page) {
        let isLoadMore = (page > 1);
        let isRefreshing = !isLoadMore;

        var movie = this.state.movie;

        movie.isLoading = true;
        movie.netStatus = STATUS.FETCH_DOING;

        fetch(fetchurl, {
            // method: 'GET'

        }).then((response) => {
            // console.log(response.text());
            return response.text();
        }).then((data) => {

            var result = dealXMLString(data);
            movie.currentPage = page;
            movie.isLoading = false;
            movie.netStatus = STATUS.FETCH_DONE;

            movie.movieList = this.state.movie.movieList.concat(result);

            this.setState({
                movie: movie,
            });

        }).catch((error) => {
            //登陆失败
            alert(error.message);

            movie.isLoading = false;
            movie.netStatus = STATUS.FETCH_DONE;
            if (movie.movieList.length < 1){
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
    },
    listViewContentContainerStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
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
        backgroundColor:"#eeeeee"
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
        textAlign:'center',
    },
});


//TODO:-------------------------------------------------------------------------------------------------

//TODO:XML解析
let dealXMLString = (data) => {
    let rooturl = GlobleConst.FetchURL;

    data = data.replace(/&raquo;/g, '');
    data = data.replace(/<\/footer><\/div>/g, '<\/footer>');
    data = data.replace(/<\/div><\/ul>/g, '<\/div>');
    console.log('开始解析');
    let doc = new DomParser().parseFromString(data, 'text/html');
    console.log('解析完成');

    //定义一下变量
    var movieList = [];
    let movie_sections = doc.querySelect('div[class="row"]');

    for (var section = 0; section < movie_sections.length; section++) {
        let sectionIndex = section;
        let sectionNode = movie_sections[sectionIndex];

        let movie_rows_test = sectionNode.getElementsByClassName('movie-item');


        if (movie_rows_test.length < 1) {
            continue;
        }

        let movie_rows = sectionNode.getElementsByClassName('movie-item');

        console.log(movie_rows);
        for (var row = 0; row < movie_rows.length; row++) {
            let rowIndex = row;
            let rowElement = movie_rows[rowIndex];

            let aNode = rowElement.querySelect('a[href]')[0];
            let imageNode = aNode.querySelect('img')[0];
            let buttonNode = aNode.querySelect('button[class="hdtag"]')[0];
            let updateNode = rowElement.querySelect('span')[0];

            let title = aNode.getAttribute('title');
            let href = rooturl + aNode.getAttribute('href');
            let imageurl = imageNode.getAttribute('src');
            let updateDate = updateNode.firstChild.nodeValue;
            let markTitle = buttonNode.firstChild.nodeValue;

            let oneItemInfo = {
                title: title,
                href: href,
                imageurl: imageurl,
                updateDate: updateDate,
                markTitle: markTitle
            };
            movieList.push(oneItemInfo);
        }
    }

    console.log(movieList);
    return movieList;
};
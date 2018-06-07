/**
 * Created by zhengda on 16/10/31.
 */
import movieList from "../pages/movieList";

var DomParser = require('react-native-html-parser').DOMParser;
import * as TYPES from './types';
import * as GlobleConst from '../pages/p.const';

export function fetchMovieList(typeId = 0, page = 1) {
    var fetchurl = GlobleConst.FetchURL;
    if (typeId > 0) {
        // http://www.q2002.com/type/1/2.html
        fetchurl = fetchurl + 'type/' + typeId + '/' + page + '.html';
    }
    return htmlRequest(fetchurl, typeId, page);
}

export function searchMovieList(key, page = 1) {//搜索  这里规定typeId = -1
    // http://www.q2002.com/search?wd=风花雪月;
    var fetchurl = GlobleConst.FetchURL;
    let searchTypeId = GlobleConst.SearchTypeId;
    // fetchurl += ('search?wd=' + key);

    // http://www.q2002.com/s/%E8%8B%B1%E9%9B%84/2.html
    fetchurl += ('/s/' + key + '/' + page + '.html');
    return htmlRequest(fetchurl, searchTypeId, page);//
}

export function clearSearchResult() {//清空搜索结果
    return ((dispatch) => {
        dispatch({'type': TYPES.CLEAR_SEARCH_RESULT});
    });
}


//TODO:网络请求
let htmlRequest = (fetchurl, typeId, page) => {
    let isLoadMore = (page > 1);
    let isRefreshing = !isLoadMore;

    return ((dispatch) => {
        dispatch({'type': TYPES.FETCH_DOING, isLoadMore: isLoadMore, isRefreshing: isRefreshing});

        fetch(fetchurl, {
            // method: 'GET'
        })
            .then((response) => {
                // console.log(response.text());
                return response.text();
            })
            .then((data) => {
                let result = dealXMLString(typeId, data);
                dispatch({'type': TYPES.FETCH_DONE, typeId: typeId, movieList: result, isLoadMore: isLoadMore});

            })
            .catch((error) => {
                //登陆失败
                alert(error.message);
                dispatch({'type': TYPES.FETCH_ERROE, error: error});
            });
    });
};

//TODO:XML解析
let dealXMLString = (typeId, data)=> {
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
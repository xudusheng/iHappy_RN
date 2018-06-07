/**
 * Created by zhengda on 16/10/31.
 */

import * as TYPES from '../actions/netStatus';
import * as GlobleConst from '../pages/p.const';

const initialState = {
    isRefreshing: false,//是否下拉刷新
    loading: false,//是否正在加载
    isLoadMore: false,//是否是上拉加载更多
    movieList: [],
};

export default function movie(state = initialState, action) {
    switch (action.type) {
        case TYPES.FETCH_DOING:
            return {
                ...state,
                isRefreshing: action.isRefreshing,
                loading: true,
                isLoadMore: action.isLoadMore,
            };

        case TYPES.FETCH_DONE:
            return {
                ...state,
                isRefreshing: false,
                loading: false,
                movieList: action.isLoadMore ? loadMore(state, action) : combine(state, action),
            };

        case TYPES.FETCH_ERROE:
            return {
                ...state,
                isRefreshing: false,
                loading: false,
                isLoadMore: false,
            };

        default:
            return state;
    }
};

function loadMore(state, action) {
    var new_movieList = [];
    new_movieList.push(this.movieList);
    new_movieList.push(action.movieList);
    state.movieList = new_movieList;
    return state.movieList;
}

function combine(state, action) {
    state.movieList = action.movieList;
    return state.movieList;
}

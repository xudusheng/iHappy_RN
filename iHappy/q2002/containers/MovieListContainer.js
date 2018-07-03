/**
 * Created by zhengda on 16/10/31.
 */

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Home from '../pages/home';
import MovieInfo from '../pages/movieInfo'
import * as movieCreators from '../actions/movie';

import App from '../../App';
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';


const APPNavigator = StackNavigator(
    {
        MovieList: { screen: Home },
        MovieInfo:{ screen: MovieInfo }
    },
    {
        navigationOptions: {
            title:"首页",
            headerBackTitle: null,
            headerTintColor: '#333333',
            gesturesEnabled: true,
        },
    },
);

export default class MovieListContainer extends React.Component {
    static componentDidMount() {
        //检查更新
    }

    render() {
        return (
            <APPNavigator/>
        );
    }
}

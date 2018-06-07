
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

class MovieList extends Component {
    render() {
        return (
            <View style={movieListStyles.container}>

            </View>
        );
    }


    componentDidMount(){
        this.props.actions.fetchMovieList("http://www.q2002.com/type/1", 1);
    }
}

const movieListStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});



import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as movieCreators from '../actions/movie';

//根据全局state返回当前页面所需要的信息,（注意以props的形式传递给当前页面）
//使用：this.props.movie
function mapStateToProps(state) {
    return {
        // movieReducer在reducer/index.js中定义
        movie: state.movieReducer,
    };
}

//返回可以操作store.state的actions,(其实就是我们可以通过actions来调用我们绑定好的一系列方法)
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(movieCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
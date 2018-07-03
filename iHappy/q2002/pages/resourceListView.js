/**
 * Created by zhengda on 16/10/28.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';

export default class QResourceListView extends Component {
    static defaultProps = {
        resourceList: [],
        onClickButton: ()=> {
        },
    };
    static propTypes = {
        //object
        // headerTitle: headerTitle
        //sourceList: sourceList
        //footerTitle: footerTitle
        resourceList: PropTypes.array.isRequired,
        onClickButton: PropTypes.func,
        selectedMovie: PropTypes.object,
    };

    render() {
        return (
            <View style={styles.resourceListViewContainerStyle}>
                {this.createResourceListView()}
            </View>
        );
    }

//TODO:创建集数列表-->标题，集数，观看帮助
    createResourceListView() {
        var resourceListViews = [];

        for (var i = 0; i < this.props.resourceList.length; i++) {
            let resouceIndex = i;
            var oneResouce = this.props.resourceList[resouceIndex];

            // resourceListViews.push(<View key={-(resouceIndex + 1)} style={{height: 30}}/>);//头部添加30高度的空白部分


            let title = oneResouce.headerTitle;
            let sourceList = oneResouce.sourceList;
            let footerTitle = oneResouce.footerTitle;

            let oneResouceContainerView =
                <View key={resouceIndex + 1} style={styles.oneResouceContainerViewStyle}>

                    <View style={styles.headerViewStyle}>
                        <Text style={styles.headerTextStyle}>{title}</Text>
                    </View>

                    <View style={styles.buttonListViewStyle}>
                        {this.createButtonLise(sourceList)}
                    </View>

                    <View style={styles.footerViewStyle}>
                        <Text style={styles.footerTextStyle}>{footerTitle}</Text>
                    </View>
                </View>;

            resourceListViews.push(oneResouceContainerView);
        }
        return resourceListViews;
    }

    createButtonLise(sourceList) {
        var buttonList = [];
        let selectedMovie = this.props.selectedMovie;
        for (var i = 0; i < sourceList.length; i++) {
            let buttonIndex = i;
            let oneSource = sourceList[buttonIndex];

            // title: btnTitle,
            // href: GlobleConst.FetchURL + href,
            let title = oneSource.title;
            let href = oneSource.href;


            var button =
                <TouchableOpacity key={buttonIndex} onPress={()=>this.props.onClickButton(oneSource)}
                                  style={(selectedMovie.ekey == oneSource.ekey)?styles.buttonViewStyleSelected : styles.buttonViewStyleNormal}>
                    <Text style={(selectedMovie.ekey == oneSource.ekey)?styles.buttonTitleStyleSelected : styles.buttonTitleStyleNormal}>{title}</Text>
                </TouchableOpacity>;
            buttonList.push(button);
        }
        return buttonList;
    }

}


const styles = StyleSheet.create({
    resourceListViewContainerStyle: {
        backgroundColor: 'white',
    },
    oneResouceContainerViewStyle: {
        backgroundColor: '#eeeeee',
        borderTopWidth: 0.7,
        borderTopColor: '#dddddd',
        borderBottomWidth: 0.7,
        borderBottomColor: '#dddddd',
    },

    headerViewStyle: {
        margin: 5,
    },
    headerTextStyle: {
    },

    footerViewStyle: {
        margin: 5,
    },
    footerTextStyle: {},


    buttonListViewStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'space-between',
        backgroundColor: 'white',

    },

    buttonViewStyleNormal: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 3,
        borderWidth: 0.7,
        borderColor: '#666666',
    },
    buttonTitleStyleNormal: {
        marginLeft: 10,
        marginRight: 10,
        color: '#666666',
    },

    buttonViewStyleSelected: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 3,
        borderWidth: 0.7,
        borderColor: '#E54A3A',
    },
    buttonTitleStyleSelected: {
        marginLeft: 10,
        marginRight: 10,
        color: '#E54A3A',
    },

});

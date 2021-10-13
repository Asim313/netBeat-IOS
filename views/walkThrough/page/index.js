import React,{Component} from 'react';
import {View,Text,Image} from 'react-native';
import { Size, wp } from '../../../assets';

export default class ShowsIn3d extends Component{
    

    render(){
        return(
            <View style={{flex : 1}}>
                                <View style={{flex : .13}}></View>
                <View style={{ justifyContent : 'center', alignItems : 'center'}}>
        <Text>{this.props.heading}</Text>
                </View>
                <View style={{flex : .17}}></View>
                <View style={{ justifyContent : 'center', alignItems : 'center'}}>
                    <Image resizeMode='contain' source={this.props.image} ></Image>
                </View>
                <View style={{flex : .1}}></View>
                <View style={{ justifyContent : 'center', alignItems : 'center', marginHorizontal : wp(15)}}>
                    <Text style={{fontSize : Size(2.3)}}>{this.props.firstText}</Text>
                </View>
                <View style={{flex : .07}}></View>
                <View style={{justifyContent : 'center', alignItems : 'center', marginHorizontal : wp(10)}}>
        <Text style={{fontSize : Size(1.7)}}>{this.props.secondText}</Text>
                </View>
            </View>
        );
    }
}
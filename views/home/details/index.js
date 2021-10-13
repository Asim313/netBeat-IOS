import React,{Component} from 'react';
import { ScrollView } from 'react-native';
import {View,Text,SafeAreaView, Image,ImageBackground,Dimensions, TouchableOpacity,Platform} from 'react-native';
import { hp, Size, wp } from '../../../assets';
import moment from 'moment';


export default class Details extends Component{
    constructor(props){
        super(props)
    }
  
    render(){
        return(
            <View style={{flex : 1, backgroundColor : 'white'}}>
                {/* <View style={{position : 'absolute',height : '100%', width : '100%'}}>
                <Image style={{height : '100%', width : '100%'}} source={require('../../resources/images/background.png')}></Image>
                </View> */}
                <ScrollView>
                <View style={{ height : hp(50) , width : '100%',  position : 'absolute'}}>
                <Image style={{height : '100%', width : '100%'}}  resizeMode='stretch' source={{uri : "http://88.198.152.58:1337"+this.props.route.params.data.Cover[0]?.url}}></Image>
                                       
                                </View>
                <View style={{ height : hp(100),width : '100%',height : '100%',  }}>

                             
                                <View style={{ height : hp(100),width : '100%', justifyContent : 'flex-end' }}>
                                <View style={{flex : .33}}></View>
                                <View style={{flex : .17,  marginHorizontal : wp(5)}}>
            <Text style={{color : 'white', fontSize : Size(4), marginRight : wp(30)}}>{this.props.route.params.data.ArtistName}</Text>
                                    <View style={{flex : .15}}></View>
            <Text style={{color : 'white', fontSize : Size(1.3)}}>{this.props.route.params.data.Location}</Text>
                                    <View style={{flex : .19}}></View>
                                    <Text style={{color : 'grey', fontSize : Size(1.1)}}>{moment(this.props.route.params.data.FromTime).format('LT')} - {moment(this.props.route.params.data.ToTime).format('LT')}</Text>
                                </View>
                                <View style={{flex  :.5}}>
                                <View style={{flex : .07}}></View>
            <Text style={{color : '#515151',flexShrink: 1,marginHorizontal : wp(5),fontSize : Size(1.9)}}>{this.props.route.params.data.Description}</Text>
                                    <View style={{flex : .02}}></View>
                                    <Text style={{color : 'grey', fontSize : Size(1.7),marginHorizontal : wp(5)}}>een livestream niet te missen</Text>                                
                                    <View style={{flex : .3}}></View>
                                    <View>
                                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('viewerSelection',{data : this.props.route.params.data.concert_streams})}} style={{justifyContent : 'center', alignItems : 'center', alignSelf : 'center'}}>
                                        <Image resizeMode='contain' source={require('../../../resources/images/watchLive.png')} ></Image>
                                        <Text style={{color : '#007AFF', alignSelf : 'center'}}>WATCH LIVE</Text>
                                        </TouchableOpacity>
                                    </View>
                                  
                                    </View>
                                   

                                        </View>
                                        </View>
                                        </ScrollView> 
            </View>
        );
    }
}


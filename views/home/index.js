import React,{Component} from 'react';
import { ScrollView } from 'react-native';
import {View,Text,SafeAreaView, Image,ImageBackground,Dimensions, TouchableOpacity,Platform} from 'react-native';
import { hp, Size, wp } from '../../assets';
import WService from '../../apis/index';
import moment from 'moment';


export default class Home extends Component{
    constructor(props){
        super(props)
    }
    state={
        // videos : [{
        //     address : 'Brussels',
        //     name : 'Arno & Zwangere Guy',
        //     time : 'Tonight LIVE: 21h',
        //     image : require('../../resources/images/image4.png')
        // },
        // {
        //     address : 'Brussels',
        //     name : 'Arno & Zwangere Guy',
        //     time : 'Tonight LIVE: 21h',
        //     image : require('../../resources/images/image3.png')
        // },
        // {
        //     address : 'Brussels',
        //     name : 'Arno & Zwangere Guy',
        //     time : 'Tonight LIVE: 21h',
        //     image : require('../../resources/images/image5.png')
        // }],
        response : []
    }

    componentDidMount(){
        WService.getWithoutHeader('concerts').then(i => {
            console.warn(JSON.stringify(i.data));
            this.setState({
                response : i.data
            })
        })
    }

    render(){
        return(
            <View style={{flex : 1, backgroundColor : '#080809'}}>
                {/* <View style={{position : 'absolute',height : '100%', width : '100%'}}>
                <Image style={{height : '100%', width : '100%'}} source={require('../../resources/images/background.png')}></Image>
                </View> */}
                <View style={{flex : 1}}>
                    <View style={{flex : .075}}></View>
                    <View style={{flex : .1, justifyContent : 'center', alignItems : 'center'}}>
                         <Image resizeMode='contain' style={{height : wp(15), width : wp(15)}} source={require('../../resources/images/logo.png')}></Image>
                    </View>
                    <View style={{flex : .1}}></View>
                    <View style={{flex : .81}}>
                        <ScrollView>
                            {this.state.response.map((i,index) => {
                                return <TouchableOpacity onPress={()=>{this.props.navigation.navigate('homeDetails',{data : i})}}  style={{flex : 1, height : index == 0 ? hp(37) : hp(20),width : '90%', alignSelf : 'center',justifyContent : 'center', alignItems : 'center', borderRadius : wp(5), marginBottom : hp(2.5)}}>
                                        <Image style={{height : '100%', width : '100%', borderRadius : wp(2)}}  resizeMode='cover' source={{uri : "http://88.198.152.58:1337"+i.Cover[0]?.url}}></Image>
                                        {index == 0 ?

                                        <View style={{ width : '100%',height : '100%', justifyContent : 'flex-end', position : 'absolute', }}>
                                            <View style={{height : hp(50), width : '100%', alignItems : 'center'}}>

                                        <View style={{width : '100%',alignSelf : 'flex-end',height : '86%', justifyContent : 'flex-end'}}>

                                              <View style={{flex : 1, marginHorizontal : wp(3),flexDirection : 'row', marginBottom : hp(1)}}>
                                              <View style={{flex : .5, alignItems : 'flex-start', justifyContent : 'flex-end'}}>
                                                   <Text style={{color : 'grey', fontSize : Size(1.3)}}>
                                                       {i.Location}
                                                   </Text>
                                               </View>
                                               <View style={{flex : .5, flexDirection : 'row',alignItems : 'flex-end', justifyContent : 'flex-end'}}>
                                                   <Text style={{color : 'white', fontSize : Size(1.3)}}>
                                                       {moment(i.FromTime).calendar()}
                                                   </Text>
                                                   {/* <View style={{flex : .05}}></View>
                                                   <Text style={{color : '#5AA7F7', fontSize : Size(1.3)}}>
                                                        Live: 21 hours
                                                   </Text> */}
                                               </View>                                           
                                                </View>
                                                </View>

                                                
                                            <View style={{height : hp(7),backgroundColor : '#313030',width : '100%', marginHorizontal : wp(5),paddingHorizontal : wp(3), alignItems : 'flex-start', borderBottomLeftRadius : wp(2),borderBottomRightRadius : wp(2), justifyContent : 'center'}}>
                                                <Text style={{color : '#fff', fontSize : Size(2.1)}}>
                                                    {i.ArtistName}
                                                </Text>
                                            </View>
                                            </View>
                                        </View>
                                                                                             :
                                                                                             
                                             
                                                                                             <View style={{ width : '100%',height : '100%', justifyContent : 'flex-end',alignSelf : 'flex-end', alignItems : 'center',position : 'absolute', }}>
                                                 
                                                                                         <View style={{height : hp(7),backgroundColor : '#313030',width : '100%',alignSelf : 'center', marginHorizontal : wp(5),paddingHorizontal : wp(2), alignItems : 'flex-start', borderBottomLeftRadius : wp(2),borderBottomRightRadius : wp(1.5), justifyContent : 'center'}}>
                                                                                             <Text style={{color : '#fff', fontSize : Size(2.1)}}>
                                                                                                 {i.ArtistName}
                                                                                             </Text>
                                                                                         </View>
                                                                                         </View>
                            }
                                </TouchableOpacity>
                            })}
                        </ScrollView>
                    </View>
                    {/* <View style={{flex : .05}}></View> */}
                    {/* <View style={{flex : .1}}>
                        <View style={{ height : '100%', width : '100%', justifyContent : 'center', alignItems : 'center'}}>
                            <TouchableOpacity onPress={()=>{
                                    this.props.navigation.push('streaming',{data : 1});
                            }} style={{width : '50%', height : '70%', backgroundColor : '#EF0404', borderRadius : wp(100)/2, justifyContent : 'center', alignItems : 'center', ...Platform.select({
                            ios: {
                                shadowOffset: {
                                    width: 0,
                                    height: 4,
                                },
                                shadowOpacity: 0.2,
                                shadowRadius:8
                            },
                            android: {
                                elevation: 8


                            },}), }}>
                                <Text style={{fontSize : Size(3.4), color : '#fff'}}>Artist</Text>
                            </TouchableOpacity>
                        </View>
                    </View> */}
                    {/* <View style={{flex : .1}}>
                    <View style={{ height : '100%', width : '100%', justifyContent : 'center', alignItems : 'center'}}>
                            <TouchableOpacity  onPress={()=>{
                                    this.props.navigation.push('streaming');
                            }}  style={{width : '45%', height : '120%', backgroundColor : '#2D2D2D', borderRadius : 20, justifyContent : 'center', alignItems : 'center', ...Platform.select({
        ios: {
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.2,
            shadowRadius:8
        },
        android: {
            elevation: 8


        },}),}}>
                                <Text style={{fontSize : 22, color : '#fff'}}>Enter the 360 Live</Text>
                            </TouchableOpacity>
                        </View>  
                        <View style={{height : 15}}></View>
                        <View style={{ height : '100%', width : '100%', justifyContent : 'center', alignItems : 'center'}}>
                            <TouchableOpacity  onPress={()=>{
                                    // this.props.navigation.push('flatStreaming');
                            }}  style={{width : '45%', height : '120%', backgroundColor : '#2D2D2D', borderRadius : 20, justifyContent : 'center', alignItems : 'center', ...Platform.select({
        ios: {
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.2,
            shadowRadius:8
        },
        android: {
            elevation: 8


        },}),}}>
                                <Text style={{fontSize : 22, color : '#fff'}}>Enter the live</Text>
                            </TouchableOpacity>
                        </View>                    
                        </View> */}
                    <View style={{flex : .05}}></View>
                </View>
            </View>
        );
    }
}


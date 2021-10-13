import React, { Component, useEffect, useState } from 'react';
import {View,Text, ScrollView,SafeAreaView, StyleSheet, TouchableOpacity,Image,Dimensions, Platform,PermissionsAndroid} from 'react-native'
import { hp, wp, Size } from '../../assets/dimensions/index';



export default class App extends Component {
    

    constructor(props){
        super(props)
        this.state = { screenWidth: "", screenHeight: "",pause : false ,page : 0 , selected : '', iosVr : false, flat : [], lens : [],streamingList : [] }  

    }

    getScreenSize = () => {  
        const screenWidth = Math.round(Dimensions.get('window').width);  
        const screenHeight = Math.round(Dimensions.get('window').height);  
        this.setState({ screenWidth: screenWidth, screenHeight: screenHeight })  
        }  

         async checkAndroidPermissions() {
      try {
          const audio = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
              title: 'Audio Permission',
              message: 'Netbeat.live needs access to your microphone',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
          });
      } catch (err) {
          console.warn(err);
      }
  }
  
        
   

    componentDidMount(){
        if(Platform.OS == 'android'){
        this.getScreenSize(); 
        }
        const flat = [];
        const lens = [];
        this.props.route.params.data.map(i => {
          if(i.type == 'flat'){
            flat.push(i)
          }else{
            lens.push(i)
          }
        })
        this.setState({
          flat : flat,
          lens : lens
        })
        Dimensions.addEventListener('change', (e) => {
            const { width, height } = e.window;
            this.setState({screenWidth : width, screenHeight : height});
          })    
        }
    
   

  render(){
    if(true || this.state.screenWidth > this.state.screenHeight)
    if(this.state.page == 0){
  return (
    <View style={{flex : 1}}>
    {/* <LivePlayer source={{uri:"rtmp://164.132.160.103:1935/origin1/stream1/test"}}
   ref={(ref) => {
       this.player = ref
   }}
   style={{backgroundColor : '#000', height : '100%', width : '100%'}}
   paused={this.state.pause}
   muted={false}
   bufferTime={300}
   maxBufferTime={1000}
   onLoading={()=>{}}
   onLoad={()=>{}}
   onEnd={()=>{}}
/> */}
        <Image style={{height : '100%',width : '100%',position : 'absolute'}}  source={require('../../resources/images/image7.png')}></Image>
        <Image style={{height : '100%',width : '100%',position : 'absolute'}}  source={require('../../resources/images/opacityImage.png')}></Image>
                                <View style={{height : hp(8), width : '100%',  flexDirection : 'row'}}>
  <View  style={{flex : .15, justifyContent : 'center', alignItems : 'center'}}>
   <TouchableOpacity onPress={()=>{
        this.props.navigation.pop()
     }} style={{paddingHorizontal : wp(5), paddingVertical : hp(5), justifyContent : 'center', alignItems : 'center'}}>
        <Image resizeMode='contain' source={require('../../resources/images/back.png')} ></Image>
   </TouchableOpacity>
  </View>
  <View  style={{flex : .7, justifyContent : 'center', alignItems : 'center'}}>
  <Text style={{color : 'white'}}>London Grammer</Text>
  </View>
  <View style={{flex : .15}}>
  </View>
</View>
<View style={{alignSelf : 'center',height : '100%',width : '100%',marginTop : hp(8),paddingBottom : hp(14), position : 'absolute'}}>
    <View style={{flexDirection : 'row', flex : 1,alignItems : 'center',height : '100%', width : '100%'}}>
    <View style={{flex : .3333,justifyContent : 'center',alignItems:'flex-end',}}>

<TouchableOpacity onPress={()=>{
    this.setState({
      page : this.state.page + 1,
      selected : 'threeSixtyStreaming',
      iosVr : false,
      streamingList : this.state.lens
    })  
  
  if(Platform.OS == 'android')
  setTimeout(()=>{
    this.checkAndroidPermissions();
  },300)
}} style={{justifyContent : 'center', alignItems : 'center'}}>
  <View style={{ alignSelf  : 'center', justifyContent : 'center', alignItems : 'center'}}>
  {/* {this.state.pause ? 
  <Text style={{color : 'white',fontSize : Size(1.3) }}>Start</Text>
 :
 <Text style={{color : 'white',fontSize : Size(1.3) }}>Pause</Text>
} */}
    <Image resizeMode='contain' source={require('../../resources/images/vr.png')} ></Image>

  </View>
  <View style={{height : hp(0.7)}}></View>
  <Text style={{textAlign : 'center', color : 'white', fontSize : Size(1.15)}}>View on</Text>
  <Text style={{textAlign : 'center', color : 'white', fontSize : Size(1.15)}}>VR HeadSet</Text>
 
</TouchableOpacity>
</View>
<View style={{flex : .3333,justifyContent : 'center',alignItems:'center',}}>

<TouchableOpacity onPress={()=>{
    this.setState({
      page : this.state.page + 1,
      selected : 'threeSixtyStreaming',
      iosVr : true,
      streamingList : this.state.lens
    })  
  if(Platform.OS == 'android')
  setTimeout(()=>{
    this.checkAndroidPermissions();
  },300)
}} style={{justifyContent : 'center', alignItems : 'center'}}>
  <View style={{ alignSelf  : 'center'}}>
  {/* {this.state.pause ? 
  <Text style={{color : 'white',fontSize : Size(1.3) }}>Start</Text>
 :
 <Text style={{color : 'white',fontSize : Size(1.3) }}>Pause</Text>
} */}
                                        <Image resizeMode='contain' source={require('../../resources/images/cardBoard.png')} ></Image>
  </View>
  <View style={{height : hp(0.7)}}></View>
  <Text style={{textAlign : 'center', color : 'white', fontSize : Size(1.15)}}>View on</Text>
<Text style={{textAlign : 'center', color : 'white', fontSize : Size(1.15)}}>Cardboard</Text>
 
</TouchableOpacity>
</View>
<View style={{flex : .3333,justifyContent : 'center',alignItems:'flex-start',}}>

<TouchableOpacity onPress={()=>{
   this.setState({
    page : this.state.page + 1,
    selected : 'simpleStreaming',
    iosVr : false,
    streamingList : this.state.flat
  }) 
  setTimeout(()=>{
    this.checkAndroidPermissions();
  },300)
}} style={{justifyContent : 'center', alignItems : 'center'}}>
  <View style={{ alignSelf  : 'center'}}>
  {/* {this.state.pause ? 
  <Text style={{color : 'white',fontSize : Size(1.3) }}>Start</Text>
 :
 <Text style={{color : 'white',fontSize : Size(1.3) }}>Pause</Text>
} */}
                                        <Image resizeMode='contain' source={require('../../resources/images/phone.png')} ></Image>

      </View>
      <View style={{height : hp(0.7)}}></View>
      <Text style={{textAlign : 'center', color : 'white', fontSize : Size(1.15)}}>View on</Text>
    <Text style={{textAlign : 'center', color : 'white', fontSize : Size(1.15)}}>Phone</Text>
    
    </TouchableOpacity>
    </View>
    </View>
    </View>


    </View>
  );
}
  else if(this.state.page == 1){
  return <View style={{flex : 1, backgroundColor : '#fff'}}>
      <Image style={{height : '100%',width : '100%',position : 'absolute'}}  source={require('../../resources/images/image7.png')}></Image>
      <Image style={{height : '100%',width : '100%',position : 'absolute'}}  source={require('../../resources/images/opacityImage.png')}></Image>
      <View style={{height : hp(5)}}></View>
      <Image resizeMode='contain' source={require('../../resources/images/microphoneDark.png')} style={{height : hp(25), alignSelf : 'center'}} ></Image>
      <View style={{height : hp(3)}}></View>
      <Text style={{color : '#fff', alignSelf : 'center'}}>Your microphone will be enabled during the whole concert</Text>
      <View style={{height : hp(5)}} />
      <View style={{height : hp(6), justifyContent : 'center', alignItems : 'center'}}>
                    <TouchableOpacity onPress={()=>{
                        this.setState({
                          page : this.state.page + 1
                        })
                    }}>            
            <View  style={{width : wp('50%'),justifyContent : 'center', alignItems : 'center', height : '100%', borderRadius : wp('10%'), backgroundColor : '#007AFF'}}>
     
      <Text style={{color : '#fff'}}>Ok</Text>    
      </View>            
</TouchableOpacity>
</View>
  </View>
  }
  else if(this.state.page == 2){
    return <View style={{flex : 1, backgroundColor : '#fff'}}>
    <Image style={{height : '100%',width : '100%',position : 'absolute'}}  source={require('../../resources/images/image7.png')}></Image>
    <Image style={{height : '100%',width : '100%',position : 'absolute'}}  source={require('../../resources/images/opacityImage.png')}></Image>
    <View style={{height : hp(5)}}></View>
    <Image resizeMode='contain' source={require('../../resources/images/clapDark.png')} style={{height : hp(25), alignSelf : 'center'}} ></Image>
    <View style={{height : hp(3)}}></View>
    <Text style={{color : '#fff', alignSelf : 'center'}}>Please act as you would do on a regular concert!Applaude,  yell,  scream,  cry… act normal</Text>
    <View style={{height : hp(5)}} />
    <View style={{height : hp(6), justifyContent : 'center', alignItems : 'center'}}>
                  <TouchableOpacity onPress={()=>{
                      this.setState({
                        page : this.state.page + 1
                      })
                  }}>            
          <View  style={{width : wp('50%'),justifyContent : 'center', alignItems : 'center', height : '100%', borderRadius : wp('10%'), backgroundColor : '#007AFF'}}>
   
    <Text style={{color : '#fff'}}>Ok</Text>    
    </View>            
</TouchableOpacity>
</View>
</View>
  }
  else if(this.state.page == 3){
    return <View style={{flex : 1, backgroundColor : '#fff'}}>
    <Image style={{height : '100%',width : '100%',position : 'absolute'}}  source={require('../../resources/images/image7.png')}></Image>
    <Image style={{height : '100%',width : '100%',position : 'absolute'}}  source={require('../../resources/images/opacityImage.png')}></Image>
    <View style={{height : hp(5)}}></View>
    <Image resizeMode='contain' source={require('../../resources/images/guitarDark.png')} style={{height : hp(25), alignSelf : 'center'}} ></Image>
    <View style={{height : hp(3)}}></View>
    <Text style={{color : '#fff', alignSelf : 'center'}}>Use all camera’s to for different views</Text>
    <View style={{height : hp(5)}} />
    <View style={{height : hp(6), justifyContent : 'center', alignItems : 'center'}}>
      
    <TouchableOpacity onPress={async ()=>{
      if(this.state.iosVr){
        await this.props.navigation.navigate(this.state.selected,{data : 'vr', list : this.state.streamingList})
      }else
        await this.props.navigation.navigate(this.state.selected,{list : this.state.streamingList})
        setTimeout(() => {
        this.setState({
        page : 0 , selected : ''
        })
      }, 3000);
    }}>            
          <View  style={{width : wp('50%'),justifyContent : 'center', alignItems : 'center', height : '100%', borderRadius : wp('10%'), backgroundColor : '#007AFF'}}>
   
    <Text style={{color : '#fff'}}>Let's Go</Text>    
    </View>            
</TouchableOpacity>
</View>
</View>
  }
  else{
    return <View style={{flex : 1, backgroundColor : '#fff'}}>
 
</View>
  }
  else
  return(
       <View style={{flex : 1, backgroundColor : '#080809'}}>
                
                <View style={{flex : 1}}>
                <Image  style={{height : '100%', width : '100%', position : 'absolute'}} source={require('../../resources/images/background2.png')}></Image>
                    <View style={{flex : .075}}></View>
                    <View style={{flex : .1, justifyContent : 'center', alignItems : 'center'}}>
                         <Image resizeMode='contain' style={{height : '50%', width : '50%'}} source={require('../../resources/images/logo.png')}></Image>
                    </View>
                    <View style={{flex : .05}}></View>
                    <View style={{flex : .825, alignItems : 'center'}}>
                      <View style={{flex : .027}}></View>
                      <Image resizeMode='contain' style={{height : '9%', width : '9%'}} source={require('../../resources/images/screen-rotation.png')}></Image>
                      <View style={{flex : .02}}></View>
                       <Text style={{color : 'white', textAlign : 'center'}}>To watch the live showsplease rotate your phone to Landscape mode</Text>
                    </View>
                    
                    <View style={{flex : .05}}></View>
                </View>
            </View>
          );
            }
        }




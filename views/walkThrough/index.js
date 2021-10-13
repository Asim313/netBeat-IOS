import Swiper from 'react-native-swiper'
import {View,Text, StyleSheet, TouchableOpacity,ScrollView, Platform,KeyboardAvoidingView,PermissionsAndroid} from 'react-native'
import React,{Component} from 'react'
import { hp, wp,IOS } from '../../assets';
import Page from './page/index';
import { _storeData } from '../../asyncStorage/AsyncFuncs';

const styles = StyleSheet.create({
  slide: {
    flex: 1,
  }
})
this.swiper = undefined;


export default class SwiperComponent extends Component {
    state={index : 0};


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
    
  render() {
    return (
        <KeyboardAvoidingView style={{flex : 1, backgroundColor : '#fff'}} behavior={(Platform.OS === 'ios')? "padding" : null}>  
        <ScrollView>
        <View style={{height : hp(100),top : Platform.OS=='ios' ? IOS : 0}}>
        <View style={{flex : 1}}>
    <View style={{flex : .97}}>
      <Swiper ref={e => this.swiper = e}  showsButtons={false} loop={false} onIndexChanged={(index)=>{
          this.setState({
            index : index
          })
          // this.swiper.scrollBy(1)
        
      }}>
        <View style={styles.slide}>
        <Page page={this.state.index} heading = {'Shows in 3D'} image={require('../../resources/images/guitar.png')} firstText = {'Watch our shows ‘flat’ or in ‘Virtual mode’ on your Phone'} secondText={'Hi there! And welcome :) \n You can follow the concert in three modes: 360°, VR mode, or the classical flat mode.\n You may of course switch from one mode to another any time.'}></Page>
        </View>
        <View style={styles.slide}>
        <Page  page={this.state.index} heading = {'Microphone Access'} image={require('../../resources/images/microphone.png')} firstText = {'Please keep your microphone enabled'} secondText={'Please, ensure you authorize us to use your microphone. This will enable the artist to hear the public. For the very first time in the live-stream history, the public can interact with the artists ON STAGE and in REAL TIME!'}></Page>
        </View>
        <View style={styles.slide}>
        <Page page={this.state.index} heading = {'Engage!'} image={require('../../resources/images/clapShape.png')} firstText = {'Act as you would do on a normal concert, please!'} secondText={'React as if you were on the spot! Clap, sing, support the artists and give them the energy. They will give you the best of themselves to make of this moment an unforgettable one.\n Careful! Any abuse or obscenity may lead to an exclusion from this functionality.'}></Page>
        </View>
      </Swiper>
      </View>
      {/* <View style={{flex : .2}}></View> */}
      <View style={{height : hp(6), justifyContent : 'center', alignItems : 'center'}}>
                    <TouchableOpacity onPress={()=>{
                      if(this.state.index == 2){
                        _storeData('firstTime', false)
                        this.props.navigation.navigate('home')
                      }else{
                        this.setState({
                          index : this.state.index + 1
                        })
                        this.swiper.scrollBy(1)
                      }

                      if(this.state.index == 0 && Platform.OS == 'android'){
                        setTimeout(()=>{
                        this.checkAndroidPermissions();
                      },300)
                    }
                    }}>            
            <View  style={{width : wp('50%'),justifyContent : 'center', alignItems : 'center', height : '100%', borderRadius : wp('10%'), backgroundColor : '#007AFF'}}>
     
      <Text style={{color : '#fff'}}>Continue</Text>    
      </View>            
</TouchableOpacity>
            </View>
      </View>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

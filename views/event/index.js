import React, { useState } from 'react';
import { Image, ImageBackground, ScrollView, StatusBar, Text, TouchableOpacity, View, PermissionsAndroid } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { Colors, hp, hps, Images, wps } from '../../assets/index';
import { BaseUrl } from '../../graphql/baseUrl';
import styles from './styles';
import { SVGS } from '../../assets/images/config';

const Event = (props) => {

   const {lang, selectedLangVal} = useSelector(state => state.language)
   const { DARK } = useSelector(state => state.dark)
   const [selected, setSelected] = useState('concert')
   const [event, setEvent] = useState(props.route.params.data)
   const [user , setUser] = useState(props.route.params.user)



   const checkAndroidPermissions = async() => {
      try {
          const camera = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
              title: 'Camera Permission',
              message: 'OpenVidu needs access to your camera',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
          });
          const audio = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
              title: 'Audio Permission',
              message: 'OpenVidu needs access to your microphone',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
          });
          const storage = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
              title: 'STORAGE',
              message: 'OpenVidu  needs access to your storage ',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
          });
          if (camera === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('You can use the camera');
          } else {
              console.log('Camera permission denied');
          }
          if (audio === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('You can use the audio');
          } else {
              console.log('audio permission denied');
          }
          if (storage === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('You can use the storage');
          } else {
              console.log('storage permission denied');
          }
      } catch (err) {
          console.warn(err);
      }
     }


   return(
       <View style = {[styles.mainContainer, {backgroundColor : DARK? Colors.base : Colors.white}]}>
        <StatusBar/>

        <View style = {styles.header}>
            <TouchableOpacity style = {styles.arrow} onPress = {() => props.navigation.goBack()}>
              <Image source = {Images.arrow}/>
            </TouchableOpacity>
            <TouchableOpacity
             style = {styles.user}
                onPress = {() => {
                    props.navigation.navigate('setting')
                }}>
               
          {user?.profile?
         <Image source = {{uri : BaseUrl + user?.profile?.url}} 
          style = {[styles.user, {top: 0}]} 
          />
        :
        <Image source = {Images.default_dp} 
          style = {[styles.user, {top: 0}]} 
          /> 
          }
             </TouchableOpacity>
        </View>

        <View  style = {styles.eventImageContainer}>
           <ImageBackground source = {{uri : BaseUrl + event?.Cover[0]?.url}} style = {styles.eventImage}>
            <LinearGradient 
            colors = {DARK ? 
                ['#19202B00','#19202B'] 
                : 
                ['#ffffff00','#ffffff']
            } 
            style = {styles.eventTitleContainer}>
                {event?.isLive ?
                <View style = {styles.statusContainer}>
                   {/* <Image source = {Images.dot} style = {styles.dot}/> */}
                   <SVGS.dot style = {styles.dot}/>
                   <Text style = {[styles.live, {color : DARK ? Colors.white : Colors.base}]}>{lang?.live}</Text>
                </View>
                :
                <View style = {styles.statusContainer}></View>
                }
                <Text style = {[styles.eventTitle, {color : DARK ? Colors.white : Colors.base}]}>{event?.ArtistName}</Text>  
            </LinearGradient> 
            
           </ImageBackground> 
        </View>

        <View style = {styles.eventInfoContainer}>
          <ScrollView 
          //contentContainerStyle = {{marginBottom:hp(3)}}
          style = {{ flex : 1 }}>  
            <Text style = {[styles.info, { color : DARK ? Colors.white : Colors.base}]}>{event?.Description}</Text>
            </ScrollView>
            <View style = {{height:hp(1.5)}}></View>
        </View>

        <View style = {styles.videoInfoContainer}>
           <Text style = {[styles.formatTitle, {color : DARK? '#ffffff27' : '#19202B70'}]}>{`${lang?.video_formats} ${event?.concert_streams?.length} ${lang?.video_formats1}`}</Text> 
           <View style = {[styles.formatContainer, {width : event?.concert_streams?.length == 2 ? wps(70) : wps(130)}]}>
            {event?.concert_streams?.map((i) =>
             i.type == '360' ? DARK ? <SVGS.degreeDark height = {hps(25)} width = {wps(29)}/> : <SVGS.degreeLite height = {hps(25)} width = {wps(29)}/> :
             i.type == 'flat' ? <Image source = {DARK ? Images.video_w : Images.video_g}/> :
             DARK ? <SVGS.vrDark height = {hps(24)} width = {wps(24)}/> : <SVGS.vrLite height = {hps(24)} width = {wps(24)}/> 
             )}  
            
           </View>

           <TouchableOpacity
           onPress = {() => {
              //checkAndroidPermissions()
              props.navigation.navigate('broadcast', {event : event})
            }}
           style = {styles.watchButton}
           >
           <Text style = {[styles.watchButtonText, {paddingHorizontal:selectedLangVal == 'fr'? wps(26) : null}]}>{lang?.watch_now}</Text>    
           </TouchableOpacity>
        </View>


        <View style = {styles.bottomTapContainer}>
             <View style = {[styles.videoButtonContainer, {backgroundColor : DARK? Colors.base : Colors.white}]}>
               <TouchableOpacity 
               //onPress = {() => setDark(!DARK)}
               style = {styles.videoButton}>
               <SVGS.video height = {hps(13)} width = {wps(21)}/>  
               </TouchableOpacity>
             </View>
             <View style = {[styles.bottomTap , { backgroundColor : DARK ? '#293140' : '#F3F3F3'}]}>
                <TouchableOpacity 
                 onPress = {() => {props.navigation.navigate('home')}}
                 style = {styles.homeButton}> 
                 {DARK? <SVGS.homeDark /> :  <SVGS.homeLite /> }
                </TouchableOpacity>
                <TouchableOpacity 
                onPress = {() => {props.navigation.navigate('setting')}}
                style = {styles.settingButton}>
                {DARK? <SVGS.settingDark /> :  <SVGS.settingLite /> }
                </TouchableOpacity>
             </View> 
          </View>
       </View>
)}

export default Event

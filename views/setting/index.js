import React, { useEffect, useState } from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View , Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import { Colors, Images } from '../../assets/index';
import { dark } from './../../redux/actions/dark';
import { selectLanguage } from './../../redux/actions/language';
import { languages } from './../../redux/languages';
import styles from './styles';
import { _retrieveData, _storeData } from '../../asyncStorage/AsyncFuncs';
import { useLazyQuery, useMutation } from '@apollo/client';
import { UPDATEUSER } from '../../graphql/mutations';

const Setting = (props) => {
   const dispatch = useDispatch();
   const { lang, selectedLangVal } = useSelector(state => state.language)
   const { DARK } = useSelector(state => state.dark)
   const [ selected, setSelected ] = useState('concert')
   const [user, setUser] = useState({})
   const [noti, setNoti] = useState(false)
   const [artist_vol, setArtist_vol] = useState(50)
   const [audience_vol, setAudience_vol] = useState(50)


   const [updateUser] = useMutation(UPDATEUSER)
   



   useEffect(() => {
       const getUser = async() => {
         const user = await _retrieveData('user')
         setUser(user)
         setNoti(user.notification)
         setArtist_vol(user.artist_volume)
         setAudience_vol(user.audience_volume)
       }
       getUser()
   },[])


   const buttonAlert = (title, msg, status, type) =>
    Alert.alert(
      title,
      msg,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
            if(type == 'lang'){
                dispatch(selectLanguage({
                    lang: selectedLangVal == 'en'? languages.franch : languages.english,
                    selectedLangVal: selectedLangVal == 'en'? 'fr' : 'en'
                }))
            }else if(type == 'noti'){    
                setNoti(status)
                updateUser({variables : {
                    id : user?.id,
                    notification : status
                }})
                .then((res) => {
                    console.log('res', res?.data?.updateUser?.user)
                    _storeData('user', res?.data?.updateUser?.user)
                })
                .catch((err) => console.log('err=>>', err))
            }
        }}
      ]
    );




   return(
       <SafeAreaView style = {[styles.mainContainer, {backgroundColor : DARK? Colors.base : Colors.white}]}>
        <StatusBar/>
         <View style = {styles.header}>
          <Image source = {DARK? Images.notiWd : Images.notiGd} style = {styles.noti}/>
          <Image source = {Images.logoh} style = {styles.logo}/>
          <TouchableOpacity
          style = {styles.user}
          onPress = {() => {
            //props.navigation.navigate('setting')
          }}>
          <Image source = {Images.dp} 
          style = {[styles.user, {top: 0}]} 
          />
             </TouchableOpacity>
         </View>

         <View style = {styles.settingContainer}>
            <Text style = {[styles.title, {color : DARK? Colors.white : '#19202B'}]}>{lang?.setting_panel}</Text> 

            <TouchableOpacity 
            onPress = { () => props.navigation.navigate('profile', {user : user})}
            style = {[styles.settingOptionContainer, {borderColor : DARK ? '#ffffff05' : '#19202B20'}]}>
                <Text style = {[styles.settingTitle, {color : DARK? Colors.white : '#19202B'}]}>{lang?.profile}</Text>
                <Image source = {!DARK? Images.rightg : Images.rightw} style = {styles.right}/>
                <Text style = {styles.settingStatus}>{user?.username}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress = { () => { buttonAlert('Notifications', `Are you sure to ${noti ? 'disable' : 'enable'} notifications?`, noti ? false : true , 'noti') }}
            style = {[styles.settingOptionContainer, {borderColor : DARK ? '#ffffff05' : '#19202B20'}]}>
                <Text style = {[styles.settingTitle, {color : DARK? Colors.white : '#19202B'}]}>{lang?.notification}</Text>
                <Image source = {!DARK? Images.rightg : Images.rightw} style = {styles.right}/>
                <Text style = {styles.settingStatus}>{noti? lang?.on : lang.off}</Text>
            </TouchableOpacity>
            <View style = {[styles.settingOptionContainer, {borderColor : DARK ? '#ffffff05' : '#19202B20'}]}>
                <Text style = {[styles.settingTitle, {color : DARK? Colors.white : '#19202B'}]}>{lang?.artist_vol}</Text>
                <Image source = {!DARK? Images.rightg : Images.rightw} style = {styles.right}/>
                <Text style = {styles.settingStatus}>{lang?.on}</Text>
                <Text style = {[styles.settingValue, {color : DARK? '#CB65C750' : '#CB65C7'}]}>85</Text>
            </View>
            <View style = {[styles.settingOptionContainer, {borderColor : DARK ? '#ffffff05' : '#19202B20'}]}>
                <Text style = {[styles.settingTitle, {color : DARK? Colors.white : '#19202B'}]}>{lang?.audience_vol}</Text>
                <Image source = {!DARK? Images.rightg : Images.rightw} style = {styles.right}/>
                <Text style = {styles.settingStatus}>{lang?.on}</Text>
                <Text style = {[styles.settingValue, {color : DARK? '#37D7E250' : '#37D7E2'}]}>15</Text>
            </View>
            <View style = {[styles.settingOptionContainer, {borderColor : DARK ? '#ffffff05' : '#19202B20'}]}>
                <Text style = {[styles.settingTitle, {color : DARK? Colors.white : '#19202B'}]}>{lang?.dark_mode}</Text>
                <Image source = {!DARK? Images.rightg : Images.rightw} style = {styles.right}/>
                <Text style = {styles.settingStatus}>{lang?.on}</Text>
                <View style = {styles.settingValue}>
                <ToggleSwitch
                    isOn={DARK}
                    onColor={'#303847'}
                    offColor={'#303847'}
                    thumbOnStyle = {{backgroundColor:Colors.base1}}
                    thumbOffStyle = {{backgroundColor:Colors.base1}}
                    size="small"
                    onToggle={isOn => {
                     dispatch(dark(!DARK))
                    }}
                />
                </View>
            </View>
            <TouchableOpacity 
            onPress = { () => { buttonAlert('Language', `Are you sure to change language in to ${selectedLangVal == 'en' ? 'French' : 'English'}`, selectedLangVal == 'en' ? 'French' : 'English', 'lang')}}
            style = {[styles.settingOptionContainer, {borderColor : DARK ? '#ffffff05' : '#19202B20'}]}>
                <Text style = {[styles.settingTitle, {color : DARK? Colors.white : '#19202B'}]}>{lang?.language}</Text>
                <Image source = {!DARK? Images.rightg : Images.rightw} style = {styles.right}/>
                <Text style = {styles.settingStatus}>{selectedLangVal == 'en' ? 'English' : 'French'}</Text>
            </TouchableOpacity>
            <View style = {[styles.settingOptionContainer, {borderColor : DARK ? '#ffffff05' : '#19202B20'}]}>
                <Text style = {[styles.settingTitle, {color : DARK? Colors.white : '#19202B'}]}>{lang?.privacy}</Text>
                <Image source = {!DARK? Images.rightg : Images.rightw} style = {styles.right}/>
            </View>
            <View style = {[styles.settingOptionContainer, {borderColor : DARK ? '#ffffff05' : '#19202B20'}]}>
                <Text style = {[styles.settingTitle, {color : DARK? Colors.white : '#19202B'}]}>{lang?.help}</Text>
                <Image source = {!DARK? Images.rightg : Images.rightw} style = {styles.right}/>
            </View>
            <View style = {[styles.settingOptionContainer, {borderColor : DARK ? '#ffffff05' : '#19202B20'}]}>
                <Text style = {[styles.settingTitle, {color : DARK? Colors.white : '#19202B'}]}>{lang?.log_out}</Text>
                <Image source = {!DARK? Images.rightg : Images.rightw} style = {styles.right}/>
            </View>
            

         </View>




         <View style = {styles.bottomTapContainer}>
             <View style = {[styles.videoButtonContainer, {backgroundColor : DARK? Colors.base : Colors.white}]}>
               <TouchableOpacity 
               style = {styles.videoButton}>
               <Image source = {Images.video} style = {styles.video}/>   
               </TouchableOpacity>
             </View>
             <View style = {[styles.bottomTap , { backgroundColor : DARK ? '#293140' : '#F3F3F3'}]}>
                <TouchableOpacity 
                 onPress = {() => {props.navigation.navigate('home')}}
                 style = {styles.homeButton}> 
                 <Image source = {DARK? Images.home : Images.homelight}/>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress = {() => {props.navigation.navigate('setting')}}
                style = {styles.settingButton}>
                <Image source = {DARK? Images.setting : Images.settinglight}/>
                </TouchableOpacity>
             </View> 
          </View>
       </SafeAreaView>
)}

export default Setting

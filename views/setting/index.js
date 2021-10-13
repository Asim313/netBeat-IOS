import React, { useState } from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import { Colors, Images } from '../../assets/index';
import { dark } from './../../redux/actions/dark';
import { selectLanguage } from './../../redux/actions/language';
import { languages } from './../../redux/languages';
import styles from './styles';

const Setting = (props) => {
   const dispatch = useDispatch();
   const { lang, selectedLangVal } = useSelector(state => state.language)
   const { DARK } = useSelector(state => state.dark)
   const [selected, setSelected] = useState('concert')




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
          <Image source = {Images.background} 
          style = {[styles.user, {top: 0}]} 
          />
             </TouchableOpacity>
         </View>

         <View style = {styles.settingContainer}>
            <Text style = {[styles.title, {color : DARK? Colors.white : '#19202B'}]}>{lang?.setting_panel}</Text> 

            <View style = {[styles.settingOptionContainer, {borderColor : DARK ? '#ffffff05' : '#19202B20'}]}>
                <Text style = {[styles.settingTitle, {color : DARK? Colors.white : '#19202B'}]}>{lang?.profile}</Text>
                <Image source = {!DARK? Images.rightg : Images.rightw} style = {styles.right}/>
                <Text style = {styles.settingStatus}>Josh Byrne</Text>
            </View>
            <View style = {[styles.settingOptionContainer, {borderColor : DARK ? '#ffffff05' : '#19202B20'}]}>
                <Text style = {[styles.settingTitle, {color : DARK? Colors.white : '#19202B'}]}>{lang?.notification}</Text>
                <Image source = {!DARK? Images.rightg : Images.rightw} style = {styles.right}/>
                <Text style = {styles.settingStatus}>{lang?.on}</Text>
            </View>
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
            <View style = {[styles.settingOptionContainer, {borderColor : DARK ? '#ffffff05' : '#19202B20'}]}>
                <Text style = {[styles.settingTitle, {color : DARK? Colors.white : '#19202B'}]}>{lang?.language}</Text>
                <Image source = {!DARK? Images.rightg : Images.rightw} style = {styles.right}/>
                <Text 
                onPress = {() => {
                    dispatch(selectLanguage({
                        lang: selectedLangVal == 'en'? languages.franch : languages.english,
                        selectedLangVal: selectedLangVal == 'en'? 'fr' : 'en'
                    }))
                }}
                style = {styles.settingStatus}>English</Text>
            </View>
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

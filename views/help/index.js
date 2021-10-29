import React, { useState } from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import { Colors, Images, IOS } from '../../assets/index';
import { dark } from './../../redux/actions/dark';
import { selectLanguage } from './../../redux/actions/language';
import { languages } from './../../redux/languages';
import styles from './styles';
import { WebView } from 'react-native-webview';

const Help = (props) => {
   const dispatch = useDispatch();
   const { lang, selectedLangVal } = useSelector(state => state.language)
   const { DARK } = useSelector(state => state.dark)
   const [selected, setSelected] = useState('concert')




   return(
       <SafeAreaView style = {[styles.mainContainer, {backgroundColor : DARK? Colors.base : Colors.white}]}>
        <StatusBar/>
        <View style = {[styles.header , { marginTop : Platform.OS == 'ios' ? -IOS : 20}]}>
          {/* <Image source = {DARK? Images.notiWd : Images.notiGd} style = {styles.noti}/> */}
          <TouchableOpacity 
          onPress = {() => {props.navigation.pop()}}
          style = {styles.noti}>
              <Image source = {DARK? Images.arrow : Images.arrow_dark}/>
          </TouchableOpacity>
          <Image source = {Images.logoh} style = {styles.logo}/>
         </View>

         <View style = {styles.settingContainer}>
            <Text style = {[styles.title, {color : DARK? Colors.white : '#19202B'}]}>{lang?.help}</Text> 
            <WebView
             source={{ uri: 'https://infinite.red' }}
             style={{ flex : 1 , backgroundColor : DARK? Colors.base : Colors.white}}
             />
         </View>




         {/* <View style = {styles.bottomTapContainer}>
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
          </View> */}
       </SafeAreaView>
)}

export default Help

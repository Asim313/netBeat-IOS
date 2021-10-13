import React, { useEffect } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Images } from '../../assets/index';
import { selectLanguage } from './../../redux/actions/language';
import { languages } from './../../redux/languages';
import styles from './styles';


const Splash = (props) => {

    const dispatch = useDispatch(); 

   useEffect(()=>{
    dispatch(selectLanguage({
        lang: languages.english,
        selectedLangVal: 'en'
    }))
   },[])

   return(
       <View style = {styles.mainContainer}>
          <ImageBackground
          style = {styles.bg}
          source = {Images.bg}
          >
          <View style = {styles.logoContainer}>
           <Image source = {Images.logol} style = {styles.logo}/>  
           <View style = {styles.logoTitleContainer}>
                <View style = {{ flexDirection : 'row' , alignItems : 'flex-end'}}>
                    <Text style = {styles.netbeat}>netbeat</Text>
                    <Text style = {styles.live}>.live</Text>
                </View>
           </View> 
          </View>
          <TouchableOpacity 
          onPress = {() => {props.navigation.navigate('login')}}
          style = {styles.clapContainer}>
           <Image source = {Images.clap} style = {styles.clap}/>   
          </TouchableOpacity>

          <View style = {styles.bottomTxtContainer}>
              <Text style = {styles.bottomTxt}>Your support is very important to artists. So please</Text>
              <Text style = {styles.bottomTxt}>remember to applaud them during the concert.</Text>
          </View>
          </ImageBackground>
       </View>
   ) 
}

export default Splash

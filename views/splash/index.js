import React, { useEffect, useState } from 'react';
import { Animated, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Colors, Images } from '../../assets/index';
import { selectLanguage } from './../../redux/actions/language';
import { languages } from './../../redux/languages';
import styles from './styles';
import * as Animatable from 'react-native-animatable'



const Splash = (props) => {

   const dispatch = useDispatch(); 
    const opacity = useState(new Animated.Value(0.25))[0]
    const spring = useState(new Animated.Value(0))[0]
    const [glow, setGlow] = useState(false)


   let fadeInAndOut = Animated.sequence([
    Animated.timing(opacity, {
        toValue : 1,
        duration : 1500,
        useNativeDriver : true
    }),
    Animated.timing(opacity, {
        toValue : 0.25,
        duration : 1500,
        useNativeDriver : true
    }),
  ]);

   useEffect(()=>{
    dispatch(selectLanguage({
        lang: languages.english,
        selectedLangVal: 'en'
    }))
   },[])


   useEffect(()=>{
     Animated.loop(
        Animated.parallel([
          fadeInAndOut,
          Animated.timing(spring, {
            toValue: 1,
            friction: 3,
            tension: 40,
            duration: 1500,
          }),
        ]),
      ).start()
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

          {/* <Animatable.View 
          animation='pulse'
          easing='ease-out' 
          delay = {1000}
          iterationCount="infinite"
          style = {[styles.clapContainerGlow]}
          >
          </Animatable.View> */}

          <Animated.View
          style = {[styles.clapContainerGlow, { opacity : opacity }]}
          ></Animated.View>

          <TouchableOpacity 
          onPress = {() => {
             props.navigation.navigate('login')
            }}
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
import react from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Colors, hp, hps, wp, wps } from '../../../assets';
import { Fonts } from '../../../assets/fonts';


export default StyleSheet.create ({

    mainContainer: {
      flex : 1,
      backgroundColor: Colors.base
    },
    bg: {
      flex: 1,
    },
    logoContainer: {
      height:hps(266.21),
      width:wps(322.3),
      marginTop:hps(255),
      alignSelf:'center',
      //borderWidth:1,
      justifyContent:'space-between'
    },
    logo: {
      alignSelf:'center',
    },
    logoTitleContainer: {
      height:hps(119.95),
      width:wps(234.32),
      alignSelf:'center',
      alignItems:'center',
    },
    netbeat: {
      fontSize : hps(29.23),
      fontFamily : Fonts.semiBold,
      color : Colors.white
    },
    live: {
      fontSize : hps(29.23),
      fontFamily : Fonts.light,
      color : Colors.white
    },
    clapContainer: {
      height: hps(42),
      width: hps(42),
      borderRadius:hps(42/2),
      top: hps(626),
      alignSelf:'center',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor : '#707070',
      position:'absolute'
    },
    clapContainerGlow: {
      height: hps(42),
      width: hps(42),
      borderRadius:hps(42/2),
      marginTop:hps(105),
      alignSelf:'center',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor : Colors.base1,
      shadowColor: Colors.base1,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 16,
    },
    clap: {
      height :hps(18),
      width:wps(18)
    },
    bottomTxtContainer: {
      width: wps(321),
      marginTop:hps(16),
      height:hps(57),
      alignSelf:'center',
      //borderWidth:1
    },
    bottomTxt: {
      fontSize: wps(12),
      fontFamily:Fonts.medium,
      alignSelf:'center',
      color:'#CB65C750'
    },
    textGlowing: {
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 15
    }
      
})
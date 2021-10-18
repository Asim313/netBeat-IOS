import react from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Colors, hp, hps, wp, wps } from '../../../assets';
import { Fonts } from '../../../assets/fonts';


export default StyleSheet.create ({

    mainContainer: {
      flex : 1,
      backgroundColor: Colors.base
    },
    logoContainer: {
      height : hps(169.27),
      width : wps(203.56),
      //borderWidth : 0.5,
      borderColor : '#fff',
      alignSelf : 'center',
      marginTop : hps(84),
      justifyContent:'center'
    },
    back: {
      position:'absolute',
      top: hp(8),
      left : wp(8)
    },
    dpContainer: {
      height : hp(17),
      width : hp(17),
      borderRadius: hp(17/2),
      backgroundColor:'#fff',
      alignSelf:'center'       
    },
    dp: {
      height : hp(17),
      width : hp(17),
      borderRadius: hp(17/2),

    },
    editDpContainer: {
      height: hp(4),
      width : hp(4),
      borderRadius : hp(4/2),
      //borderWidth:1,
      position:'absolute',
      bottom:0,
      right:0,
      backgroundColor: Colors.base1,
      justifyContent:'center',
      alignItems:'center'
    },
    editProfile: {
      height : hp(3),
      width : hp(3)
    },
    logo: {
      alignSelf : 'center'
    },
    logoTitleContainer: {
      alignItems : 'center',
      marginTop : hps(19),
      //borderWidth : 0.2,
      borderColor : '#fff',
      height : hps(75.81),
      width : wps(148.09),
      alignSelf:'center'
    },
    netbeat: {
      color : Colors.white,
      fontSize : hps(18),
      fontFamily : Fonts.semiBold
    },
    live: {
      color : Colors.white,
      fontSize : hps(18),
      fontFamily : Fonts.light
    },
    titleContainer: {
      //borderWidth : 1,
      borderColor:'blue',
      height:hps(70.19),
      //width:wps(248.64),
      alignSelf:'center',
      justifyContent:'center',
      alignItems:'center',
    },
    title: {
      fontSize : hps(24),
      color : Colors.white,
      fontFamily : Fonts.lightBold
    },
    input: {
      height : hps(46),
      width : wps(286),
      marginTop : hps(17),
      borderWidth : 1,
      borderColor : '#ffffff08',
      borderRadius : hps(23),
      alignSelf : 'center',
      paddingLeft : hps(26),
      fontFamily : Fonts.regular,
      fontSize : hps(14),
      color : '#ffffff73',
    },
    button: {
      height : hps(46),
      width : wps(286),
      marginTop : hps(34),
      borderRadius : hps(23),
      alignSelf : 'center',
      backgroundColor : Colors.base1,
      justifyContent:'center',
      alignItems:'center'
    },
    buttonText: {
      fontSize : hps(16),
      color : Colors.white,
      fontFamily : Fonts.semiBold
    },
    bottomText: {
      fontSize : hps(12),
      color : Colors.base1,
      alignSelf : 'center',
      marginTop : hps(15),
      fontFamily : Fonts.medium
    },
    scroll: {
      flex : 1,
    }  
      
})
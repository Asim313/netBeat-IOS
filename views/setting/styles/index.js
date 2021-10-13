import react from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Colors, hp, hps, wp, wps } from '../../../assets';
import { Fonts } from '../../../assets/fonts';


export default StyleSheet.create ({

    mainContainer: {
      flex : 1,
      backgroundColor: Colors.white,
      //justifyContent:'center',
      alignItems:'center'
    },
    header: {
      height:hps(52),
      width:wps(342.9),
      marginTop:hps(14),
      //borderWidth:1,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center'
    },
    noti: {
      position :'absolute',
      left:0,
      top:hps(12)
    },
    logo: {
      
    },
    user: {
      height:hps(36.5),
      width:hps(36.5),
      borderRadius:hps(36.5/2),
      position:'absolute',
      right:0,
      top:3
    },
    settingContainer: {
      height:hps(497.27),
      width: wps(342),
      //borderWidth:1,
      marginTop:hps(32)
    },
    settingOptionContainer: {
      height:hps(48),
      width:wps(335.48),
      borderBottomWidth:1,
      borderColor:'#ffffff05',
      flexDirection:'row',
      alignSelf:'center',
      alignItems:'center',
      justifyContent:'space-between'
    },
    settingTitle: {
      fontSize: hps(16),
      fontFamily:Fonts.medium,
      color : Colors.white
    }, 
    settingStatus: {
      position:'absolute',
      right : wps(18),
      fontSize : hps(14),
      fontFamily : Fonts.regular,
      color : '#4E5662'
    },
    settingValue: {
      position:'absolute',
      right: wps(60),
      fontSize: hps(14),
      fontFamily: Fonts.regular,
    },
    right: {
      marginTop:hps(5)
    },
    title: {
      color : Colors.white,
      fontSize : hps(24),
      fontFamily: Fonts.lightBold,
      marginBottom:hps(16)
    },
    bottomTapContainer: {
      height : hps(93),
      width : wps(344),
      //borderWidth:1,
      alignItems : 'center',
      justifyContent : 'flex-end',
      position : 'absolute',
      bottom : hps(17)
    },
    bottomTap: {
      height:hps(58),
      width:wps(344),
      borderRadius:hps(29),
      backgroundColor:'#F3F3F3',
      //borderWidth:1,
      flexDirection : 'row',
      alignItems:'center',
      //justifyContent:'space-around'
    },
    videoButtonContainer: {
      position:'absolute',
      alignSelf:'center',
      top : hps(1),
      //transform:[{translateY : -hps(29)}],
      backgroundColor:Colors.white,
      height:hps(66),
      width:hps(66),
      borderRadius:hps(66/2),
      justifyContent:'center',
      alignItems:'center',
      //borderWidth:1,
      elevation:0.1,
      zIndex:1
     },
     videoButton: {
      backgroundColor:Colors.base1,
      height:hps(58),
      width:hps(58),
      borderRadius:hps(58/2),
      justifyContent:'center',
      alignItems:'center'
     },
     homeButton: {
     position:'absolute',
     left : wps(64)
     },
    settingButton: {
      position:'absolute',
      right : wps(64)
    },
    switch: {
      height:hps(16),
      width:wps(30),
      backgroundColor:Colors.base,
      borderRadius:hps(16)
    }

    
      
})